# 记录

利用学习 webpack 的机会，使用 react 并且不使用脚手架，自己搭建。

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
          MiniCssExtractPlugin.loader,
          "css-loader", // 编译css
          "less-loader" // 编译less
        ]
      },
```
