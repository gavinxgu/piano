const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
//   .BundleAnalyzerPlugin;
const webpack = require("webpack");

const mode = process.env.NODE_ENV;
// 尝试使用环境变量，否则使用根路径
const ASSET_PATH = process.env.ASSET_PATH || "/";
const isDev = mode !== "production";

module.exports = {
  mode,
  entry: {
    app: "./src/index.tsx"
  },
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-react", "@babel/preset-typescript"]
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader", // 将 JS 字符串生成为 style 节点
          "css-loader", // 将 CSS 转化成 CommonJS 模块
          "sass-loader" // 将 Sass 编译成 CSS，默认使用 Node Sass
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              publicPath: ASSET_PATH
            }
          }
        ]
      },
      {
        test: /\.(aiff|mp3|wav|mid)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              publicPath: ASSET_PATH + "audio",
              outputPath: "audio"
              // name: "[path][name].[ext]"
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".scss"]
  },
  devServer: {
    contentBase: "./dist",
    hot: true
  },
  plugins: [
    // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
    new CleanWebpackPlugin(),
    isDev &&
      new HtmlWebpackPlugin({
        inject: true,
        template: path.join(__dirname, "../public/index.html")
      }),
    isDev && new webpack.HotModuleReplacementPlugin()
    // new BundleAnalyzerPlugin()
  ],
  output: {
    filename: "[name].[hash].js",
    chunkFilename: "[name].[hash].js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: ASSET_PATH
  }
};
