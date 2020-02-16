const path = require('path');
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');

const devMode = process.env.NODE_ENV !== 'production';
console.log('---process.env.NODE_ENV--- ', process.env.NODE_ENV);
module.exports = {
  watch: true,
  watchOptions: {
    // 不监听的文件或文件夹，支持正则匹配
    // 默认为空
    ignored: /node_modules/,
    // 监听到变化发生后会等300ms再去执行动作，防止文件更新太快导致重新编译频率太高
    // 默认为 300ms
    aggregateTimeout: 300,
    // 判断文件是否发生变化是通过不停的去询问系统指定文件有没有变化实现的
    // 默认每隔1000毫秒询问一次
    poll: 1000
  },
  mode: 'development', // production\development
  // 入口，webpack执行构建的第一步将从entry开始，可抽象成输入。
  entry: {
    main: [
      'webpack-dev-server/client?http://localhost:9001/',
      'webpack/hot/dev-server',
      './index.js'
    ]
  },
  // 输出结果，在webpack经过一系列处理并拿得出最终想要的代码后输出结果。
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist')
  },
  resolve: {
    extensions: ['.js', '.jsx'], // 扩展
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@store': path.resolve(__dirname, 'src/store')
    }
  },

  // 模块，在webpack里一切皆模块，一个模块对应一个文件。webpack会从配置里的entry开始递归找出所有依赖的模块。
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              // dev 可以这样，正式不行
              name: '[name].[ext]', // 原本的名字和后缀
              outputPath: 'assets/fonts'
            }
          }
        ]
      },
      // * 在css-loader中不能排除node_modules文件
      {
        test: /\.(le|c)ss$/,
        // exclude: /src\/components\/gallery\/fonts\//,
        use: [
          'style-loader',
          // 编译css
          { loader: 'css-loader', options: { importLoaders: 2 } },
          'postcss-loader', // 使用 postcss 为 css 加上浏览器前缀
          'less-loader' // 编译less
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader?cacheDirectory',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'usage',
                corejs: 2
              }
            ]
          ],
          plugins: [
            '@babel/transform-runtime',
            '@babel/plugin-proposal-class-properties',
            // 引入antd
            [
              'import',
              {
                libraryName: 'antd',
                libraryDirectory: 'es',
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
    new HotModuleReplacementPlugin(),
    new DefinePlugin({
      // 定义 NODE_ENV 环境变量为 production
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ],
  devtool: 'source-map',
  devServer: {
    port: 9001,
    hot: true
  }
};
