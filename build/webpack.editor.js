/* eslint-disable */
/**
 * esfiddle editor build configuration
 */

let path = require('path');
let webpack = require('webpack');
// load plugins
let HtmlPlugin = require('html-webpack-plugin');
let HtmlHDDPlugin = require('html-webpack-harddisk-plugin');
let CopyPlugin = require('copy-webpack-plugin');
//let ImageminPlugin = require('imagemin-webpack-plugin').default;

module.exports = {
  // application entry point
  entry: './src/editor/index.js',
  
  // output configuration
  output: {
    // output directory
    path: path.resolve(__dirname, '../dist/js'),
    // build output with chunkhash
    filename: 'esfiddle.[hash].js',
    // the url to the output directory resolved relative to the HTML page
    publicPath: '/js/'
  },

  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      // shorthand syntax to import files from src folder without ugly paths
      '@': path.resolve(__dirname, '../src/editor')
    }
  },
  
  // module and loader configurations
  module: {
    rules: [
      {  // rule for vanilla js
        test: /\.js$/,
        use: [
          'babel-loader',
          { 
            loader:'eslint-loader',
            options: {
              failOnWarning: true,
              failOnError: true
            }
          }
        ],
        exclude: /node_modules/
      },
      {  // rule for vue single component files
        test: /\.vue$/,
        use: [
          'vue-loader',
          { 
            loader:'eslint-loader',
            options: {
              failOnWarning: true,
              failOnError: true
            }
          }
        ],
        exclude: /node_modules/
      },
      { // rule to load external css
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      { // rule to load template files
        test: /\.html$/,
        loader: 'html-loader'
      },
    ]
  },

  externals: {
    // Don't follow/bundle these modules, but request them at runtime from the environment
    'vue': 'Vue',   // window['Vue']
    'jshint': 'JSHINT',  // window['JSHINT']
    'codemirror': 'CodeMirror'
  },

  plugins: [
    new HtmlPlugin({
      filename: '../index.html',
      template: './src/editor/template.html',
      alwaysWriteToDisk: true
    }),
    new HtmlHDDPlugin(),
    new CopyPlugin([{
      from: path.resolve(__dirname, '../images'),
      to: '../images'
    }])
  ],

  devtool: 'inline-source-map',

  devServer: {
    port: 3000,
    proxy: {
    //  '/': 'http://localhost:3001'
    },
    contentBase: [
      path.resolve(__dirname, '../dist'), // for resolving styles
      path.resolve(__dirname, '../'), // for resolving images that are still not copied when running dev-server
    ],
    noInfo: true,
    overlay: true,
    quiet: true
  }
}

//# build for production
if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    // new ImageminPlugin({
    //   pngquant: {
    //     quality: '95-100'
    //   }
    // })
  ])
}
