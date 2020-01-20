# 记录

利用学习 webpack 的机会，使用 react 并且不使用脚手架，自己搭建。

## todo

- 打出来的 css 文件如何引入项目中？！

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
```
