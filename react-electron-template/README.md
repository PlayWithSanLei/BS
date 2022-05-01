# react-electron-template

#### 介绍
修改好的模板，放心使用，react&electron中子主进程可正常通信，可使用remote

#### 软件架构
软件架构说明


#### 安装教程

git clone https://gitee.com/kiven-lst/react-electron-template.git

cnpm i

npm start

npm run electron

#### 使用说明

关于主进程和渲染进程通信
可查看App.js中的  `const { electron } = window`，
通过这种方式则可以在任何一个组件中使用该方式获取electron，至于怎么使用它，请移步electron的[中文文档](https://wizardforcel.gitbooks.io/electron-doc/content/tutorial/quick-start.html)

可更改package.json文件中的配置来控制调试器和打包
"Dev":true //调试模式，如要打包成可执行文件请改成false
"Devtool":true  //打开调试工具，如要关闭请改成false
