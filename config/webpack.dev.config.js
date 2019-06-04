let webpackMerge = require('webpack-merge');
let baseConfig = require('./webpack.base.config.js');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const vueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = webpackMerge(baseConfig, {
  devtool: 'true',
  mode: 'development',
  // devtool: '#eval-source-map',
  module: {
    rules: [{
        test: /\.html$/,
        exclude: /node_modules/,
        use: {
          loader: 'html-loader'
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          query: {
            presets: ['es2015']
          }
        }]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: [
          /src/,
          /view/,
          path.join(__dirname, '../', 'node_modules/iview/dist/styles/iview.css')
        ]
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: 'vue-loader'
      },
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader',
        options: {
          limit: parseInt(1024 * 10),
          name: '[name].[hash:5].[ext]',
        },
      },
      /*  {
         test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
         loader: 'file-loader',
         options: {
           limit: 10000,
           name: '[name].[hash:10].[ext]',
         },
       }, */
      /*  {
         test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
         loader: 'file-loader',
         options: {
           name: '[name].[ext]?[hash]',
           publicPath: path.join(__dirname, "../", 'public')
         }
       }, */
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: ['vue-style-loader', {
          loader: 'css-loader',
          options: {
            importLoaders: 1
          }
        }, 'less-loader']
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'vendor',
          chunks: 'initial',
          minChunks: 2
        }
      }
    }
  },
  plugins: [
    new vueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new htmlWebpackPlugin({
      title: 'test title',
      filename: 'index.html',
      template: 'index.html'
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    host: 'localhost',
    port: 8888,
    open: false,
    compress: true,
  }
});
