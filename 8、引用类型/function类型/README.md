### function类型

> 说 起 来 ECMAScript 中 什 么 最 有 意 思， 我 想 那 莫 过 于 函 数 了—— 而 有 意 思 的 根 源， 则 在 于 函 数 实 际 上 是 对 象。 每 个 函 数 都 是 Function 类 型 的 实 例， 而 且 都 与 其 他 引 用 类 型 一 样 具 有 属 性 和 方 法。 由 于 函 数 是 对 象， 因 此 函 数 名 实 际 上 也 是 一 个 指 向 函 数 对 象 的 指 针， 不 会 与 某 个 函 数 绑 定。 函 数 通 常 是 使 用 函 数 声 明 语 法 定 义 的， 如 下 面 的 例 子 所 示。

```javascript
function sum (num1, num2) {
	return num1 + num2
}

// 这 与 下 面 使 用 函 数 表 达 式 定 义 函 数 的 方 式 几 乎 相 差 无 几。
var sum = function(num1, num2) {
	return num1 + num2
}
```

- 由 于 函 数 名 仅 仅 是 指 向 函 数 的 指 针， 因 此 函 数 名 与 包 含 对 象 指 针 的 其 他 变 量 没 有 什 么 不 同。 换 句 话 说， 一 个 函 数 可 能 会 有 多 个 名 字， 如 下 面 的 例 子 所 示。

```javascript
function sum( num1, num2){
	 return num1 + num2; 
}
 	alert( sum( 10,10)); // 20
	var anotherSum = sum;
	alert( anotherSum( 10,10)); // 20
	sum = null;
	alert( anotherSum( 10,10)); // 20

```

- 以 上 代 码 首 先 定 义 了 一 个 名 为 sum() 的 函 数， 用 于 求 两 个 值 的 和。 然 后， 又 声 明 了 变 量 anotherSum ，并 将 其 设 置 为 与 sum 相 等（ 将 sum 的 值 赋 给 anotherSum ）。 注 意， 使 用 不 带 圆 括 号 的 函 数 名 是 访 问 函 数 指 针， 而 非 调 用 函 数。 此 时， anotherSum 和 sum 就 都 指 向 了 同 一 个 函 数， 因 此 anotherSum() 也 可 以 被 调 用 并 返 回 结 果。 即 使 将 sum 设 置 为 null ，让 它 与 函 数“ 断 绝 关 系”， 但 仍 然 可 以 正 常 调 用 anotherSum()

#### 函数没有重载（深入理解）

- 将函数名想象为指针，也有助于ECMAScript中没有函数重载的概念。

```javascript
function addSomeNumber( num){ 
	return num + 100;
}
function addSomeNumber( num) {
	 return num + 200;
}
	var result = addSomeNumber( 100); // 300

```
> 显 然， 这 个 例 子 中 声 明 了 两 个 同 名 函 数， 而 结 果 则 是 后 面 的 函 数 覆 盖 了 前 面 的 函 数。

#### 函数声明与函数表达式

		alert( sum( 10,10));
		 function sum( num1, num2){
		  	return num1 + num2;
		 }
		 
* 以 上 代 码 完 全 可 以 正 常 运 行。 因 为 在 代 码 开 始 执 行 之 前， 解 析 器 就 已 经 通 过 一 个 名 为 函 数 声 明 提 升（ function declaration hoisting） 的 过 程， 读 取 并 将 函 数 声 明 添 加 到 执 行 环 境 中。 对 代 码 求 值 时， JavaScript 引 擎 在 第 一 遍 会 声 明 函 数 并 将 它 们 放 到 源 代 码 树 的 顶 部。 所 以， 即 使 声 明 函 数 的 代 码 在 调 用 它 的 代 码 后 面， JavaScript 引 擎 也 能 把 函 数 声 明 提 升 到 顶 部。

### 作为值的函数

- 因 为 ECMAScript 中 的 函 数 名 本 身 就 是 变 量， 所 以 函 数 也 可 以 作 为 值 来 使 用。 也 就 是 说， 不 仅 可 以 像 传 递 参 数 一 样 把 一 个 函 数 传 递 给 另 一 个 函 数， 而 且 可 以 将 一 个 函 数 作 为 另 一 个 函 数 的 结 果 返 回。 来 看 一 看 下 面 的 函 数。

		function callSomeFunction(someFunction, someArgument) {
			return someFunction(someArgument);
		}

- 这 个 函 数 接 受 两 个 参 数。 第 一 个 参 数 应 该 是 一 个 函 数， 第 二 个 参 数 应 该 是 要 传 递 给 该 函 数 的 一 个 值。 然 后， 就 可 以 像 下 面 的 例 子 一 样 传 递 函 数 了。

```javascript
function add10( num){ 
	return num + 10;
 }
	var result1 = callSomeFunction( add10, 10);
	alert( result1); // 20
	function getGreeting( name){ 
	return "Hello, " + name; }
	var result2 = callSomeFunction( getGreeting, "Nicholas");
	alert( result2); //" Hello, Nicholas"

```

- 原始参数（比如一个具体的数字）被作为值传递给函数；值被传递给函数，如果被调用函数改变了这个参数的值，这样的改变不会影响到全局或调用函数。

- 如果你传递一个对象（即一个非原始值，例如Array或用户自定义的对象）作为参数，而函数改变了这个对象的属性，这样的改变对函数外部是可见的，如下面的例子所示：

```javascript
function myFunc(theObject) {
  theObject.make = "Toyota";
}

var mycar = {make: "Honda", model: "Accord", year: 1998};
var x, y;

x = mycar.make;     // x获取的值为 "Honda"

myFunc(mycar);
y = mycar.make;     // y获取的值为 "Toyota"
                    // (make属性被函数改变了)
```

### 函数的作用域

- 在函数内定义的变量不能在函数之外的任何地方访问，因为变量仅仅在该函数的域的内部有定义。相对应的，一个函数可以访问定义在其范围内的任何变量和函数。换言之，定义在全局域中的函数可以访问所有定义在全局域中的变量。在另一个函数中定义的函数也可以访问在其父函数中定义的所有变量和父函数有权访问的任何其他变量。

```javascript
// 下面的变量定义在全局作用域(global scope)中
var num1 = 20,
    num2 = 3,
    name = "Chamahk";

// 本函数定义在全局作用域
function multiply() {
  return num1 * num2;
}

multiply(); // 返回 60

// 嵌套函数的例子
function getScore() {
  var num1 = 2,
      num2 = 3;
  
  function add() {
    return name + " scored " + (num1 + num2);
  }
  
  return add();
}

getScore(); // 返回 "Chamahk scored 5"
```