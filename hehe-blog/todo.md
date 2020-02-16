# todo

- [x] 打出来的 css 文件如何引入项目?!
  - 使用`style-loader`可以直接把 css 打进 js 文件中
  - 或者使用`MiniCssExtractPlugin`单独生成 css 文件和 js 文件分离开来 加快页面渲染
- [ ] 学些`.babelrc`的配置
- [x] 学习 nginx 的启动之类的
- [ ] 打包之后的项目，都放到`bundle.js`中了，无法刷新，一刷新就报错,单独的前端项目是 OK 的。
  - 自己写的项目导航是有问题的
- [ ] 自己在项目中引入一个 svg
- [ ] <a href="#one-bundle">如何将文件打成多个，而不是一个`bundle.js`文件?</a>
  - 都是一个文件。
- [x] <a href="#bundle-run">为什么`bundle.js`文件可以直接运行在浏览器中？</a>
- [ ] Chunk 到底是什么？
- [ ] 如何在配置文件中配置是`dev`环境还是`production`环境？
- [ ] 自己写一个 loader
      webpack 是运行在 Node.js 上的，一个 Loader 其实就是一个 Node.js 模块，这个模块需要导出一个函数。

## 知识点

## <div id="#bundle-run">`bundle.js`文件可以直接运行在浏览器中的原因</div>

bundle.js 能直接运行在浏览器中的原因在于输出的文件中通过 **webpack_require** 函数定义了一个可以在浏览器中执行的加载函数来模拟 Node.js 中的 require 语句。

## [如何将文件打成多个，而不是一个`bundle.js`文件?](#one-bundle)

**不能分成多个文件！！！**

原来一个个独立的模块文件被合并到了一个单独的 bundle.js 的原因在于浏览器不能像 Node.js 那样快速地去本地加载一个个模块文件，而必须通过网络请求去加载还未得到的文件。 如果模块数量很多，加载时间会很长，因此把所有模块都存放在了数组中，执行一次网络加载。
