## 定时器的用法

- setTimeout()

- setInterval()

- clearTimeout()，clearInterval()

- 运行机制

- setTimeout(f, 0)
    - 含义
    - 应用

- JavaScript 提供定时执行代码的功能，叫做定时器（timer），主要由setTimeout()和setInterval()这两个函数来完成。它们向任务队列添加定时任务。

#### 1、setTimeout()

- setTimeout函数是用来指定某个函数或代码段，在多少毫秒之后执行，返回一个整数，表示定时器的编号，以后可以用来取消这个编号。

        var timerId = setTimeout(func|code, delay);

- 上面代码中，setTimeout函数接受两个参数，第一个参数func|code是将要推迟执行的函数名或者一段代码，第二个参数delay是推迟执行的毫秒数。

```js
console.log(1);
setTimeout('console.log(2);', 1000);
console.log(3);
// 1
// 3
// 2
// 上面代码会先输出1和3，然后等待1000毫秒再输出2。注意，console.log(2)必须以字符串的形式，作为setTimeout的参数。

function f() {
    console.log(2);
}
setTimeout(f, 1000) // 1秒后执行
```

- setTimeout的第二个参数如果省略，则默认为0。

```js
setTimeout(f)
// 等同于
setTimeout(f,0)
```
> 还有一个需要注意的地方，如果回调函数是对象的方法，那么setTimeout使得方法内部的this关键字指向全局环境，而不是定义时所在的那个对象。

```js
var x = 10
var obj = {
    x: 1,
    y: function() {
        console.log(this.x); // 10
    }
}
setTimeout(obj.y,1000)
// 因为当obj.y在1000毫秒后运行时，this所指向的已经不是obj了，而是全局环境。
```
- 为了防止出现这个问题，一种解决方法是将obj.y放入一个函数。

```js
var x = 1;

var obj = {
  x: 2,
  y: function () {
    console.log(this.x);
  }
};

setTimeout(function () {
  obj.y();
}, 1000);
// 2
// 上面代码中，obj.y放在一个匿名函数之中，这使得obj.y在obj的作用域执行，而不是在全局作用域内执行，所以能够显示正确的值。
```

- 另一种解决方法是，使用bind方法，将obj.y这个方法绑定在obj上面。

```js
var x = 1;

var obj = {
  x: 2,
  y: function () {
    console.log(this.x);
  }
};

setTimeout(obj.y.bind(obj), 1000)
// 2
```
#### 2、setInterval()

- setInterval函数的用法与setTimeout完全一致，区别仅仅在于setInterval指定某个任务每隔一段时间就执行一次，也就是无限次的定时执行。

```js
var i = 1
var timer = setInterval(function() {
  console.log(2);
}, 1000)
```
- 上面代码中，每隔1000毫秒就输出一个2，会无限运行下去，直到关闭当前窗口。

- 与setTimeout一样，除了前两个参数，setInterval方法还可以接受更多的参数，它们会传入回调函数。

- 下面是一个通过setInterval方法实现网页动画的例子。

```js
var div = document.getElementById("div");
var opacity = 1;
var timer = setInterval(()=> {
    opacity -= 0.1;
    if (opacity >= 0) {
        div.style.opacity = opacity;
    } else {
        clearInterval(timer)
    }
}, 1000)
```

### 3、运行机制

- setTimeout和setInterval的运行机制，是将指定的代码移出本轮事件循环，等到下一轮事件循环，再检查是否到了指定时间。如果到了，就执行对应的代码；如果不到，就继续等待。

- 这意味着，setTimeout和setInterval指定的回调函数，必须等到本轮事件循环的所有同步任务都执行完，才会开始执行。由于前面的任务到底需要多少时间执行完，是不确定的，所以没有办法保证，setTimeout和setInterval指定的任务，一定会按照预定时间执行。

        setTimeout(someTask, 100);
        veryLongTask();

- 上面代码的setTimeout，指定100毫秒以后运行一个任务。但是，如果后面的veryLongTask函数（同步任务）运行时间非常长，过了100毫秒还无法结束，那么被推迟运行的someTask就只有等着，等到veryLongTask运行结束，才轮到它执行。

```js
setInterval(()=> {
    console.log(2);
},1000)

step1(3000)
function step1(ms) {
    var start = new Date();
    while(new Date() - start < ms) {
        console.log(new Date() - start);
    }
}
```
- 上面代码中，setInterval要求每隔1000毫秒，就输出一个2。但是，紧接着的sleep语句需要3000毫秒才能完成，那么setInterval就必须推迟到3000毫秒之后才开始生效。注意，生效后setInterval不会产生累积效应，即不会一下子输出三个2，而是只会输出一个2。

### 定时器的应用

setTimeout(f,0)有几个非常重要的用途。可以调整事件的发生循序。比如，在网页开发中，某几个事件发生在子元素，
然后冒泡到父元素，即子元素的事件回调函数。如果想要父元素的事件回调函数先发生，就要用到setTimeout(f,0)

```js
// HTML 代码如下
// <input type="button" id="myButton" value="click">

var input = document.getElementById('myButton');

input.onclick = function A() {
  setTimeout(function B() {
    input.value +=' input';
  }, 0)
};

document.body.onclick = function C() {
  input.value += ' body'
};
```
- 上面代码在点击按钮后，先触发回调函数A，然后触发函数C。函数A中，setTimeout将函数B推迟到下一轮事件循环执行，这样就起到了，先触发父元素的回调函数C的目的了。

## 动画部分

- 做动画要做绝对定位，写left，top，定好位置。

- 动画要从5个方向改变
    - 宽度
    - 高度
    - 水平
    - 垂直
    - 透明度

JS写动画，主要是学逻辑关系，深入研究闭包作用域；并不是完全用JS写动画。CSS3做这个会更好；

### 同步和异步编程

- 同步：上面的事情等待，在此之间要一直等，只有这件事做完才能做下一件事情。

- 异步：模拟多线程，上面的事情在等待中，不需要等它做完，可以继续执行另一件事情。

动画中的几部分:

1.     开始位置、结束位置、总距离；（总距离=结束位置-开始位置）
1.     总运动时间、定时器间隔时间 、步长 ；（步长=(总距离/总运动时间)*定时器间隔时间）
1.     运动的方式:匀速、减速、加速、变速
