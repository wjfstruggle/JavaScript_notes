# css

- [css盒子模型](#css盒子模型)
- [BFC](#BFC)
- [布局居中](#布局居中)
- [css继承的属性](#css继承的属性)

# js

- [数据类型](#数据类型)
  - [typeof](#typeof)
  - [类型转换](#类型转换)
  - [四则运算符](#四则运算符)
- [this](#this)
- [克隆](#克隆)
- [去重](#去重)
- [原型](#原型)
- [es6](#基础知识点)
- [继承](#原型继承和继承)
- [异步编程](#异步编程)
- [Vue常考基础知识点](#Vue常考基础知识点)
- [Vue常考进阶知识点](#Vue常考进阶知识点)

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

# css继承的属性

css继承的属性有：

字体相关：
```css
line-height font-size font-family font-style font-weight font
```

文本相关：
```css
text-indent letter-spacing text-align word-spacing
```

还有一个比较重要的 `color`

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

# 克隆

```js
// 对string， number，array，Boolean，object数据类型克隆

    function deepClone(obj) {
      let objClone = Array.isArray(obj) ? [] : {};
      if (obj !== null && typeof obj === 'object') {
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (obj[key] && typeof obj[key] === 'object') {
              objClone[key] = deepClone(obj[key])
            } else if (obj instanceof Array){
              objClone[key] = obj[key]
            } else {
              return obj
            }
          }
        }
      }
      return objClone
    }
    console.log(deepClone())


    // 对string， number，array，Boolean，object数据类型克隆
    // 方法一
    Object.prototype.clone = function() {
      var o = this.constructor === Array ? [] : {};
      for (var e in this) {
        o[e] = typeof this[e] === "object" ? this[e].clone() : this[e];
      }
      return o;
    };

    // 方法二， 遍历一个对象
    function clone(Obj) {
      var buf;
      if (Obj instanceof Array) {
        buf = []; //创建一个空的数组
        var i = Obj.length;
        while (i--) {
          buf[i] = clone(Obj[i]);
        }
        return buf;
      } else if (Obj instanceof Object) {
        buf = {}; //创建一个空对象
        for (var k in Obj) {
          //为这个对象添加新的属性
          buf[k] = clone(Obj[k]);
        }
        return buf;
      } else {
        //普通变量直接赋值
        return Obj;
      }
    }
    var obj = {
      a: 12
    }
    console.log(clone(obj))
```
# 去重

```js
var arr = [1,2,3,4,4,5,1,8,8,9,9, -1, -1, '1']
    // indexof判断去重
    function indexofDel(arr) {
      var res = []
      for (var i = 0; i < arr.length; i++) {
        if (res.indexOf(arr[i]) === -1 ) {
          res.push(arr[i])
        }
      }
      return res;
    }
    console.log('indexof判断去重',indexofDel(arr))

    // 双循环去重
    function uniqe(arr) {
      var res = []
      for (var i =0;i < arr.length; i++) {
        for (var j = 0; j < res.length; j++) {
          if (arr[i] === res[j]) {
            break;
          }
        }
        // 如果arr[i]是唯一的，那么执行完循环，res.length
        if (j === res.length) {
          res.push(arr[i])
        }
      }
      return res
    }
    console.log('双循环去重',uniqe(arr))

    // object去重
    function objDel(arr) {
      var obj = {};
      return arr.filter(( item, index, arr) => {
        return obj.hasOwnProperty(typeof item + item) ? false : obj[typeof item + item] = true
      })
    }
    console.log('object去重',objDel(arr))

    // es6 set数据结构
    function setData(arr) {
      return [... new Set(arr)]
    }
    console.log('es6 set数据结构',setData(arr))

    // 排序后去重
    // 试想我们先将要去重的数组使用 sort 方法排序后，相同的值就会被排在一起，然后我们就可以只判断当前元素与上一个元素是否相同，相同就说明重复，不相同就添加进 res
    function sortdel(arr) {
      var res = [];
      var sortArray = arr.concat().sort();
      var seen;
      for (var i = 0; i < sortArray.length; i++ ) {
        if (!i || seen !== sortArray[i]) {
          res.push(sortArray[i])
        }
        seen = sortArray[i]
      }
      return res;
    }
    console.log('排序后去重',sortdel(arr))

    // filter + indexOf 简化内层循环
    function del(arr) {
      return arr.filter( (item, index, arr) => {
        return arr.indexOf(item) === index
      })
    }
    console.log('filter + indexOf 简化内层循环',del(arr))
```

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

# 基础知识点

## var、let 及 const 区别

> 涉及面试题：什么是提升？什么是暂时性死区？var、let 及 const 区别？

对于这个问题，我们应该先来了解提升（hoisting）这个概念。

```js
console.log(a) // undefined
var a = 1;
```
从上述代码中我们可以发现，虽然变量还没有被声明，但是我们却可以使用这个未被声明的变量，这种情况就叫做提升，并且提升的是声明。

从上述代码中我们可以发现，虽然变量还没有被声明，但是我们却可以使用这个未被声明的变量，这种情况就叫做提升，并且提升的是声明。

对于这种情况，我们可以把代码这样来看

```js
var a
console.log(a) // undefined
a = 1
```

接下来我们再来看一个例子

```js
var a = 10
var a
console.log(a)
```

对于这个例子，如果你认为打印的值为 undefined 那么就错了，答案应该是 10，对于这种情况，我们这样来看代码

```js
var a
var a
a = 10
console.log(a)
```
到这里为止，我们已经了解了 var 声明的变量会发生提升的情况，其实不仅变量会提升函数也会被提升。

```js
console.log(a) // ƒ a() {}
function a() {}
var a = 1
```

对于上述代码，打印结果会是 `ƒ a() {}`，即使变量声明在函数之后，这也说明了函数会被提升，并且优先于变量提升。

说完了这些，想必大家也知道 `var` 存在的问题了，使用 `var` 声明的变量会被提升到作用域的顶部，接下来我们再来看 `let` 和 `const` 。

```js
var a = 1
let b = 1
const c = 1
console.log(window.b) // undefined
console.log(window. c) // undefined

function test(){
  console.log(a)
  let a
}
test()
```
首先在全局作用域下使用 `let` 和 `const` 声明变量，变量并不会被挂载到 `window` 上，这一点就和 `var` 声明有了区别。

> 那么最后我们总结下这小节的内容：

- 函数提升优先于变量提升，函数提升会把整个函数挪到作用域顶部，变量提升只会把声明挪到作用域顶部

- `var` 存在提升，我们能在声明之前使用。`let、const` 因为暂时性死区的原因，不能在声明前使用

- `var` 在全局作用域下声明变量会导致变量挂载在 `window` 上，其他两者不会

- `let` 和 `const` 作用基本一致，但是后者声明的变量不能再次赋值

# 原型继承和 Class 继承

> 涉及面试题：原型如何实现继承？Class 如何实现继承？Class 本质是什么？

首先先来讲下 `class`，其实在 `JS` 中并不存在类，`class` 只是语法糖，本质还是函数。

```js
class Person {}
Person instanceof Function // true
```
### 组合继承

```js
function Foo(name) {
  this.name = name
}
Foo.prototype.getValue = function() {
  console.log(this.name)
}
function Bar(value) {
  Foo.call(this, value)
}
Bar.prototype = new Foo();
const bar = new Bar("jack")
bar.getValue() // jack
bar instanceof Foo; // true
```

以上继承的方式核心是在子类的构造函数中通过 `Parent.call(this)` 继承父类的属性，然后改变子类的原型为 `new Parent()` 来继承父类的函数。

## 寄生式组合继承
```js
function Foo(name) {
  this.name = name
}
Foo.prototype.getValue = function() {
  console.log(this.name)
}
function Bar(value) {
  Foo.call(this, value)
}
Bar.prototype = Object.create(Foo.prototype, {
  constructor: {
    value: Bar,
    enumerable: false,
    writable: true,
    configurable: true
  }
});
const bar = new Bar("jack")
bar.getValue() // jack
bar instanceof Foo; // true
```
以上继承实现的核心就是将父类的原型赋值给了子类，并且将构造函数设置为子类，这样既解决了无用的父类属性问题，还能正确的找到子类的构造函数。

## class继承

```js
class Parent {
  constructor(name) {
    this.name = name
  }
  getValue() {
    console.log(this.name)
  }
}
class Son extends Parent {
  constructor(job, name) {
    super(name)
    this.name = name
  }
}
let son = new Son('jenny')
son.getValue() // jenny
son instanceof Parent
```

`class` 实现继承的核心在于使用 `extends` 表明继承自哪个父类，并且在子类构造函数中必须调用 `super`，因为这段代码可以看成 `Parent.call(this, value)。`

## map, filter, reduce

> 涉及面试题：map, filter, reduce 各自有什么作用？

`map `作用是生成一个新数组，遍历原数组，将每个元素拿出来做一些变换然后放入到新的数组中。

`[1, 2, 3].map(v => v + 1) // -> [2, 3, 4]`
另外 map 的回调函数接受三个参数，分别是当前索引元素，索引，原数组

```js
['1','2','3'].map(parseInt)
第一轮遍历 parseInt('1', 0) -> 1
第二轮遍历 parseInt('2', 1) -> NaN
第三轮遍历 parseInt('3', 2) -> NaN
```

filter 的作用也是生成一个新数组，在遍历数组的时候将返回值为 true 的元素放入新数组，我们可以利用这个函数删除一些不需要的元素

```js
let array = [1, 2, 4, 6]
let newArray = array.filter(item => item !== 6)
console.log(newArray) // [1, 2, 4]
```

和 `map `一样，`filter` 的回调函数也接受三个参数，用处也相同。

最后我们来讲解 `reduce` 这块的内容，同时也是最难理解的一块内容。`reduce` 可以将数组中的元素通过回调函数最终转换为一个值。

如果我们想实现一个功能将函数里的元素全部相加得到一个值，可能会这样写代码

```js
const arr = [1, 2, 3]
let total = 0
for (let i = 0; i < arr.length; i++) {
  total += arr[i]
}
console.log(total) //6 
```

但是如果我们使用 `reduce` 的话就可以将遍历部分的代码优化为一行代码

```js
const arr = [1, 2, 3]
const sum = arr.reduce((acc, current) => acc + current, 0)
console.log(sum)
```

对于 `reduce` 来说，它接受两个参数，分别是回调函数和初始值，接下来我们来分解上述代码中 `reduce` 的过程

- 首先初始值为 0，该值会在执行第一次回调函数时作为第一个参数传入

- 回调函数接受四个参数，分别为累计值、当前元素、当前索引、原数组，后三者想必大家都可以明白作用，这里着重分析第一个参数

- 在一次执行回调函数时，当前值和初始值相加得出结果 1，该结果会在第二次执行回调函数时当做第一个参数传入

- 所以在第二次执行回调函数时，相加的值就分别是 1 和 2，以此类推，循环结束后得到结果 `6`

- 想必通过以上的解析大家应该明白 `reduce` 是如何通过回调函数将所有元素最终转换为一个值的，当然 `reduce` 还可以实现很多功能，接下来我们就通过 `reduce` 来实现 `map` 函数

```js
const arr = [1, 2, 3]
const mapArray = arr.map(value => value * 2)
const reduceArray = arr.reduce((acc, current) => {
  acc.push(current * 2)
  return acc
}, [])
console.log(mapArray, reduceArray) // [2, 4, 6]
```
# 异步编程

## Generator

> 涉及面试题：你理解的 Generator 是什么？

`Generator` 算是 ES6 中难理解的概念之一了，`Generator` 最大的特点就是可以控制函数的执行。在这一小节中我们不会去讲什么是 `Generator`，而是把重点放在 `Generator` 的一些容易困惑的地方。

```js
function *foo(x) {
  let y = 2 * (yield (x + 1))
  let z = yield (y / 3)
  return (x + y + z)
}
let it = foo(5)
console.log(it.next())   // => {value: 6, done: false}
console.log(it.next(12)) // => {value: 8, done: false}
console.log(it.next(13)) // => {value: 42, done: true}
```

你也许会疑惑为什么会产生与你预想不同的值，接下来就让我为你逐行代码分析原因

首先` Generator` 函数调用和普通函数不同，它会返回一个迭代器
当执行第一次 `next` 时，传参会被忽略，并且函数暂停在` yield (x + 1) `处，所以返回 `5 + 1 = 6`
当执行第二次 next 时，传入的参数等于上一个 `yield` 的返回值，如果你不传参，`yield` 永远返回 `undefined`。此时 `let y = 2 * 12`，所以第二个 `yield` 等于 `2 * 12 / 3 = 8`
当执行第三次 `next` 时，传入的参数会传递给 z，所以 `z = 13, x = 5,` `y = 24`，相加等于 `42`
`Generator` 函数一般见到的不多，其实也于他有点绕有关系，并且一般会配合 `co` 库去使用。当然，我们可以通过 `Generator` 函数解决回调地狱的问题，可以把之前的回调地狱例子改写为如下代码：

```js
function *fetch() {
    yield ajax(url, () => {})
    yield ajax(url1, () => {})
    yield ajax(url2, () => {})
}
let it = fetch()
let result1 = it.next()
let result2 = it.next()
let result3 = it.next()
```

# Promise

> 涉及面试题：`Promise` 的特点是什么，分别有什么优缺点？什么是 `Promise` 链？`Promise` 构造函数执行和 then 函数执行有什么区别？

`Promise` 翻译过来就是承诺的意思，这个承诺会在未来有一个确切的答复，并且该承诺有三种状态，分别是：

等待中`（pending）`

完成了 `（resolved）`

拒绝了`（rejected）`

这个承诺一旦从等待状态变成为其他状态就永远不能更改状态了，也就是说一旦状态变为 `resolved` 后，就不能再次改变

```js
new Promise((resolve, reject) => {
  resolve('success')
  // 无效
  reject('reject')
})
```

当我们在构造 `Promise` 的时候，构造函数内部的代码是立即执行的

```js
new Promise((resolve, reject) => {
  console.log('new Promise')
  resolve('success')
})
console.log('finifsh')
// new Promise -> finifsh
```

`Promise `实现了链式调用，也就是说每次调用 `then` 之后返回的都是一个 `Promise`，并且是一个全新的 `Promise`，原因也是因为状态不可变。如果你在 `then` 中 使用了 `return`，那么 `return` 的值会被 `Promise.resolve()` 包装

```js
Promise.resolve(1)
  .then(res => {
    console.log(res) // => 1
    return 2 // 包装成 Promise.resolve(2)
  })
  .then(res => {
    console.log(res) // => 2
  })

```
当然了，`Promise` 也很好地解决了回调地狱的问题，可以把之前的回调地狱例子改写为如下代码：

```js
ajax(url)
  .then(res => {
      console.log(res)
      return ajax(url1)
  }).then(res => {
      console.log(res)
      return ajax(url2)
  }).then(res => console.log(res))
```

前面都是在讲述 Promise 的一些优点和特点，其实它也是存在一些缺点的，比如无法取消 Promise，错误需要通过回调函数捕获。

`async` 及 `await`

> 涉及面试题：`async` 及 `await` 的特点，它们的优点和缺点分别是什么？`await `原理是什么？

一个函数如果加上 `async` ，那么该函数就会返回一个 Promise

```js
async function test() {
  return "1"
}
```

`console.log(test()) // -> Promise {<resolved>: "1"}`
`async` 就是将函数返回值使用 `Promise.resolve()` 包裹了下，和 `then` 中处理返回值一样，并且 `await` 只能配套 `async` 使用

```js
async function test() {
  let value = await sleep()
}
```

`async` 和 `await` 可以说是异步终极解决方案了，相比直接使用 Promise 来说，优势在于处理 then 的调用链，能够更清晰准确的写出代码，毕竟写一大堆 then 也很恶心，并且也能优雅地解决回调地狱问题。当然也存在一些缺点，因为 `await` 将异步代码改造成了同步代码，如果多个异步代码没有依赖性却使用了 `await` 会导致性能上的降低。

```js
async function test() {
  // 以下代码没有依赖性的话，完全可以使用 Promise.all 的方式
  // 如果有依赖性的话，其实就是解决回调地狱的例子了
  await fetch(url)
  await fetch(url1)
  await fetch(url2)
}
```

下面来看一个使用 `await` 的例子：

```js
let a = 0
let b = async () => {
  a = a + await 10
  console.log('2', a) // -> '2' 10
}
b()
a++
console.log('1', a) // -> '1' 1
```

对于以上代码你可能会有疑惑，让我来解释下原因

首先函数 `b` 先执行，在执行到 await 10 之前变量 a 还是 0，因为 `await` 内部实现了 `generator `，`generator` 会保留堆栈中东西，所以这时候 `a = 0` 被保存了下来

因为 `await` 是异步操作，后来的表达式不返回 `Promise` 的话，就会包装成 `Promise.reslove`(返回值)，然后会去执行函数外的同步代码
同步代码执行完毕后开始执行异步代码，将保存下来的值拿出来使用，这时候 `a = 0 + 10`

上述解释中提到了 `await` 内部实现了 `generator，`其实 `await` 就是 `generator` 加上 `Promise` 的语法糖，且内部实现了自动执行 `generator`。如果你熟悉 `co` 的话，其实自己就可以实现这样的语法糖。

常用定时器函数
涉及面试题：`setTimeout、setInterval、requestAnimationFrame` 各有什么特点？

异步编程当然少不了定时器了，常见的定时器函数有 `setTimeout、``setInterval、requestAnimationFrame。`我们先来讲讲最常用的`setTimeout`，很多人认为 `setTimeout` 是延时多久，那就应该是多久后执行。

其实这个观点是错误的，因为 JS 是单线程执行的，如果前面的代码影响了性能，就会导致 `setTimeout` 不会按期执行。当然了，我们可以通过代码去修正 `setTimeout`，从而使定时器相对准确

```js
let period = 60 * 1000 * 60 * 2
let startTime = new Date().getTime()
let count = 0
let end = new Date().getTime() + period
let interval = 1000
let currentInterval = interval

function loop() {
  count++
  // 代码执行所消耗的时间
  let offset = new Date().getTime() - (startTime + count * interval);
  let diff = end - new Date().getTime()
  let h = Math.floor(diff / (60 * 1000 * 60))
  let hdiff = diff % (60 * 1000 * 60)
  let m = Math.floor(hdiff / (60 * 1000))
  let mdiff = hdiff % (60 * 1000)
  let s = mdiff / (1000)
  let sCeil = Math.ceil(s)
  let sFloor = Math.floor(s)
  // 得到下一次循环所消耗的时间
  currentInterval = interval - offset 
  console.log('时：'+h, '分：'+m, '毫秒：'+s, '秒向上取整：'+sCeil, '代码执行时间：'+offset, '下次循环间隔'+currentInterval) 

  setTimeout(loop, currentInterval)
}

setTimeout(loop, currentInterval)
```

接下来我们来看 `setInterval`，其实这个函数作用和 `setTimeout` 基本一致，只是该函数是每隔一段时间执行一次回调函数。

通常来说不建议使用 `setInterval`。第一，它和 `setTimeout` 一样，不能保证在预期的时间执行任务。第二，它存在执行累积的问题，请看以下伪代码

```js
function demo() {
  setInterval(function(){
    console.log(2)
  },1000)
  sleep(2000)
}
demo()
```

以上代码在浏览器环境中，如果定时器执行过程中出现了耗时操作，多个回调函数会在耗时操作结束以后同时执行，这样可能就会带来性能上的问题。

如果你有循环定时器的需求，其实完全可以通过` requestAnimationFrame` 来实现

```js
function setInterval(callback, interval) {
  let timer
  const now = Date.now
  let startTime = now()
  let endTime = startTime
  const loop = () => {
    timer = window.requestAnimationFrame(loop)
    endTime = now()
    if (endTime - startTime >= interval) {
      startTime = endTime = now()
      callback(timer)
    }
  }
  timer = window.requestAnimationFrame(loop)
  return timer
}
```

```js
let a = 0
setInterval(timer => {
  console.log(1)
  a++
  if (a === 3) cancelAnimationFrame(timer)
}, 1000)
```

首先 `requestAnimationFrame` 自带函数节流功能，基本可以保证在 16.6 毫秒内只执行一次（不掉帧的情况下），并且该函数的延时效果是精确的，没有其他定时器时间不准的问题，当然你也可以通过该函数来实现 setTimeout。

# Vue常考基础知识点

## 10个生命周期的理解

- `created`阶段  数据`data`和`methods`的初始化

- `mounted`阶段  `vue`实列的挂载，将`data`数据和函数的调用，渲染到页面上，数据驱动视图

- `updated`阶段  更新模板上的数据和`data`一致。

- `destoryed`阶段 移除监听事件，数据的绑定

- `activated`阶段 用 `keep-alive` 包裹的组件在切换时不会进行销毁，而是缓存到内存中并执行 `deactivated` 钩子函数，命中缓存渲染后会执行 `actived` 钩子函数。

## 组件间的通信

父子组件通信

# Vue常考进阶知识点

`vue`响应式原理： 当一个`vue`实例创建的时候，`vue`会遍历`data`选项的属性，用`object.defineProperty`将他们转换为`getter`和`setter`并且
追踪内部相关的依赖，属性被访问或者修改的时候通知变化。每个组件都有相应的`watcher`实列，他会在组件渲染的过程中把属性记录作为依赖，之后当依赖项
的`setter`被调用的时候，会同时`watcher`重新计算，关联的数据就会更新。

```js
var data = {
  name: 'zt'
}
function update() {
  console.log('更新视图', data)
}
// obj代表监听对象， key对象上的属性， value初始值
function defineReacite(obj, key, value) {
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      console.log('get')
      return value
    },
    set(newValue) {
      console.log('set')
      if (newValue === value) {
        return;
      }
      update(newValue)
      value = newValue
    }
  })
}
// 观察值， 表示data的所有属性都应该被观察
function Observer() {
  // 获取所有的属性名，自身属性
  Object.keys(data).forEach(function(key) {
    defineReacite(data, key, data[key])
  })
}

class Vue {
  constructor(options) {
    this._data = options.data
    // 将data內的所有属性变成可观察模式
    Observer(this._data) 
  }
}
const app = new Vue({
  el: "#app",
  data: {
    name: 'zt'
  }
})

console.log(app._data)
//  通过data.name set设置值。watch就会重新计算
```