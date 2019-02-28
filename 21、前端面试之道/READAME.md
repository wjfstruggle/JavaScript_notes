# css

- [css盒子模型](#css盒子模型)
- [BFC](#BFC)
- [布局居中](#布局居中)

# js

- [数据类型](#数据类型)
  - [typeof](#typeof)
  - [类型转换](#类型转换)
- [原型](#原型)

# css盒子模型

css盒子模型规定元素的处理： `包含content，padding，margin，border`

分为两种： IE盒模型，标准盒模型

IE： `content`（内容区域）+ `padding` + `border`

标准盒模型： `content`（内容区域）+ `padding` + `border` +`margin`

# BFC

**块级格式上下文** ，是一个独立的渲染区域，让处于BFC的内部元素与外部元素互相隔离，使内部元素的定位不收影响。

> ie下为layout。可以通过zoom: 1 触发

- 触发条件

  - 根元素
  - `position: absolute/fixed`
  - `display: inline-block / table`
  - `float` 元素
  - `overflow !== visible`

- 应用
  - 阻止margin重叠
  - 清除内部浮动元素
  - 自适应两栏布局
  - 可以阻止元素被浮动元素覆盖

```html
<div class="header">
  <ul>
    <li>首页</li>
    <li>新闻</li>
    <li>关于</li>
    <li>更多</li>
  </ul>
  <div class="box"></div>
  <div class="box fr"></div>
  <div class="clear"></div>
</div>
```

- 清浮动三种方法
  - 参css伪类清浮动

```css
*{
  margin: 0;
  padding: 0;
  list-style: none;
}
.header {
  background-color: skyblue;
  border: 9px solid #ccc;
}
.box {
  height: 50px;
  width: 50px;
  background-color: rgb(31, 72, 88);
  float: left;
}
ul::after {
  /* 方法一： 伪类清除浮动 */
  content: '';
  display: block;
  line-height: 0;
  height: 0;
  clear: both;
  visibility: hidden;
}
ul {
  zoom: 1; /*ie*/
}
```

  - 容器加上 overflow: hidden;

```css
ul {
  /* 方法二 容器加上 overflow: hidden; */
  overflow: hidden; 
}
```
  - 在浮动元素在添加一个空的div标签 css: clear: both;
```css
.clear {
  /* 方法三 在浮动元素在添加一个空的div标签 css: clear: both; */
  clear: both;
}
.fr {
  float: right;
}
```

# 布局居中

- 水平居中
  - 行内元素： `text-align:center;`
  - 块级元素： `margin: 0 auto;`
  - `position: absolute;transform: translateX(-50%);left: 50%;`
  - `display: flex;justify-content: center;`

- 垂直居中
  - `position: absolute;transform: translateY(-50%);top: 50%;`
  - `display: flex;align-items: center;`

- 水平垂直居中
  - `absolute + transform`
    `flex + justify-content + align-items`

# 数据类型

js一共有7种数据类型：`null`，`number`，`undefined`，`string`，`boolean`，`Object`， `Symbol`

数据类型又分为基本类型（`null`，`number`，`undefined`，`string`，`boolean`， `Symbol`）和对象（，`Object`）。基本类型存放在栈内存，对象（引用类型）存放在堆内存。

## typeof

typeof可以检测基本类型，除了null之外

```js
typeof(null);//object

typeof('a');// string
typeof(1);//number
typeof(undefined);//undefined
typeof(false);//boolean
typeof(Symbol());//Symbol
```

typeof对于对象，除了函数都会返回object

```js
typeof [] // 'object'
typeof {} // 'object'
typeof console.log // 'function'
```

## 类型转换

转换为Boolean：`""空字符转`,`null`,`false`，`0 -0`, `NAN` `undefined`, 其他值都转为true，包括所有对象和数组和函数。

# 原型

"万物皆对象"，js的所有数据基于object原型链继承而来的。原型对象上的`__proto__`属性继承方法或属性。原型对象上的constructor属性表示构造函数通过instanceof来确认对象的来源；实列化的对象可以通过`__proto__`指向构造函数的原型，构造函数可以通过prototype属性得到。

所有的函数都有一个`prorotype`属性，除了 `Function.prototype.bind()`，该属性指向原型。
所有的对象都有一个`__proto__`,指向该实例化对象的构造函数，对象可以通过`__proto__`来确认不属于该对象的属性
`__proto__`将对象链接起形成原型链
![prototype](https://camo.githubusercontent.com/71cab2efcf6fb8401a2f0ef49443dd94bffc1373/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f332f31332f313632316538613962636230383732643f773d34383826683d35393026663d706e6726733d313531373232)

# js继承

构造函数的缺点，构造函数的属性和方法不能共享，从而造成系统资源的浪费
原型的继承主要用于一些父类需要使用时，可以继承给子类使用，节省内存和提高代码复用性。
```js
// es5继承
  // 从构造函数，原型对象，实例关系阐述
  // 父函数
  function Father(name, age) {
    this.name = name;
    this.age = age;
    this.sayName = function() {
      console.log('姓名'+this.name + ' ' + '年龄'+ this.age)
    }
  }
  var fa = new Father('jack', 18)
  console.log(fa.sayName())

  function Son() {
  }
  Son.prototype = new Father()
  var son = new Son()
  Son.prototype.__proto__ === Father.prototype // true
  Father.prototype.constructor === Father // 构造器
  fa.__proto__ === Father.prototype // 实列
  Function.prototype.__proto__ === Object.prototype
  Object.prototype.__proto__ === null
```
```js
// es6继承
    class Animate {
      constructor(name) {
        this.name = name
      }
      sayName() {
        console.log('do something')
      }
    }

    // 继承
    class Cat extends Animate {
      constructor (name, job) {
        super(job)
        this.name = name
      }
    }
    const cat = new Cat('jack', 'web前端开发')
    cat.name
    cat.sayName()
```

# 闭包

> 简单讲，闭包就是一个嵌套的函数有权访问另一个函数作用域的变量

> MDN 上这么说，闭包是一种特殊的对象，由两部分组成，函数和函数的运行环境(也就是函数作用域)

创建一个闭包最简单的方式，一个函数内部创建另一个函数
```js
function apple() {
  var a = 10;
  function add() {
    return a
  }
  return add
}
var f = apple() // 10
```

闭包的作用域链包含着他自己的作用域以及包含他的函数作用域和全局作用域。

闭包的注意事项：
- 通常一个函数执行完毕后，变量就会被销毁。但是对于闭包来说，这个函数的作用域就会一直保存到闭包不存在为止

```js
function animate(x) {
  return function(y) {
    return x + y
  }
}
var add1 = animate(12)
var add2 = animate(10)
console.log(add1(12)); // 24
console.log(add2(1)); // 11
//释放对闭包的引用
add1 = null
add2 = null
```
add1 和 add2 都是闭包。它们共享相同的函数定义，但是保存了不同的环境。在 add1 的环境中，x 为 12。而在 add2 中，x 则为 10。最后通过 null 释放了 add1 和 add2 对闭包的引用。

闭包的缺陷
- 闭包的缺点就是常驻内存会增大内存使用量，并且使用不当很容易造成内存泄露。

- 如果不是因为某些特殊任务而需要闭包，在没有必要的情况下，在其它函数中创建函数是不明智的，因为闭包对脚本性能具有负面影响，包括处理速度和内存消耗。


vue响应式原理： 当一个vue实例创建的时候，vue会遍历data选项的属性，用object.defineProperty将他们转换为getter和setter并且
		追踪内部相关的依赖，属性被访问或者修改的时候通知变化。每个组件都有相应的watcher实列，他会在组件渲染的过程中把属性记录作为依赖，之后当依赖项
		的setter被调用的时候，会同时watcher重新计算，关联的数据就会更新。

2. 变量作用域链
- 作用域链是在函数定义的时候产生的，而不是函数运行时，作用域链由内而外开始寻找变量，直到最顶层window才结束。

3. call、apply、bind的区别
- 相同点，都可以改变this的指向。函数.call(this, 参数1，参数2)， call方法接收多个参数， apply(this, [...]) apply方法后面可接多个参数，以数组形式。bind(函数的某个对象) 返回的是一个新函数。bind改变指向后的那个函数不能再次改变指向。
4. 防抖和节流的区别
- 防抖：一定时间内，只让函数触发一次，（后做）
- 节流：在一定时间间隔后才能触发函数（先做）

5. 介绍下浏览器跨域
- 由于浏览器的同源策略，只要是协议，域名，端口号任意一个不相同，就会造成浏览器的跨域

6. 怎么去解决跨域问题
- jsonp跨域，（只能get请求）前端动态创建script标签，后端也要响应处理，前端呀设置callback参数，利用script的src去下载一段脚本，这个脚本就用前端传过来的callback的值进行封装。
- 后端打开CORS允许头， Access-Control-Allow-Origin: *
- 反向代理：让后端服务器去请求别人的服务器，自己的服务器拿到的数据返回给后端，利用无需跨域的服务端A，请求到服务端A,通过服务端A和服务端B之间的链接，再返回给前端。
7. jsonp方案需要服务端怎么配合
- jsonp跨域，（只能get请求）客户端传一个callback参数指定回调的函数，服务端将函数名包裹返回数据并返回客户端。
8. Ajax发生跨域要设置什么（前端）
- 需要设置请求头： setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
9. Javascript作用域链?
- JavaScript有两种作用域，一个是全局作用域，一个是函数作用域。函数本身也是一个值，也有自己的作用域。它的作用域与变量一样，就是其声明时所在的作用域，与其运行时所在的作用域无关。由内而外，就会形成一条作用域链。
10. JavaScript 中，调用函数有哪几种方式？
- 调用函数名
- 自执行函数
- call/apply
- 方法调用(调用对象方法)
11. JavaScript 对象生命周期的理解？

开辟内存空间
声明变量，并赋值 (确认变量的作用域)
作用域使用完成以后，变量也去除标记
根据垃圾回收机制，处理无用的变量和对应的数据

12. cookie的作用和特点 [cookie](http://bubkoo.com/2014/04/21/http-cookies-explained/)
> 由于http协议是一种无状态，无连接的通信协议，通过cookie的传输来确认
- 用于存储数据，可以作为登录凭证的标识： 特点：可以被http传输，服务端可以主动向客户端设置。 有大小限制，上限为4kb, 数量在30 ~ 50个左右。
13. 一个页面从输入 URL 到页面加载显示完成，这个过程中都发生了什么？
- 1、域名解析
- 2、发起TCP三次握手
- 3、建立TCP连接后发起http请求
- 4、服务端响应http请求，向浏览器得到HTML代码
- 5、浏览器解析HTML代码，请求HTML代码中的资源
- 6、浏览器对页面进行渲染，呈现给用户
14. vue的优点是什么？
- vue两大特点：响应式编程、组件化
- vue的优势：轻量级框架、简单易学、双向数据绑定、组件化、视图、数据和结构的分离、虚拟DOM、运行速度快
15. 请详细说下你对vue生命周期的理解
- 8个生命周期
- beforeCreate() created() 创建前后，create阶段，初始化，data和methods
- beforeMount mounted() mounted阶段， 将data和函数等渲染到页面，数据驱动视图
- beforeUpdate updated ，更新模板上的数据和data一致
- beforeDestroy destroyed 移除监听事件，数据的绑定
16. 组件之间的传值？(代码说明)
- 父传子，子传父
- 非父子通信 另一个实例一个vue对象，该对象作为 监听/ 触发自定义事件的使用。
17. vuex是什么？怎么使用？哪种功能场景使用它？
- vuex是vue状态管理。使用： 在main.js中引入store，new vue中挂载，使用场景：多个共享共同状态的组件时，登录状态，用户权限分类，跨组件的数据依赖
18. Vue computed 实现
- 1、初始化时，遍历computed的属性，并且计算结果
- 2、依赖收集（依赖那些数据 ， 在这些数据上增加watcher， 当这些依赖数据发生变化 `setter`, 再次触发计算属性函数， 更新对应的值）
19. Vue 组件 data 为什么必须是函数
- 组件的data数据变成一个独立的对象，避免多个组件共用同一个对象。