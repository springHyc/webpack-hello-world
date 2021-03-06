const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const DefinePlugin = require("webpack/lib/DefinePlugin");
// const HappyPack = require("happypack");
// const os = require("os");
// const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

const devMode = process.env.NODE_ENV !== "production";
console.log(
  "======production|process.env.NODE_ENV======",
  process.env.NODE_ENV
);
module.exports = {
  mode: "production", // production\development
  // 入口，webpack执行构建的第一步将从entry开始，可抽象成输入。
  entry: "./index.js",
  // 输出结果，在webpack经过一系列处理并拿得出最终想要的代码后输出结果。
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist")
  },
  resolve: {
    extensions: [".js", ".jsx"], // 扩展
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@store": path.resolve(__dirname, "src/store")
    }
  },

  // 模块，在webpack里一切皆模块，一个模块对应一个文件。webpack会从配置里的entry开始递归找出所有依赖的模块。
  module: {
    rules: [
      // * 在css-loader中不能排除node_modules文件
      {
        test: /\.(le|c)ss$/,
        use: [
          // MiniCssExtractPlugin.loader,
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              //热模块重装（HMR）
              // hmr: process.env.NODE_ENV === "development"
              hnr: true,
              reloadAll: true
            }
          },
          "css-loader", // 编译css
          "postcss-loader", // 使用 postcss 为 css 加上浏览器前缀
          "less-loader" // 编译less
        ]
      },

      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader?cacheDirectory",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                useBuiltIns: "usage",
                corejs: 2
              }
            ]
          ],
          plugins: [
            "@babel/transform-runtime",
            "@babel/plugin-proposal-class-properties",
            // 引入antd
            [
              "import",
              {
                libraryName: "antd",
                libraryDirectory: "es",
                style: true // 会加载 less 文件
              }
            ]
          ]
        }
      }
    ]
  },
  // 扩展插件，在webpack构建流程中的特定时机注入廓镇逻辑，来改变构建结果或做我们想要的事情。
  plugins: [
    // 单独生成css文件和js文件分离开来 加快页面渲染
    new MiniCssExtractPlugin({
      filename: devMode ? "[name].css" : "[name].[contenthash:8].css",
      chunkFilename: devMode ? "[id].css" : "[id].[contenthash:8].css"
    }),
    new DefinePlugin({
      // 定义 NODE_ENV 环境变量为 production
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    })
  ],
  devServer: {
    port: 9001
  }
};
