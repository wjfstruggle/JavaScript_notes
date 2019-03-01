# css

- [css盒子模型](#css盒子模型)
- [BFC](#BFC)
- [布局居中](#布局居中)

# js

- [数据类型](#数据类型)
  - [typeof](#typeof)
  - [类型转换](#类型转换)
  - [四则运算符](#四则运算符)
- [this](#this)
- [== vs ===](#== vs ===)
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

## typeof VS instanceof

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
### instanceof 能正确判断对象的原理是什么
- 内部机制是通过原型链来判断的。
```js
 function Person() {

    }
  const p1 = new Person()
  p1 instanceof Person // true

  var str = 'hello world'
  str instanceof String // false

  var str = new String('hello world')
  str instanceof String // true
```
- 对于原始类型来说，想直接通过instanceof来判断是不行的

## 类型转换

![](https://user-gold-cdn.xitu.io/2018/11/15/16716dec14421e47?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

转换为Boolean：`""空字符转`,`null`,`false`，`0 -0`, `NaN` `undefined`, 其他值都转为true，包括所有对象

# 四则运算符

加法运算符不等同于其他几个运算符，他有以下几个特点。

- 运行中一方是自字符串，就换把另一方转为字符串

- 如果一方不是字符串或者数字，那么会将它转换为数字或者字符串

```js
1 + "1" = "11"
true + true = 2
1 + false = 1;
1 + NaN = NaN
1 + [1,2,3] = "11, 2, 3"
'a' + + 'b' // -> "aNaN"
4 * '3' // 12
4 * [] // 0
4 * [1, 2] // NaN
```
因为 + 'b' 等于 NaN，所以结果为 "aNaN"，你可能也会在一些代码中看到过 + '1' 的形式来快速获取 number 类型。

# this

> 涉及面试题：如何正确判断 this？箭头函数的 this 是什么？

来看几个函数调用的场景

```js
function foo() {
  var a = 0;
  console.log(this.a);// 10      
}
var a = 10;
foo()
const obj = {
  a: 2,
  foo: foo
}
obj.foo() // 2
const o = new foo();
```

- 对于直接调用`foo`来说，不管foo函数被放在了哪个地方， `this`一定是`window`

- 对于`obj.foo()`来说，我们只需要记住，水调用函数，谁就是`this`，所以在这个场景这下`foo`函数中的this就是`obj`对象

- 对于`new`的方式来说，`this`永远被绑定在`o`上面，不会被任何方式改变`this`

```js
function bar() {
  return (() => {
    return (() => {
      console.log(this)
    })
  })
}
bar()()() // window
```
首先箭头函数其实是没有` this` 的，箭头函数中的 `this` 只取决包裹箭头函数的第一个普通函数的 `this`。在这个例子中，因为包裹箭头函数的第一个普通函数是 `a`，所以此时的 `this` 是 `window`。另外对箭头函数使用 `bind` 这类函数是无效的。

最后种情况也就是 `bind` 这些改变上下文的 `API` 了，对于这些函数来说，`this` 取决于第一个参数，如果第一个参数为空，那么就是 `window。`
```js
let b = {};
let fn = function() {
  console.log(this)
}
fn.bind().bind(b)() // window
fn.bind(b)() // {}
```

如果你认为输出结果是 `b`，那么你就错了，其实我们可以把上述代码转换成另一种形式

```js
// fn.bind().bind(a) 等于
let fn2 = function fn1() {
  return function() {
    return fn.apply()
  }.apply(a)
}
fn2()
```

可以从上述代码中发现，不管我们给函数 `bind` 几次，`fn` 中的 this 永远由第一次 `bind` 决定，所以结果永远是 `window。`

首先，new 的方式优先级最高，接下来是 bind 这些函数，然后是 obj.foo() 这种调用方式，最后是 foo 这种调用方式，同时，箭头函数的 this 一旦被绑定，就不会再被任何方式所改变。

如果你还是觉得有点绕，那么就看以下的这张流程图吧，图中的流程只针对于单个规则。

![](https://user-gold-cdn.xitu.io/2018/11/15/16717eaf3383aae8?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

# == vs ===

> 涉及面试题：== 和 === 有什么区别？

对于 `==` 来说，如果对比上方的类型不一致的话，就会进行**类型转换**

1、首先会判断两者类型是否相同。相同的话就是比大小了
2、类型不相同的话，那么就会进行类型转换
3、会先判断是否在对比 `null` 和 `undefined`，是的话就会返回 `true`
4、判断两者类型是否为 `string` 和 `number`，是的话就会将字符串转换为 `number`

```js
1 == '1'
      ↓
1 == 1
```
5、判断其中一方是否为` boolean`，是的话就会把 `boolean` 转为 `number` 再进行判断

6、判断其中一方是否为 `object` 且另一方为 `string、number` 或者 `symbol`，是的话就会把 `object` 转为原始类型再进行判断
```js
'1' == { name: 'yck' }
        ↓
'1' == '[object Object]'
```
![](https://user-gold-cdn.xitu.io/2018/12/19/167c4a2627fe55f1?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



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