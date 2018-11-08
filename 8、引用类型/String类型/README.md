### 字符串类型

- String类型是字符串的包装乐行，可以，可以使用String构造函数来创建

		var stringObject = new String("hello world")
		
- String 对 象 的 方 法 也 可 以 在 所 有 基 本 的 字 符 串 值 中 访 问 到。 其 中， 继 承 的 valueOf() 、toLocaleString() 和 toString() 方 法， 都 返 回 对 象 所 表 示 的 基 本 字 符 串 值。 String 类 型 的 每 个 实 例 都 有 一 个 length 属 性， 表 示 字 符 串 中 包 含 多 个 字 符。 来 看 下 面 的 例 子。

		var stringValue = "hello world"; 
		alert( stringValue.length); //" 11"
 
这 个 例 子 输 出 了 字 符 串" hello world" 中 的 字 符 数 量， 即" 11" 。应 该 注 意 的 是， 即 使 字 符 串 中 包 含 双 字 节 字 符（ 不 是 占 一 个 字 节 的 ASCII 字 符）， 每 个 字 符 也 仍 然 算 一 个 字 符。 String 类 型 提 供 了 很 多 方 法， 用 于 辅 助 完 成 对 ECMAScript 中 字 符 串 的 解 析 和 操 作。

##字符串方法

###  charAt()从字符串中获取单个字符

- 获取字符串的某个字符有两种方法。 第一种是使用 charAt 方法：

		return 'cat'.charAt(1); // returns "a"

- 另一种 (在ECMAScript 5中有所介绍) 是把字符串当作一个类似数组的对象，其中的每个字符对应一个数值索引：

		return 'cat'[1]; // returns "a"

**使用括号访问字符串不可以对其进行删除或添加，因为字符串对应未知的属性并不是可读或配置**

### String.prototype.charCodeAt()

> charCodeAt() 方法返回0到65535之间的整数，表示给定索引处的UTF-16代码单元 (在 Unicode 编码单元表示一个单一的 UTF-16 编码单元的情况下，UTF-16 编码单元匹配 Unicode 编码单元。但在——例如 Unicode 编码单元 > 0x10000 的这种——不能被一个 UTF-16 编码单元单独表示的情况下，只能匹配 Unicode 代理对的第一个编码单元) 。如果你想要整个代码点的值，使用 codePointAt()。

- 语法

		str.charCodeAt(index)
- 参数

		index
		
		一个大于等于 0，小于字符串长度的整数。如果不是一个数值，则默认为 0。

- 返回值

		返回值是一表示给定索引处（String中index索引处）字符的 UTF-16 代码单元值的数字；如果索引超出范围，则返回 NaN。
		

```javascript
"ABC".charCodeAt(0) // returns 65:"A"

"ABC".charCodeAt(1) // returns 66:"B"

"ABC".charCodeAt(2) // returns 67:"C"

"ABC".charCodeAt(3) // returns NaN

```

### String.prototype.codePointAt()

- 语法

		str.codePointAt(pos)
- 参数

		pos
		
		这个字符串中需要转码的元素的位置。

- 返回值

		返回值是在字符串中的给定索引的编码单元体现的数字，如果在索引处没找到元素则返回 undefined 。
		
```javascript
使用 codePointAt()
'ABC'.codePointAt(1);          // 66
'\uD800\uDC00'.codePointAt(0); // 65536

'XYZ'.codePointAt(42); // undefined

```

### String.prototype.concat()

- concat() 方法将一个或多个字符串与原字符串连接合并，形成一个新的字符串并返回。

- 语法

		str.concat(string2, string3[, ..., stringN])
- 参数

		string2...stringN
		和原字符串连接的多个字符串
		
- 描述

	- concat 方法将一个或多个字符串与原字符串连接合并，形成一个新的字符串并返回。 concat 方法并不影响原字符串。
		
```javascript
var hello = "Hello, ";
console.log(hello.concat("Kevin", " have a nice day.")); /* Hello, Kevin have a nice day. */
```

### String.prototype.indexOf()

- indexOf() 方法返回调用  String 对象中第一次出现的指定值的索引，开始在 fromIndex进行搜索。如果未找到该值，则返回-1。

- 语法

		str.indexOf(searchValue[, fromIndex])
- 参数

		searchValue
		一个字符串表示被查找的值。
		
fromIndex 可选
表示调用该方法的字符串中开始查找的位置。可以是任意整数。默认值为 0。如果 fromIndex < 0 则查找整个字符串（如同传进了 0）。如果 fromIndex >= str.length，则该方法返回 -1。当被查找的字符串是一个空字符串，fromIndex <= 0时返回0，0 < fromIndex <= str.length时返回fromIndex，fromIndex > str.length时返回str.length。
	
