const webpack = require("webpack");
const path = require("path");
const precss = require("precss");
const autoprefixer = require("autoprefixer");
const ant = require('postcss-ant')

module.exports = {
  devtool: "inline-source-map",
  entry: [
    "react-hot-loader/patch",
    "webpack-dev-server/client?http://localhost:3001",
    "webpack/hot/only-dev-server",
    "./client/index",
  ],
  target: "web",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: "babel-loader",
        include: [
          path.join(__dirname, "client"),
          path.join(__dirname, "common"),
        ],
      },
      {
        test: /\.scss|css$/,
        use: [ 'style-loader', 'css-loader', 'postcss-loader', 'resolve-url-loader', 'sass-loader?sourceMap' ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [ 
          "file-loader?hash=sha512&digest=hex&name=assets/[hash].[ext]",
          "image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false"
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [ "url-loader?limit=10000&mimetype=application/font-woff" ]
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [ "file-loader" ]
      }
    ],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env": { BUILD_TARGET: JSON.stringify("client") },
    }),
    new webpack.LoaderOptionsPlugin({
      test: /\.scss$/,
      debug: true,
      options: {
          postcss: function() {
              return [ ant, precss, autoprefixer ];
          },
          context: path.join(__dirname, "client"),
          output: { path: path.join(__dirname, ".build") }
      }
    })
  ],
  devServer: {
    host: "localhost",
    port: 3001,
    historyApiFallback: true,
    hot: true,
  },
  output: {
    path: path.join(__dirname, ".build"),
    publicPath: "http://localhost:3001/",
    filename: "client.js",
  },
};
