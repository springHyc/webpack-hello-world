const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const HappyPack = require("happypack");
// const os = require("os");
// const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = {
  mode: "development",
  // 入口，webpack执行构建的第一步将从entry开始，可抽象成输入。
  entry: "./index.js",
  // 输出结果，在webpack经过一系列处理并拿得出最终想要的代码后输出结果。
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist")
  },
  // 模块，在webpack里一切皆模块，一个模块对应一个文件。webpack会从配置里的entry开始递归找出所有依赖的模块。
  module: {
    rules: [
      {
        test: /\.(le|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader", // 编译css
          "less-loader" // 编译less
        ]
      },

      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                useBuiltIns: "usage"
              }
            ]
          ],
          plugins: [
            "@babel/transform-runtime",
            "@babel/plugin-proposal-class-properties"
          ]
        }
      }
    ]
  },
  // 扩展插件，在webpack构建流程中的特定时机注入廓镇逻辑，来改变构建结果或做我们想要的事情。
  plugins: [
    new ExtractTextPlugin({
      // webpack4以上版本，包含了contenthash这个关键字段，所以会报错，可以使用md5:contenthash:8来替代
      filename: `[name]_[md5:contenthash:hex:8].css`
    }),
    // 单独生成css文件和js文件分离开来 加快页面渲染
    new MiniCssExtractPlugin({
      filename: "[name]-[hash:5].css",
      chunkFilename: "[id]-[hash:5].css"
    })
  ],
  devtool: "source-map"
};

// Chunk: 代码块，一个Chunk由多个模块组合而成，用于代码合并与分割。
