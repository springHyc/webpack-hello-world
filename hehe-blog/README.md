# 记录

利用学习 webpack 的机会，使用 react + antd + es6 并且不使用脚手架，自己搭建整个项目。

## 版本变更记录

### 1.0.1

- 解决 es6\less\antd 的打包问题

## todo

- 打出来的 css 文件如何引入项目?!
  - 使用`style-loader`可以直接把 css 打进 js 文件中
- 学些`.babelrc`的配置
- 学习 nginx 的启动之类的

## 命令

- 打包：webpack
- 启动：npm run build
- nginx 前端端口 9000， 9001 是不能连接后端的

### MiniCssExtractPlugin

该插件将 CSS 提取到单独的文件中。它为每个包含 CSS 的 JS 文件创建一个 CSS 文件。它支持 CSS 和 SourceMap 的按需加载。

它基于新的 webpack v4 功能（模块类型）构建，并且需要 webpack 4 才能正常工作。

- 安装

`npm install --save-dev mini-css-extract-plugin`

此插件应仅在 production 不包含 style-loader 在加载程序链中的构建中使用，尤其是如果您想在中包含 HMR development。

这是一个将 HMR development 和样式都提取到 production 构建文件中的示例。

## 添加 less 的处理

npm install less --save-dev
npm install less-loader --save-dev

```js
{
        test: /\.less$/,
        //  Loader:模块转化器，用于将模块的原内容按照需求转换成新内容。
        loaders: ExtractTextPlugin.extract({
          use: ["css-loader", "less-loader"]
        })
      },

      {
        test: /\.(le|c)ss$/,
        use: [
          "style-loader", //使用<style>将css-loader内部样式注入到我们的HTML页面
          "css-loader", // 编译css
          "less-loader" // 编译less
        ]
      },
```
