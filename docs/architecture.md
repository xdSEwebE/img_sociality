# 图片社交平台架构报告

本项目采用了目前较新的Web项目开发流程，旨在提供较好的，低耦合的协作模式。

后端采用`Spring MVC`框架，基于前后端分离的模式，为前端提供`JSON`格式的数据，前端完成路由布局，后端起到静态服务器的作用（这也就是说，在`webapp`目录下存放的文件，在项目启动后都可以通过`url`的形式直接在浏览器访问到）。

前端采用`CommonJs`对`JavaScript`进行模块化处理，使用`Sass`对`CSS`文件进行预处理，可以极大程度提升前端规范，以此来提高开发效率，也避免了多人协作的冲突，项目同时采用了`Gulp`进行自动化处理，因为浏览器是并不直接支持`CommonJs`规范和`Sass`预处理的，所以我们需要在开发时进行构建，使用`Gulp`能够极大程度降低我们的开发成本。

**后端架构图如下：**

![](https://github.com/xdSEwebE/img_sociality/raw/master/screenshots/backend.jpg)

**前端架构图如下：**

![](https://github.com/xdSEwebE/img_sociality/raw/master/screenshots/frontend.jpg)

### 工程目录

```txt
.
├── front                       # 前端代码开发区域，最终应当dist文件夹的内容置于src/webapp下
│   ├── dist
│   ├── gulpfile.js
│   ├── node_modules
│   ├── package.json
│   └── src
│       ├── js
│       ├── sass
│       └── view
├── lib
├── pom.xml                         # Maven构建后端服务
└── src
    └── main
        ├── java                    # Spring MVC后端代码
        ├── resources
        └── webapp                  # 前端构件好以后，应当将dist文件夹置于此文件夹根目录下
```

### 协作要求

- 为了让后端同学更好的进行调试，前端同学在推送远程仓库前，需要手动将`dist`目录下的全部内容复制到`webapp`目录下

### 前端需求
- 所有的依赖声明在`package.json`中，请首先执行`npm install`，最好使用`cnpm install`，[点击这里](http://npm.taobao.org/)查看如何使用`cnpm`。
- 本次开发的应用为多页应用，所以每次新建页面时，请提前将需要的第三方资源CDN引入，并引入所对应的`js`文件
    ```html
    <!doctype html>
    <html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <title>图片分享</title>
        <!--引入第三方样式-->
        <link rel="stylesheet" href="css/style.css">
    </head>
    <body>
    <h1>hello</h1>
    <!--这里提前引入第三方库,并在新建html时,提前引入好我们自己写的js文件,在gulp构建完毕后即可访问-->
    <script src="js/index.js"></script>
    </body>
    </html>
    ```
    ![](https://github.com/xdSEwebE/img_sociality/raw/master/screenshots/htmlDemo.jpg)
    
    如上图所示，我一般将主文件名和脚本命名一致。
    
- 前端同学在命令行输入`gulp dev`，即可进入开发模式，这个时候`gulp`会自动监听**目前已有**的文件，并自动应用更新，然后在浏览器里打开的是`dist`目录下的`html`。**gulp不会理会你新建的文件，所以如果新建了文件，那么关闭`gulp dev`，重新执行便可。**
- 发布请使用`gulp production`命令，它相对于`gulp dev`，多了对静态文件的压缩

### 后端需求

- 请使用`Maven`作为后端的包依赖管理器
- 需要将打包好的`war`包至于`tomcat`的`webapp`目录下来部署程序
- 上传文件请请使用七牛云提供的服务，网站地址：[http://www.qiniu.com/](http://www.qiniu.com/)
---

**author:**LuckyJing

**Date:**2016/5/21