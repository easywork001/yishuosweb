/**
 * 数据库迁移执行脚本
 * 自动创建所有数据表
 */

const database = require('../utils/database');
const userSchema = require('../schemas/user-schema');
const cookieSchema = require('../schemas/cookie-schema');
const path = require('path');
const fs = require('fs');

class MigrationRunner {
  constructor() {
    this.migrations = [];
    this.migrationsDir = path.join(__dirname, 'files');
  }

  /**
   * 注册所有迁移
   */
  registerMigrations() {
    // 用户相关表
    Object.entries(userSchema).forEach(([tableName, sql]) => {
      this.migrations.push({
        name: `create_${tableName}_table`,
        sql: sql,
        description: `创建${tableName}表`
      });
    });

    // Cookie相关表
    Object.entries(cookieSchema).forEach(([tableName, sql]) => {
      this.migrations.push({
        name: `create_${tableName}_table`,
        sql: sql,
        description: `创建${tableName}表`
      });
    });
  }

  /**
   * 创建迁移记录表
   */
  async createMigrationsTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS migrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        description TEXT,
        executed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        execution_time_ms INTEGER,
        status TEXT DEFAULT 'success' CHECK (status IN ('success', 'failed', 'rolled_back')),
        error_message TEXT
      )
    `;
    
    await database.run(sql);
    console.log('迁移记录表创建成功');
  }

  /**
   * 检查迁移是否已执行
   */
  async isMigrationExecuted(migrationName) {
    const sql = 'SELECT id FROM migrations WHERE name = ? AND status = "success"';
    const result = await database.get(sql, [migrationName]);
    return !!result;
  }

  /**
   * 记录迁移执行
   */
  async recordMigration(migration, startTime, success = true, errorMessage = null) {
    const executionTime = Date.now() - startTime;
    const status = success ? 'success' : 'failed';
    
    const sql = `
      INSERT INTO migrations (name, description, execution_time_ms, status, error_message)
      VALUES (?, ?, ?, ?, ?)
    `;
    
    await database.run(sql, [
      migration.name,
      migration.description,
      executionTime,
      status,
      errorMessage
    ]);
  }

  /**
   * 执行单个迁移
   */
  async executeMigration(migration) {
    const startTime = Date.now();
    
    try {
      console.log(`执行迁移: ${migration.name} - ${migration.description}`);
      
      // 检查是否已执行
      if (await this.isMigrationExecuted(migration.name)) {
        console.log(`迁移 ${migration.name} 已存在，跳过`);
        return;
      }
      
      // 执行SQL
      await database.run(migration.sql);
      
      // 记录成功
      await this.recordMigration(migration, startTime, true);
      
      console.log(`✅ 迁移 ${migration.name} 执行成功`);
      
    } catch (error) {
      console.error(`❌ 迁移 ${migration.name} 执行失败:`, error.message);
      
      // 记录失败
      await this.recordMigration(migration, startTime, false, error.message);
      
      throw error;
    }
  }

  /**
   * 执行所有迁移
   */
  async runMigrations() {
    try {
              console.log('开始执行数据库迁移...');
      
      // 连接数据库
      await database.connect();
      
      // 创建迁移记录表
      await this.createMigrationsTable();
      
      // 注册迁移
      this.registerMigrations();
      
                  console.log(`共找到 ${this.migrations.length} 个迁移`);
      
      // 执行所有迁移
      for (const migration of this.migrations) {
        await this.executeMigration(migration);
      }
      
                  console.log('所有迁移执行完成！');
      
      // 显示数据库统计
      const stats = await database.getStats();
                  console.log('数据库统计:');
      Object.entries(stats).forEach(([table, count]) => {
        console.log(`  ${table}: ${count} 条记录`);
      });
      
    } catch (error) {
      console.error('❌ 迁移执行失败:', error);
      throw error;
    } finally {
      // 关闭数据库连接
      await database.close();
    }
  }

  /**
   * 回滚迁移
   */
  async rollbackMigration(migrationName) {
    try {
      console.log(`🔄 回滚迁移: ${migrationName}`);
      
      await database.connect();
      
      // 更新迁移状态
      const sql = 'UPDATE migrations SET status = "rolled_back" WHERE name = ?';
      await database.run(sql, [migrationName]);
      
      console.log(`✅ 迁移 ${migrationName} 回滚成功`);
      
    } catch (error) {
      console.error(`❌ 迁移 ${migrationName} 回滚失败:`, error.message);
      throw error;
    } finally {
      await database.close();
    }
  }

  /**
   * 显示迁移状态
   */
  async showMigrationStatus() {
    try {
      await database.connect();
      
      const sql = `
        SELECT name, description, executed_at, execution_time_ms, status
        FROM migrations
        ORDER BY executed_at DESC
      `;
      
      const migrations = await database.query(sql);
      
              console.log('迁移状态:');
      if (migrations.length === 0) {
        console.log('  暂无迁移记录');
      } else {
        migrations.forEach(migration => {
          const status = migration.status === 'success' ? '✅' : 
                        migration.status === 'failed' ? '❌' : '🔄';
          console.log(`  ${status} ${migration.name} - ${migration.description}`);
          console.log(`    执行时间: ${migration.executed_at} (${migration.execution_time_ms}ms)`);
        });
      }
      
    } catch (error) {
      console.error('获取迁移状态失败:', error.message);
    } finally {
      await database.close();
    }
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  const runner = new MigrationRunner();
  
  const command = process.argv[2];
  
  switch (command) {
    case 'run':
      runner.runMigrations();
      break;
    case 'status':
      runner.showMigrationStatus();
      break;
    case 'rollback':
      const migrationName = process.argv[3];
      if (!migrationName) {
        console.error('请指定要回滚的迁移名称');
        process.exit(1);
      }
      runner.rollbackMigration(migrationName);
      break;
    default:
      console.log('使用方法:');
      console.log('  node run-migrations.js run      # 执行所有迁移');
      console.log('  node run-migrations.js status   # 显示迁移状态');
      console.log('  node run-migrations.js rollback <migration_name>  # 回滚指定迁移');
  }
}

module.exports = MigrationRunner; 