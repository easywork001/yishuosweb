/**
 * 数据库连接和操作核心工具类
 * 支持本地SQLite和云数据库迁移
 */

const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

class Database {
  constructor() {
    this.db = null;
    this.dbPath = path.join(__dirname, '../data/yishuos.db');
    this.isConnected = false;
  }

  /**
   * 初始化数据库连接
   */
  async connect() {
    return new Promise((resolve, reject) => {
      // 确保数据目录存在
      const dataDir = path.dirname(this.dbPath);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      this.db = new sqlite3.Database(this.dbPath, (err) => {
        if (err) {
          console.error('数据库连接失败:', err.message);
          reject(err);
        } else {
          this.isConnected = true;
          console.log('数据库连接成功:', this.dbPath);
          
          // 启用外键约束
          this.db.run('PRAGMA foreign_keys = ON');
          
          // 启用WAL模式提高性能
          this.db.run('PRAGMA journal_mode = WAL');
          
          resolve();
        }
      });
    });
  }

  /**
   * 关闭数据库连接
   */
  async close() {
    return new Promise((resolve, reject) => {
      if (this.db) {
        this.db.close((err) => {
          if (err) {
            console.error('关闭数据库失败:', err.message);
            reject(err);
          } else {
            this.isConnected = false;
            console.log('数据库连接已关闭');
            resolve();
          }
        });
      } else {
        resolve();
      }
    });
  }

  /**
   * 执行SQL查询
   */
  async query(sql, params = []) {
    return new Promise((resolve, reject) => {
      if (!this.isConnected) {
        reject(new Error('数据库未连接'));
        return;
      }

      this.db.all(sql, params, (err, rows) => {
        if (err) {
          console.error('查询执行失败:', err.message);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  /**
   * 执行单行查询
   */
  async get(sql, params = []) {
    return new Promise((resolve, reject) => {
      if (!this.isConnected) {
        reject(new Error('数据库未连接'));
        return;
      }

      this.db.get(sql, params, (err, row) => {
        if (err) {
          console.error('查询执行失败:', err.message);
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  /**
   * 执行插入、更新、删除操作
   */
  async run(sql, params = []) {
    return new Promise((resolve, reject) => {
      if (!this.isConnected) {
        reject(new Error('数据库未连接'));
        return;
      }

      this.db.run(sql, params, function(err) {
        if (err) {
          console.error('操作执行失败:', err.message);
          reject(err);
        } else {
          resolve({
            lastID: this.lastID,
            changes: this.changes
          });
        }
      });
    });
  }

  /**
   * 开始事务
   */
  async beginTransaction() {
    return this.run('BEGIN TRANSACTION');
  }

  /**
   * 提交事务
   */
  async commitTransaction() {
    return this.run('COMMIT');
  }

  /**
   * 回滚事务
   */
  async rollbackTransaction() {
    return this.run('ROLLBACK');
  }

  /**
   * 执行事务
   */
  async transaction(callback) {
    try {
      await this.beginTransaction();
      const result = await callback();
      await this.commitTransaction();
      return result;
    } catch (error) {
      await this.rollbackTransaction();
      throw error;
    }
  }

  /**
   * 检查表是否存在
   */
  async tableExists(tableName) {
    const sql = `
      SELECT name FROM sqlite_master 
      WHERE type='table' AND name=?
    `;
    const result = await this.get(sql, [tableName]);
    return !!result;
  }

  /**
   * 获取表结构
   */
  async getTableSchema(tableName) {
    const sql = `PRAGMA table_info(${tableName})`;
    return this.query(sql);
  }

  /**
   * 备份数据库
   */
  async backup(backupPath) {
    return new Promise((resolve, reject) => {
      const backup = new sqlite3.Database(backupPath);
      this.db.backup(backup, (err) => {
        if (err) {
          reject(err);
        } else {
          backup.close();
          resolve();
        }
      });
    });
  }

  /**
   * 获取数据库统计信息
   */
  async getStats() {
    const tables = await this.query(`
      SELECT name FROM sqlite_master 
      WHERE type='table'
    `);
    
    const stats = {};
    for (const table of tables) {
      const count = await this.get(`SELECT COUNT(*) as count FROM ${table.name}`);
      stats[table.name] = count.count;
    }
    
    return stats;
  }

  /**
   * 清理过期数据
   */
  async cleanup() {
    const now = new Date().toISOString();
    
    // 清理过期的会话
    await this.run(`
      DELETE FROM user_sessions 
      WHERE expires_at < ? AND is_active = 1
    `, [now]);
    
    // 清理过期的验证码
    await this.run(`
      DELETE FROM user_verification_codes 
      WHERE expires_at < ?
    `, [now]);
    
    // 清理过期的Cookie
    await this.run(`
      DELETE FROM website_cookies 
      WHERE expires_at < ? AND is_active = 1
    `, [now]);
    
    console.log('数据库清理完成');
  }
}

// 创建单例实例
const database = new Database();

module.exports = database; 