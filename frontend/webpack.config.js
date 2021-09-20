const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

module.exports = {
  // 配置生产环境还是开发环境
  mode: "development",

  // DevTools failed to load source map: Could not load content for webpack:///node_modules/sockjs-client/dist/sockjs.js.map: HTTP error: status code 404, net::ERR_UNKNOWN_URL_SCHEME
  // 可以帮我们在开发环境中去调试代码
  devtool: "source-map",

  // 配置入口
  entry: {
    // 编译app.js作为入口
    "js/app": "./src/app.js"
  },

  // 配置出口文件
  output: {
    // 将目标文件打包到当前文件夹的 dist 目录中
    path: path.join(__dirname, "./dist"),
    // 打包后的文件名
    filename: "[name].js"
  },

  // 配置加载器
  module: {
    // 规则
    rules: [
      {
        // /\.art$/  .art为扩展名的文件
        test: /\.art$/,
        use: {
          loader: "art-template-loader"
        }
      },
      {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader"]
      }
    ]
  },

  // 配置插件
  plugins: [
    new HtmlWebpackPlugin({
      // 以index.html作为html的入口文件
      template: path.join(__dirname, "./public/index.html"),
      filename: "index.html",
      inject: true
    }),

    new CopyPlugin({
      patterns: [
        {
          from: "./public/*.ico",
          to: path.join(__dirname, "./dist/favicon.ico")
        },
        {
          from: "./public/libs",
          to: path.join(__dirname, "./dist/libs")
        }
      ]
    }),

    new CleanWebpackPlugin()
  ],

  // 配置server
  devServer: {
    // 基本的根目录
    contentBase: path.join(__dirname, "dist"),
    // 是否压缩
    compress: true,
    // 端口
    port: 8080,
    // 配置代理 解决跨域问题
    proxy: {
      "/api": {
        target: "http://localhost:3000"
      }
    }
  }
}