const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HotModuleReplacementPlugin = require("webpack/lib/HotModuleReplacementPlugin");
const DefinePlugin = require("webpack/lib/DefinePlugin");
module.exports = {
  // 入口，webpack执行构建的第一步将从entry开始，可抽象成输入。
  // entry: './src/main.tsx',
  entry: {
    // 为每个入口都注入代理客户端
    main: [
      "webpack-dev-server/client?http://localhost:7777/",
      "webpack/hot/dev-server",
      "./src/main.tsx"
    ]
  },
  resolve: {
    // 针对 Npm 中的第三方模块优先采用 jsnext:main 中指向的 ES6 模块化语法的文件
    mainFields: ["jsnext:main", "browser", "main"]
  },
  // 输出结果，在webpack经过一系列处理并拿得出最终想要的代码后输出结果。
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist")
    // 输出的代码复测CommonJS模块化规范，以供给其他模块导入使用。
    // libraryTarget: 'commonjs2'
  },
  // 模块，在webpack里一切皆模块，一个模块对应一个文件。webpack会从配置里的entry开始递归找出所有依赖的模块。
  module: {
    rules: [
      // webpack不原生支持解析CSS文件。要支持非JavaScript类型的文件，则需要使用webpack中loader机制。
      {
        test: /\.css$/,
        //  Loader:模块转化器，用于将模块的原内容按照需求转换成新内容。
        loaders: ExtractTextPlugin.extract({
          use: ["css-loader"]
        })
      },
      // { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /.js$/,
        use: ["babel-loader"],
        include: path.resolve(__dirname, "src"),
        exclude: path.resolve(__dirname, "node_modules")
      },
      {
        test: /.tsx?$/,
        loader: "awesome-typescript-loader",
        exclude: path.resolve(__dirname, "node_modules")
      },
      {
        test: /\.jpeg$/,
        use: ["file-loader"]
      }
    ]
  },
  // 扩展插件，在webpack构建流程中的特定时机注入廓镇逻辑，来改变构建结果或做我们想要的事情。
  plugins: [
    new ExtractTextPlugin({
      // webpack4以上版本，包含了contenthash这个关键字段，所以会报错，可以使用md5:contenthash:8来替代
      filename: `[name]_[md5:contenthash:hex:8].css`
    }),
    new HotModuleReplacementPlugin(),
    new DefinePlugin({
      // 定义 NODE_ENV 环境变量为 production
      "process.env": {
        NODE_ENV: JSON.stringify("dev")
      }
    })
  ],
  devtool: "source-map",
  devServer: {
    // 使用https
    https: true,
    port: 7777,
    hot: true
  }
};

// Chunk: 代码块，一个Chunk由多个模块组合而成，用于代码合并与分割。
