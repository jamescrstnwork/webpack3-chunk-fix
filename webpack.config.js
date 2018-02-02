const path = require('path');
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// TODO: look into chunking. this will likely cause problems like in the plugin
module.exports = {
  entry: {
    b2b: './src/b2b/r2dialog.b2b.ts',
    erp: './src/erp/r2dialog.erp.ts'
  },
  output: {
    filename: '[name].bundle.js',
    // chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      // webpack3 html-webpack-plugin chunk ordering
      // https://github.com/jantimon/html-webpack-plugin/blob/master/examples/sort-manually/webpack.config.js
      chunksSortMode: 'manual',
      chunks: ['vendor','basex', 'shared','b2b'],
      filename: 'index.html',
      template: 'index.html'
    }),
    new HtmlWebpackPlugin({
      chunksSortMode: 'manual',
      chunks: ['vendor','basex', 'shared', 'erp'],
      filename: 'erp.html',
      template: 'erp.html'
    }),
    new ExtractTextPlugin("[name].bundle.css"),
    // new webpack.optimize.CommonsChunkPlugin({
    //   names: ['vendor']
    // })
    new webpack.ProvidePlugin({
      "window.jQuery": "jquery",
      "jQuery": "jquery"
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module,count) {
        // this assumes your vendor imports exist in the node_modules directory
        return module.context && module.context.includes("node_modules");
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'basex',
      // filename: 'basex.chunk.js',
      chunks: ["b2b"],
      minChunks: function (module,count) {
        // this assumes your vendor imports exist in the node_modules directory
        console.log('>>>>>>>>basex.chunk.js:: count: ', count,' Resource: ', module.resource );
        return module.resource && (/basex-core/).test(module.resource) && count === 1;
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'shared',
      // filename: 'shared.chunk.js',
      chunks: ["b2b"],
      minChunks: function (module,count) {
        // this assumes your vendor imports exist in the node_modules directory
        console.log('>>>>>>>>shared.chunk.js:: count: ', count,' Resource: ', module.resource );
        
        return module.resource && (/shared/).test(module.resource) && count === 1;
      }
    }),

    // new BundleAnalyzerPlugin()

  ],
  module: {
    rules: [{
      test: /\.html$/,
      include: path.resolve(__dirname, 'src/'),
      loader: `ngtemplate-loader?relativeTo=${__dirname}/src/!html-loader`
    }, {
      test: /\index.html$/,
      exclude: path.resolve(__dirname, 'node_modules/'),
      use: 'html-loader?name=[name].[ext]'
    },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      // {
      //   test: /\.ts$/,
      //   enforce: 'pre',
      //   loader: 'tslint-loader',
      //   options: {/* Loader options go here */}
      // },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [{
            loader: "css-loader", options: {
              sourceMap: true
            }
          }]
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: "css-loader", options: {
              sourceMap: true
            }
          }, {
            loader: "sass-loader", options: {
              sourceMap: true,
              outputStyle: 'compact'
            }
          }]
        })
      },
      {
        test: /\.(png|jpeg|jpg|gif)$/,
        // include: path.join(__dirname, 'src/assets/images/'),
        use: 'file-loader?name=images/[name].[ext]&context=src/assets/images/'
      }, {
        test: /\.(woff|woff2|svg|eot|ttf)(\?.+)?$/i,
        use: 'file-loader?name=fonts/[name].[ext]'
      }]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "inputmask": path.join(__dirname, 'node_modules/jquery.inputmask/dist/jquery.inputmask.bundle.js')
    }
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 8050,
    inline: true,
    compress: true,
    stats: {colors: true},
    clientLogLevel: 'info',
    historyApiFallback: true,
    proxy: {
      "/api": {
        target: 'https://r2-dialog.demo-version.net/',
        // target: 'http://localhost:8051',
        // target: 'http://83.226.216.231:8051',
        changeOrigin: true
      }
    },
    historyApiFallback: {
      rewrites: [
        {from: /^\/$/, to: 'index.html'},
        {from: /^\/erp/, to: '/erp.html'}
        // ,
        // {from: /./, to: '/views/404.html'}
      ]
    }

  },
  watchOptions: {
    aggregateTimeout: 300,
    ignored: path.resolve(__dirname, 'node_modules/')
  },
  devtool: 'source-map'
};