- 返回值

	- 指定值的第一次出现的索引; 如果没有找到 -1。
			
- 描述

	- 字符串中的字符被从左向右索引。首字符的索引（index）为 0，字符串 stringName 的最后一个字符的索引是 stringName.length - 1。
		
```javascript
"Blue Whale".indexOf("Blue");     // returns  0
"Blue Whale".indexOf("Blute");    // returns -1
"Blue Whale".indexOf("Whale", 0); // returns  5
"Blue Whale".indexOf("Whale", 5); // returns  5
"Blue Whale".indexOf("", 9);      // returns  9
"Blue Whale".indexOf("", 10);     // returns 10
"Blue Whale".indexOf("", 11);     // returns 10
"Blue Whale".indexOf("blue") // returns -1 区分大小写

当检测某个字符串是否存在于另一个字符串中时，可使用下面的方法：

"Blue Whale".indexOf("Blue") !== -1; // true
"Blue Whale".indexOf("Bloe") !== -1; // false
```		
- 下例使用 indexOf() 和 lastIndexOf() 方法定位字符串中 "Brave new world" 的值。
```javascript
var anyString = "Brave new world";

console.log("The index of the first w from the beginning is " + anyString.indexOf("w"));
// logs 8
console.log("The index of the first w from the end is " + anyString.lastIndexOf("w")); 
// logs 10

console.log("The index of 'new' from the beginning is " + anyString.indexOf("new"));   
// logs 6
console.log("The index of 'new' from the end is " + anyString.lastIndexOf("new"));
// logs 6
```

- indexOf 和区分大小写
```javascript
var myString    = "brie, pepper jack, cheddar";
var myCapString = "Brie, Pepper Jack, Cheddar";

console.log('myString.indexOf("cheddar") is ' + myString.indexOf("cheddar"));    
// logs 19
console.log('myCapString.indexOf("cheddar") is ' + myCapString.indexOf("cheddar")); 
// logs -1
```

- 使用 indexOf 统计一个字符串中某个字母出现的次数

```javascript
var str = 'To be, or not to be, that is the question.';
var count = 0;
var pos = str.indexOf('e');

while (pos !== -1) {
  count++;
  pos = str.indexOf('e', pos + 1);
}

console.log(count); // displays 4
```
### String.prototype.lastIndexOf()

- lastIndexOf() 方法返回指定值在调用该方法的字符串中最后出现的位置，如果没找到则返回 -1。从该字符串的后面向前查找，从 fromIndex 处开始。
		
		"canal".lastIndexOf("a")   // returns 3
		"canal".lastIndexOf("a",2) // returns 1
		"canal".lastIndexOf("a",0) // returns -1
		"canal".lastIndexOf("x")   // returns -1
		
### String.prototype.replace()

- replace() 方法返回一个由替换值替换一些或所有匹配的模式后的新字符串。模式可以是一个字符串或者一个正则表达式, 替换值可以是一个字符串或者一个每次匹配都要调用的函数。

**注意：原字符串不会改变。**

- 语法

		str.replace(regexp|substr, newSubStr|function)
		
- 参数

	- regexp (pattern)
	
	一个RegExp 对象或者其字面量。该正则所匹配的内容会被第二个参数的返回值替换掉。
	
	- substr (pattern)
	
	-一个要被 newSubStr 替换的字符串。其被视为一整个字符串，而不是一个正则表达式。仅仅是第一个匹配会被替换。
	
	- newSubStr (replacement)
	
	 用于替换掉第一个参数在原字符串中的匹配部分的字符串。该字符串中可以内插一些特殊的变量名。参考下面的使用字符串作为参数。
	 
	- function (replacement)
	
	一个用来创建新子字符串的函数，该函数的返回值将替换掉第一个参数匹配到的结果。参考下面的指定一个函数作为参数。
	
### String.prototype.slice()

- slice() 方法提取一个字符串的一部分，并返回一新的字符串。

- 语法节

str.slice(beginSlice[, endSlice])

- 参数节

	- beginSlice
	
	从该索引（以 0 为基数）处开始提取原字符串中的字符。如果值为负数，会被当做 sourceLength + beginSlice 看待，这里的sourceLength 是字符串的长度 (例如， 如果beginSlice 是 -3 则看作是: sourceLength - 3)
	
	- endSlice
	
	可选。在该索引（以 0 为基数）处结束提取字符串。如果省略该参数，slice会一直提取到字符串末尾。如果该参数为负数，则被看作是 sourceLength + endSlice，这里的 sourceLength 就是字符串的长度(例如，如果 endSlice 是 -3，则是, sourceLength - 3)。
	
	- 返回值
	
- 返回一个从原字符串中提取出来的新字符串
	
