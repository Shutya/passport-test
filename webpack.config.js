var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: [path.resolve(__dirname, './client/src/app.js'), path.resolve(__dirname, './client/style/style.scss')],

  output: {
    path: __dirname,
    filename: 'bundle/js/app.js'
  },

  plugins: [
    new ExtractTextPlugin('bundle/css/style.css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        API_URL: JSON.stringify('http://localhost:3005/api'),
        GITHUB_LOGIN_URL: JSON.stringify('http://localhost:3005/api/auth/github')
      },
    })
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          query: {
            cacheDirectory: true,
            plugins: [
              'babel-plugin-transform-class-properties',
              'babel-plugin-syntax-dynamic-import',
              'babel-plugin-transform-object-rest-spread'
            ]
          }
        }]
      },
      {
        test: /\.(css|scss)/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'sass-loader'
          ]
        })
      },
      {
        test: /\.(png|jpg|gif|wav)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },

  stats: {
    colors: true
  },

  devtool: 'source-map'
};