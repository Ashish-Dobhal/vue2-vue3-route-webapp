// webpack.config.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
module.exports = (env, argv) => {
  const isProduction = env.LOCAL !== 'true'
  
  return {
    // Entry Point
    entry: './src/main.js',
    
    // Output Configuration
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction 
        ? '[name].[contenthash].js' 
        : '[name].js',
      clean: true
    },
    
    // Target ES6
    target: ['web', 'es2020'],

    // Mode Determination
    mode: isProduction ? 'production' : 'development',
    
    // Resolve Configurations
    resolve: {
      extensions: ['.js', '.vue'],
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    
    // Development Server
    devServer: {
       headers: {
    "Access-Control-Allow-Origin": "*",
  },
      port: 20000,
      hot: true,
      open: true,
      historyApiFallback: true,
      compress: true
    },
    
    // Source Map Strategy
    devtool: isProduction 
      ? 'source-map' 
      : 'inline-source-map',
    
    // Module Rules
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env', {
                targets: {
                  esmodules: true
                }
              }]],
              plugins: ["@babel/plugin-syntax-dynamic-import"]
            }
          }
        },
        {
          test: /\.css$/,
          use: [
            isProduction ? 'style-loader' : 'vue-style-loader', 
            'css-loader'
          ]
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource'
        }
      ]
    },
    
    // Plugins
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        minify: isProduction ? {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        } : false
      }),
      new VueLoaderPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(
          isProduction ? 'production' : 'development'
        ),
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: !isProduction
      }),
            new ModuleFederationPlugin({
              name: 'host',
        // // Add remotes here, for example:
        // remotes: {
        //   // Format: '<remote_name>': '<remote_name>@<remote_url>/remoteEntry.js'
        //   remote1: 'remote1@http://localhost:20001/remoteEntry.js',
        // },
        // shared: {
        //   vue: { 
        //     singleton: true, 
        //     requiredVersion: '^3.0.0' // Adjust based on your Vue version
        //   },
        //   // other shared dependencies
        // }
      }),
    ],
    
    // Optimization for Production
    optimization: isProduction ? {
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        automaticNameDelimiter: '~',
        enforceSizeThreshold: 50000,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
      minimize: true
    } : {}
  }
}
