const path = require("path");

module.exports = {
  mode: "development",
  // 入口，webpack执行构建的第一步将从entry开始，可抽象成输入。
  entry: path.resolve(__dirname, "../index.js"),
  // 输出结果，在webpack经过一系列处理并拿得出最终想要的代码后输出结果。
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "../dist")
  },
  resolve: {
    extensions: [".js", ".jsx"], // 扩展
    alias: {
      "@": path.resolve(__dirname, "../src"),
      "@store": path.resolve(__dirname, "../src/store")
    }
  },

  // 模块，在webpack里一切皆模块，一个模块对应一个文件。webpack会从配置里的entry开始递归找出所有依赖的模块。
  module: {
    rules: [
      {
        test: /\.(le|c)ss$/,
        use: [
          "style-loader", //使用<style>将css-loader内部样式注入到我们的HTML页面
          "css-loader", // 编译css
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
  plugins: [],
  devtool: "source-map",
  devServer: {
    port: 9001,
    hot: true
  }
};
