### javascipt内置对象

- Math 是一个内置对象， 它具有数学常数和函数的属性和方法。不是一个函数对象。

- 描述

	- 与其它全局对象不同的是, Math 不是一个构造器.  Math 的所有属性和方法都是静态的. 你用到的常数pi可以用 Math.PI 表示,用 x 作参数 Math.sin(x)调用sin函数. JavaScript中的常数, 是以全精度的实数定义的.
	
- 属性

```javascript
/*
Math.E
	欧拉常数，也是自然对数的底数, 约等于 2.718.
Math.LN2
	2的自然对数, 约等于0.693.
Math.LN10
	10的自然对数, 约等于 2.303.
Math.LOG2E
	以2为底E的对数, 约等于 1.443.
Math.LOG10E
	以10为底E的对数, 约等于 0.434.
Math.PI
	圆周率，一个圆的周长和直径之比，约等于 3.14159.
Math.SQRT1_2
	1/2的平方根, 约等于 0.707.
Math.SQRT2
	2的平方根,约等于 1.414.
 * */

console.log(Math.PI) // 3.141592653589793

// 根号2
console.log(Math.SQRT2) // 1.4142135623730951

// 指数Math.pow(x,y)
console.log(Math.pow(2, 3)) // 2的3次方

// Math.sqrt(x)返回x的平方根.
console.log(Math.sqrt(9)) // 3 9开根号

// Math.cbrt(x) 返回x的立方根.
console.log(Math.cbrt(27)) // 3

// Math.hypot([x[,y[,…]]]) 返回其参数平方和的平方根。
console.log(Math.hypot(3,4)) // 接收多个参数

Math.random() // 随机数
Math.ceil() // 向上取整
Math.floor() // 向下取整
Math.round()// 四舍五入

// 取最大值Math.max([x[,y[,…]]])返回0个到多个数值中最大值
console.log(Math.max(12,45,1,2,89))
//Math.min([x[,y[,…]]])返回0个到多个数值中最小值.
console.log(Math.min(12,45,1,2,89))

// 三角函数
console.log("正弦", Math.sin(Math.PI /2))
console.log("余弦", Math.cos(0))
console.log("正切", Math.tan(Math.PI /4))

// 绝对值

console.log("绝对值",Math.abs(-1))

// [5, 16)
var a = Math.random()*(16 - 5) + 5
console.log("[5, 16)的正整数",parseInt(a))

function myRandom(max, min) {
	var range = max - min;
	var rand = Math.random() * range + min;
	rand = Math.floor(rand);
	return rand
}
console.log(myRandom(16, 5))

// apply,call改变函数内部指向,
console.log(Math.max.apply(null, [12,14,45,2,13]))
```