注意：slice() 提取的新字符串包括beginSlice但不包括 endSlice。

例1：str.slice(1, 4) 提取新字符串从第二个字符到第四个 (字符索引值为 1, 2, 和 3)。

例2：str.slice(2, -1) 提取第三个字符到倒数第二个字符。

```javascript
var str1 = 'The morning is upon us.';
var str2 = str1.slice(4, -2);

console.log(str2); // OUTPUT: morning is upon u

var str = 'The morning is upon us.';
str.slice(-3);     // returns 'us.'
str.slice(-3, -1); // returns 'us'
str.slice(0, -1);  // returns 'The morning is upon us'
```

### String.prototype.split()

split() 方法使用指定的分隔符字符串将一个String对象分割成字符串数组，以将字符串分隔为子字符串，以确定每个拆分的位置。

```javascript
"Webkit Moz O ms Khtml".split( " " )   // ["Webkit", "Moz", "O", "ms", "Khtml"]
var str2 = "hello world"
console.log(str.split("")) // ["H", "e", "l", "l", "o", " ", "w", "o", "r", "l", "d", "!"]
console.log(str.split(" ")) // ["Hello,world!"]
```

### String.prototype.substr()

### String.prototype.substring()

```javascript
/*substr()在字符串中抽取从 start 下标开始的指定数目的字符。
 第二个参数： 长度
 
 substring()提取字符串中介于两个指定下标之间的字符。
 第二个参数： 下标位置，不包括自己
 * */

var str="Hello world!"
console.log(str.substring(3,7))// lo w
console.log(str.substr(3,7))// lo worl
```

##### 练习
```javascript

//1. 有段文字text = "and in it he says Any damn fool could", 不改变原text的前提下， 提取第一段话a = "Any damn fool could", 
//第二段话b = "and", 第三段话c = "could", 注意， slice() 可以接受负数, string.slice().
				var text = "and in it he says Any damn fool could";
				var a = text.slice(18);
				var b = text.slice(0,3);
				var c = text.slice(-5);
				console.log(a+"\n"+b+"\n"+c+"\n");
//2. 字符串digite = "0123456789", 把前5个字符分割出来， 返回个单字符的数组, 注意， 返回数组里面的数字是字符串类型, string.split()
				var digite = "0123456789";
				var digite_str1 = digite.substr(0,5).split("");
				var digite_str2 = digite.split("", 5); //方法二
				console.log(digite_str1)
				console.log(digite_str2)
//3.已知有字符串foo=”get-element-by-id”,写一个function将其转化成驼峰表示法”getElementById”.
				var foo ="get-element-by-id"
				function hump(foo) {
					var foo_str = foo.split("-")
					// 先分割字符串数组，得到"get", "element", "by", "id"
//					console.log(foo_str)
					for (var i = 1;i < foo_str.length; i++) {
						// 每个字符串的开头转成大写，其余拼接起来
							foo_str[i] = foo_str[i].charAt(0).toUpperCase() + foo_str[i].substring(1)
						}
					return foo_str.join("")
				}
				console.log(hump(foo));
				// 方法二
				for (var i = 0; i < foo.length;i++) {
					if (foo[i] == "-") {
						foo = foo.replace("-"+foo[i+1], foo[i+1].toUpperCase())
					}
				}
				console.log(foo)
//4.定义一个函数,将"今天是什么鬼天气，这么热，明天要去游泳！"里面的有"天"的下标输出(用indexof())
				var str6 = "今天是什么鬼天气，这么热，明天要去游泳！"
				function day(str) {
					var sum = []// 存放下标
					var str6_1 = str.split("")
					var idx = str6_1.indexOf("天")// 带有"天"
					for(var i = 0; i< str6_1.length;i++) {
						if (idx !== -1) {
							sum.push(idx)
							idx = str6_1.indexOf("天", idx+1)
						}
					}
					console.log(sum)
				}
				day(str6)
				// 方法二
				var str6 = "今天是什么鬼天气，这么热，明天要去游泳！"
				for(var i = 0,index=0,time=0; i < str6.length;i++) {
					index = str6.indexOf("天", index)
					if (index > 0) {
						time++;
						console.log(index)
						index++;
					} else {
						console.log(time+"次")
						break;
					}
				}				
//5.定义一个函数,将"今天是什么鬼天气，这么热，明天要去游泳！"里面的有"天"替换成"日"(用replace())
			var str7 = "今天是什么鬼天气，这么热，明天要去游泳！";
			function replaceT(str) {
				for (var i = 0;i < str.length; i++) {
					if (str.indexOf("天") == -1) {
						break;
					}
					str = str.replace("天","日");	
				}
				return str;
			}
			console.log(replaceT(str7))
```