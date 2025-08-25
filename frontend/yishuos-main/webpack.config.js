const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    home: './src/scripts/pages/home.js',
    solutions: './src/scripts/pages/solutions.js',
    research: './src/scripts/pages/research.js',
    support: './src/scripts/pages/support.js',
    eplan: './src/scripts/pages/eplan.js',
    banjing15: './src/scripts/pages/banjing15.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'scripts/[name].bundle.js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/videos/[name][ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/pages/home/index.html',
      filename: 'index.html',
      chunks: ['home']
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/solutions/index.html',
      filename: 'solutions.html',
      chunks: ['solutions']
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/research/index.html',
      filename: 'research.html',
      chunks: ['research']
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/support/index.html',
      filename: 'support.html',
      chunks: ['support']
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/eplan/index.html',
      filename: 'eplan.html',
      chunks: ['eplan']
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/banjing15/index.html',
      filename: 'banjing15.html',
      chunks: ['banjing15']
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'src')
    },
    compress: true,
    port: 3000,
    hot: true,
    open: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@scripts': path.resolve(__dirname, 'src/scripts')
    }
  }
}; 