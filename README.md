# o2o附近商家

> o2o附近商家App版

## getting start

```bash
//克隆项目
git clone https://github.com/Zhou-Hepeng/o2o.git
//cd 进入o2o目录
cd o2o
//初始化工程
npm install
```

## file structure

* `src/*`: 存放页面和组件
* `app.js`: 入口js文件
* `build/*`: some build scripts
* `dist/*`: 打包后存放的js目录
* `assets/*`: 提供网站预览  url.js可以修改页面预览的js地址
* `index.html`: web端页面预览页面
* `weex.html`: web端页面预览页面
* `.babelrc`: babel config (preset-2015 by default)
* `.eslintrc`: eslint config (standard by default)

## npm scripts

```bash
# 最终生产命令
npm run build

# 开发模式命令（这个可以实时预览，需要和下面的npm run serve 一起使用）
npm run dev

# 开发模式命令（这个可以生成一个预览地址，需要和上面npm run dev 一起使用） start a Web server at 8080 port
npm run serve

# 查看bug信息
npm run debug
```

## notes

You can config more babel, ESLint and PostCSS plugins in `webpack.config.js`.
