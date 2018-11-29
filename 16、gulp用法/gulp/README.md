# 安装gulp 

全局安装：
```cmd
cnpm i gulp -g
```

安装在项目中：
```cmd
cnpm i gulp --save-dev
```

`--save-dev` 将安装记录保存在`package.json`文件中，作为依赖，下一次需要开发项目时，只要保存`package.json`，然后运行`cnpm i`即可。

`--save-dev` 简写 `-D`

## gulp的基本方法

* gulp.src()表示引入文件的方法
* pipe()表示完成后下一步要执行的函数
* gulp.dest()文件输出到对应的目录下
* watch()表示监听文件改动

## 项目目录

    根目录
    |
    |----- src  源文件 
    |
    |----- dist 生产文件
    |
    |----- package.json 
    |
    |----- gulpfile.js
    |
    |----- node_modules


## 任务

### 浏览器热更新 

```js
// 引入模块 gulp核心工具
const gulp = require("gulp");
// 浏览器热更新
const browser_sync = require('browser-sync').create();

gulp.task("browser",function(){
    browser_sync.init({
        server:{
            // 打开的根目录
            baseDir:"./src"
        },
        // 端口号
        port:4000,
    })
    // 监听html改动，并刷新浏览器
    gulp.watch("./src/**/*.html").on("change",browser_sync.reload);
    // 监听scss文件的变化，并且执行sass任务
    gulp.watch("./src/scss/**/*.scss",["sass"]).on("change",browser_sync.reload)
})
```

### 编译sass

```js
// 引入模块 gulp核心工具
const gulp = require("gulp");
// sass编译
const sass = require('gulp-sass');
// 美化css   
const autoprefixer = require('gulp-autoprefixer');

// 编译sass任务
gulp.task("sass",function(){
    gulp.src('./src/scss/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer({    // 美化代码
        browsers: ['last 2 versions', 'Android >= 4.0','iOS 7','last 3 Safari versions'],
        // 添加前缀
        cascade: true
    }))
    .pipe(gulp.dest('./src/css/'))
})
```



