### 面向对象程序

<a name="zero"></a>
#### [实例对象与 new 命令](#实例对象与 new 命令)

> * 对象是什么
> * 构造函数
> * new 命令
> * 基本用法
> * new 命令的原理
> * Object.create() 创建实例对象

#### [this关键字](#this关键字)

> * 涵义
> * 实质
> * 使用场合
> * 使用注意点
	- 避免多层 this
	- 避免数组处理方法中的 this
	- 避免回调函数中的 this
> * 绑定 this 的方法
	- Function.prototype.call()
	- Function.prototype.apply()
	- Function.prototype.bind()

#### [对象的继承](#对象的继承)

> * 原型对象概述
	- 构造函数的缺点
	- prototype 属性的作用
	- 原型链
	- constructor 属性
- instanceof 运算符
- 构造函数的继承
- 多重继承
- 模块
	- 基本的实现方法
	- 封装私有变量：构造函数的写法
	- 封装私有变量：立即执行函数的写法
	- 模块的放大模式
	- 输入全局变量

<a name="实例对象与 new 命令"></a>
### 1、对象是什么

- 面向对象编程（Object Oriented Programming，缩写为 OOP）是目前主流的编程范式。它将真实世界各种复杂的关系，抽象为一个个对象，然后由对象之间的分工与合作，完成对真实世界的模拟。

- 每一个对象都是功能中心，具有明确分工，可以完成接受信息、处理数据、发出信息等任务。对象可以复用，通过继承机制还可以定制。因此，面向对象编程具有灵活、代码可复用、高度模块化等特点，容易维护和开发，比起由一系列函数或指令组成的传统的过程式编程（procedural programming），更适合多人合作的大型软件项目。

- 那么，“对象”（object）到底是什么？我们从两个层次来理解。

**（1）对象是单个实物的抽象。**

- 一本书、一辆汽车、一个人都可以是对象，一个数据库、一张网页、一个与远程服务器的连接也可以是对象。当实物被抽象成对象，实物之间的关系就变成了对象之间的关系，从而就可以模拟现实情况，针对对象进行编程。

**（2）对象是一个容器，封装了属性（property）和方法（method）。**

- 属性是对象的状态，方法是对象的行为（完成某种任务）。比如，我们可以把动物抽象为animal对象，使用“属性”记录具体是那一种动物，使用“方法”表示动物的某种行为（奔跑、捕猎、休息等等）。

### 2、构造函数

- javaScript 语言使用构造函数（constructor）作为对象的模板。所谓”构造函数”，就是专门用来生成实例对象的函数。它就是对象的模板，描述实例对象的基本结构。一个构造函数，可以生成多个实例对象，这些实例对象都有相同的结构。

- 构造函数就是一个普通的函数，但是有自己的特征和用法。

```javascript
	var Vehicle = function () {
	  this.price = 1000;
};
```

- 上面代码中，Vehicle就是构造函数。为了与普通函数区别，构造函数名字的第一个字母通常大写。

- 构造函数的特点有两个。

	- 函数体内部使用了this关键字，代表了所要生成的对象实例。
	- 生成对象的时候，必须使用new命令。
	
**下面先介绍new命令**

### 3、new命令

- new命令的作用，就是返回执行的构造函数，返回一个实例对象。

		function Vehicle() {
				this.price = 1000;
		}
		var v = new Vehicle()
		v.price; // 1000
		
- 上面代码通过new命令，让构造函数Vehicle生成一个实例对象，保存在变量v中。这个新生成的实例对象，从构造函数Vehicle得到了price属性。new命令执行时，构造函数内部的this，就代表了新生成的实例对象，this.price表示实例对象有一个price属性，值是1000。

> 使用new命令时，根据需要，构造函数也可以接受参数。

		// 传参数
		function Vehicle(p) {
			this.price = p;
		}
		var v = new Vehicle(1000)
		v.price; // 1000
		
- 一个很自然的问题是，如果忘了使用new命令，直接调用构造函数会发生什么事？

- 这种情况下，构造函数就变成了普通函数，并不会生成实例对象。而且由于后面会说到的原因，**this**这时代表全局对象，将造成一些意想不到的结果。
```javascript
function Vehicle() {
	this.price = 100;
}
var v = Vehicle()
v // undefined
price // 100  全局变量
```	
> 上面代码中，调用Vehicle构造函数时，忘了加上new命令。结果，变量v变成了undefined，而price属性变成了全局变量。因此，应该非常小心，避免不使用new命令、直接调用构造函数。

- 为了保证构造函数必须与new命令一起使用，采用严格模式
```javascript		
function Fubar(foo, bar){
  'use strict';
  this._foo = foo;
  this._bar = bar;
}

Fubar()
// TypeError: Cannot set property '_foo' of undefined
```		
### 3.2new 命令的原理

- 使用new命令时，它后面的函数依次执行下面的步骤。

1、创建一个空对象，作为将要返回的对象实例。

2、将这个空对象的原型，指向构造函数的prototype属性。

3、将这个空对象赋值给函数内部this关键字。

4、开始执行函数内部代码。

- 也就是说，构造函数内部，this指的是一个新生成的空对象，所有针对this的操作，都会发生在这个空对象上。构造函数之所以叫“构造函数”，就是说这个函数的目的，就是操作一个空对象（即this对象），将其“构造”为需要的样子。

- 如果构造函数内部有return语句，而且return后面跟着一个对象，new命令会返回return语句指定的对象；否则，就会不管return语句，返回this对象。
```javascript
		var Vehicle = function () {
		  this.price = 1000;
		  return 1000;
		};
		
		(new Vehicle()) === 1000
		// false
```		
- 上面代码中，构造函数Vehicle的return语句返回一个数值。这时，new命令就会忽略这个return语句，返回“构造”后的this对象。

- 但是，如果return语句返回的是一个跟this无关的新对象，new命令会返回这个新对象，而不是this对象。这一点需要特别引起注意。
```javascript
var Vehicle = function (){
  this.price = 1000;
  return { price: 2000 };
};

(new Vehicle()).price
// 2000
```		
3、3 Object.create()创建实例对象

- 构造函数作为模板，可以生成实例对象。但是，有时拿不到构造函数，只能拿到一个现有的对象。我们希望以这个现有的对象作为模板，生成新的实例对象，这时就可以使用Object.create()方法。
```javascript
var person1 = {
	name: "张三",
	age: 15,
	greeting: function() {
		console.log('HI ! I\m' + this.name + '.')
	}
}
var p = Object.create(person1)
p.name       //"张三"
p.greeting() //  Hi! I'm 张三.
```

**[↑ 返回目录](#zero)**
<a name="this关键字"></a>

### 1、this的涵义

- this可以用在构造函数之中，表示实例对象。除此之外，this还可以用在别的场合。但不管是什么场合，this都有一个共同点：它总是返回一个对象。

> 简单说，this就是属性或方法“当前”所在的对象。

		this.property
		
- 上面代码中，this就代表property属性当前所在的对象。

- 下面是一个实际的例子。

		var person = {
			name: '张三',
			describe() {
				return '姓名 '+ this.name;
			}
		}
		person.describe(); // 姓名 张三
		
> 上面代码中，this.name表示name属性所在的那个对象。由于this.name是在describe方法中调用，而describe方法所在的当前对象是person，因此this指向person，this.name就是person.name。

```javascript
// this的指向是可变的。
	var A = {
		name: '张三',
		describe: function() {
			return '姓名：' + this.name;
		}
	};

	var B = {
		name: '李四'
	};
	
	B.describe = A.describe
	B.describe() // "姓名：李四" 
```
- 上面代码中，A.describe属性被赋给B，于是B.describe就表示describe方法所在的当前对象是B，所以this.name就指向B.name。

```javascript
// 稍稍重构这个例子，this的动态指向就能看得更清楚。

function f(){
	return '姓名：' + this.name;
}
var C = {
	name: "张三",
	describe: f
}

var D = {
	name: "李四",
	describe: f
}
C.describe() // "姓名：张三"
D.describe() // "姓名：李四"
```
- 上面代码中，函数f内部使用了this关键字，随着f所在的对象不同，this的指向也不同。

- 只要函数被赋给另一个变量，this的指向就会变。

		var A = {
		  name: '张三',
		  describe: function () {
		    return '姓名：'+ this.name;
		  }
		};
		
		var name = '李四';
		var f = A.describe;
		f() // "姓名：李四"
		
**总结一下，JavaScript 语言之中，一切皆对象，运行环境也是对象，所以函数都是在某个对象之中运行，this就是函数运行时所在的对象（环境）。这本来并不会让用户糊涂，但是 JavaScript 支持运行环境动态切换，也就是说，this的指向是动态的，没有办法事先确定到底指向哪个对象，这才是最让初学者感到困惑的地方。**

### 2、this的实质

- JavaScript 语言之所以有 this 的设计，跟内存里面的数据结构有关系。

		var obj = { foo:  5 };
		
- 上面的代码将一个对象赋值给变量obj。JavaScript 引擎会先在内存里面，生成一个对象{ foo: 5 }，然后把这个对象的内存地址赋值给变量obj。也就是说，变量obj是一个地址（reference）。后面如果要读取obj.foo，引擎先从obj拿到内存地址，然后再从该地址读出原始的对象，返回它的foo属性。

- 原始的对象以字典结构保存，每一个属性名都对应一个属性描述对象。举例来说，上面例子的foo属性，实际上是以下面的形式保存的。

		{
		  foo: {
		    [[value]]: 5
		    [[writable]]: true
		    [[enumerable]]: true
		    [[configurable]]: true
		  }
		}
- 注意，foo属性的值保存在属性描述对象的value属性里面。

- 这样的结构是很清晰的，问题在于属性的值可能是一个函数。

		var obj = { foo: function () {} };
- 这时，引擎会将函数单独保存在内存中，然后再将函数的地址赋值给foo属性的value属性。

		{
		  foo: {
		    [[value]]: 函数的地址
		    ...
		  }
		}
- 由于函数是一个单独的值，所以它可以在不同的环境（上下文）执行。

		var f = function () {};
		var obj = { f: f };
		
		// 单独执行
		f()
		
		// obj 环境执行
		obj.f()
		JavaScript 允许在函数体内部，引用当前环境的其他变量。
		
		var f = function () {
		  console.log(x);
		};
		
- 上面代码中，函数体里面使用了变量x。该变量由运行环境提供。

- 现在问题就来了，由于函数可以在不同的运行环境执行，所以需要有一种机制，能够在函数体内部获得当前的运行环境（context）。所以，this就出现了，它的设计目的就是在函数体内部，指代函数当前的运行环境。

		var f = function () {
		  console.log(this.x);
		}
- 上面代码中，函数体里面的this.x就是指当前运行环境的x。

		var f = function () {
		  console.log(this.x); // 1
		  console.log(this) // window
		}
		
		var x = 1;
		var obj = {
		  f: f,
		  x: 2,
		};
		
		// 单独执行
		f() // 1
		
		// obj 环境执行
		obj.f() // 2
- 上面代码中，函数f在全局环境执行，this.x指向全局环境的x；在obj环境执行，this.x指向obj.x。

### 3、使用场合

**this主要有以下几个使用场合。**

- （1）全局环境

		this === window // true
		
		function f() {
		  console.log(this === window);
		}
		f() // true
		
- 上面代码说明，不管是不是在函数内部，只要是在全局环境下运行，this就是指顶层对象window。

- （2）对象的实例

* 构造函数中的this，指的是实例对象

		var Obj = function (p) {
		  this.p = p;
		};
		
- 上面代码定义了一个构造函数Obj。由于this指向实例对象，所以在构造函数内部定义this.p，就相当于定义实例对象有一个p属性。

		var o = new Obj('Hello World!');
		o.p // "Hello World!"
		
- （3）对象的方法

- 如果对象的方法里面包含this，this的指向就是方法运行时所在的对象。该方法赋值给另一个对象，就会改变this的指向。

		var obj = {
			foo() {
				console.log(this)
			}
		}
		obj.foo() // obj
		
- 上面代码中，obj.foo就是一个值。这个值真正调用的时候，运行环境已经不是obj了，而是全局环境，所以this不再指向obj。

- 可以这样理解，JavaScript 引擎内部，obj和obj.foo储存在两个内存地址，称为地址一和地址二。obj.foo()这样调用时，是从地址一调用地址二，因此地址二的运行环境是地址一，this指向obj。但是，上面三种情况，都是直接取出地址二进行调用，这样的话，运行环境就是全局环境，因此this指向全局环境。上面三种情况等同于下面的代码。
```javascript
// 情况一
(obj.foo = function () {
  console.log(this);
})()
// 等同于
// 立即执行函数
(function () {
  console.log(this);
})()

// 情况二
(false || function () {
  console.log(this);
})()

// 情况三
(1, function () {
  console.log(this);
})()
```
### 4、使用注意点

#### 4、1 避免多层 this

- 由于this的指向是不确定的，所以切勿在函数中包含多层的this。
```javascript
var o = {
  f1: function () {
    console.log(this);
    var f2 = function () {
      console.log(this);
    }();
  }
}

o.f1()
// Object
// Window
// 上面代码包含两层this，结果运行后，第一层指向对象o，第二层指向全局对象，因为实际执行的是下面的代码。

var temp = function () {
  console.log(this);
};

var o = {
  f1: function () {
    console.log(this);
    var f2 = temp();
  }
}
```
- 一个解决方法是在第二层改用一个指向外层this的变量。
```javascript
var o = {
  f1: function() {
    console.log(this);
    var that = this;
    var f2 = function() {
      console.log(that);
    }();
  }
}

o.f1()
// Object
// Object
```

- 上面代码定义了变量that，固定指向外层的this，然后在内层使用that，就不会发生this指向的改变。

- 事实上，使用一个变量固定this的值，然后内层函数调用这个变量，是非常常见的做法，请务必掌握。

#### 4、2 避免数组处理方法中的 this

- 数组的map和foreach方法，允许提供一个函数作为参数。这个函数内部不应该使用this。

```js
var o = {
	v: 'hello',
	p: ['a1', 'a2'],
	f: function() {
		this.p.forEach(function(item) {
			console.log(this.v + ' ' + item)
		})
	}
}
o.f() // undefined a1 undefined a2
```
- 上面代码中，foreach方法的回调函数中的this，其实是指向window对象，因此取不到o.v的值。原因跟上一段的多层this是一样的，就是内层的this不指向外部，而指向顶层对象。

- 解决这个问题的一种方法，就是前面提到的，使用中间变量固定this。

```js
// 解决1
	var o = {
		v: 'hello',
		p: ['a1', 'a2'],
		f: function() {
			var _this = this;
			this.p.forEach(function(item) {
				console.log(_this.v + ' ' + item)
			})
		}
	}
	o.f() // hello a1 hello a2
```

- 另一种方法是将this当作foreach方法的第二个参数，固定它的运行环境。

```js
// 解决2

var o = {
	v: 'hello',
	p: ['a1', 'a2'],
	f: function() {
//					var _this = this;
		this.p.forEach(function(item) {
			console.log(this.v + ' ' + item)
		}, this)
	}
}
o.f() // hello a1 hello a2
```
- es6箭头函数
```js
// es6箭头函数
var o = {
	v: 'hello',
	p: ['a1', 'a2'],
	f: function() {
//	var _this = this;
		this.p.forEach((item) => {
			console.log(this.v + ' ' + item)
		})
	}
}
o.f() // hello a1 hello a2
```

### 5、绑定this的方法

- JavaScript提供了call、apply、bind这三个方法，来切换/固定this的指向

#### 5、1 Function.prototype.call()

- 函数实例的call方法，可以指定函数内部this的指向（即函数执行时所在的作用域），然后在所指定的作用域中，调用该函数。

```js

var obj = {}			
function f() {
	return this; // window
}

var obj = {}
function f() {
	return this;
}
f.call(obj) === obj // true
```

- 上面代码中，全局环境运行函数f时，this指向全局环境（浏览器为window对象）；call方法可以改变this的指向，指定this指向对象obj，然后在对象obj的作用域中运行函数f。

- call方法的参数，应该是一个对象。如果参数为空、null和undefined，则默认传入全局对象。

```js
var n = 123;

var obj2 = {
	n: 456
}

function aa() {
	console.log(this.n)
}
a.call() // 123
a.call(null) // 123
a.call(undefined) // 123
a.call(window) // 123
a.call(obj) // 456
```

- 上面代码中，a函数中的this关键字，如果指向全局对象，返回结果为123。如果使用call方法将this关键字指向obj对象，返回结果为456。可以看到，如果call方法没有参数，或者参数为null或undefined，则等同于指向全局对象。

- 如果call方法的参数是一个原始值，那么这个原始值会自动转成对应的包装对象，然后传入call方法。

```js
function f3() {
	return this;
};

f3.call(5) // Number {5}
```

**call方法还可以接受多个参数。**

		func.call(thisValue, arg1, arg2, ...)
		
```js
var obj1 = {
	name: 'obj1_name',
	getName(lastName) {
		console.log(this.name + ' ' + lastName) // obj1_name
	}
}
var obj2 = {
	name: 'obj2_name'
}
obj1.getName() // obj1
// 将obj1上的方法执行，内部this执行指向obj2
obj1.getName.call(obj2) // obj2_name

// 函数.call(指定对象, 参数1，参数2，参数。。。),参数逐个传
obj1.getName.call(obj2, 'wang') // obj2_name wang
```
- call的第一个参数就是this所要指向的那个对象，后面的参数则是函数调用时所需的参数。

```js
function add(a, b) {
	return a + b;
}

add.call(this, 1, 2) // 3
```

#### 5、2 Function.prototype.apply()

- apply方法的作用与call方法类似，也是改变this指向，然后再调用该函数。唯一的区别就是，它接收一个数组作为函数执行时的参数，使用格式如下。

		func.apply(thisValue, [arg1, arg2, ...])
		
- apply方法的第一个参数也是this所要指向的那个对象，如果设为null或undefined，则等同于指定全局对象。第二个参数则是一个数组，该数组的所有成员依次作为参数，传入原函数。原函数的参数，在call方法中必须一个个添加，但是在apply方法中，必须以数组形式添加。

```js
function f4(x, y) {
	console.log(x + y);
}

f4.call(this, 1, 1) // 2
f4.apply(this, [1, 1]) // 2
```
- 上面代码中，f函数本来接受两个参数，使用apply方法以后，就变成可以接受一个数组作为参数。

- (1) 找出数组最大值
```js
var a = [12,16,14,78,9]
Math.max.apply(this, a) // 78
Math.max.apply(null, a) // 78
```
- （2）将数组的空元素变为undefined

- 通过apply方法，利用Array构造函数将数组的空元素变成undefined。

		Array.apply(null, ['a', ,'b'])
		// [ 'a', undefined, 'b' ]
		
- 空元素与undefined的差别在于，数组的forEach方法会跳过空元素，但是不会跳过undefined。因此，遍历内部元素的时候，会得到不同的结果。

```js
var a = ['a', , 'b'];

function print(i) {
  console.log(i);
}

a.forEach(print)
// a
// b

Array.apply(null, a).forEach(print)
// a
// undefined
// b
```
- (转换类似数组的对象)

- 另外，利用数组对象的slice方法，可以将一个类似数组的对象（比如arguments对象）转为真正的数组。

		Array.prototype.slice.apply({0: 1, length: 1}) // [1]
		Array.prototype.slice.apply({0: 1}) // []
		Array.prototype.slice.apply({0: 1, length: 2}) // [1, undefined]
		Array.prototype.slice.apply({length: 1}) // [undefined]
		
- 上面代码的apply方法的参数都是对象，但是返回结果都是数组，这就起到了将对象转成数组的目的。从上面代码可以看到，这个方法起作用的前提是，被处理的对象必须有length属性，以及相对应的数字键。

#### 5、3 Function.prototype.bind() 

- bind方法用于将函数体内的this绑定到某个对象，然后返回一个新函数。

**bind方法的参数就是所要绑定this的对象**

```js
var counter = {
  count: 0,
  inc: function () {
    this.count++;
  }
};

var func = counter.inc.bind(counter);
func();
counter.count // 1
```

- 上面代码中，counter.inc方法被赋值给变量func。这时必须用bind方法将inc内部的this，绑定到counter，否则就会出错。

- this绑定到其他对象也是可以的。

```js
var counter = {
  count: 0,
  inc: function () {
    this.count++;
  }
};

var obj = {
  count: 100
};
var func = counter.inc.bind(obj);
func();
obj.count // 101
```
- 上面代码中，bind方法将inc方法内部的this，绑定到obj对象。结果调用func函数以后，递增的就是obj内部的count属性。

<a name="对象的继承"></a>

- 面向对象编程很重要的一个方面，就是对象的继承。A 对象通过继承 B 对象，就能直接拥有 B 对象的所有属性和方法。这对于代码的复用是非常有用的。

> 大部分面向对象的编程语言，都是通过“类”（class）实现对象的继承。传统上，JavaScript 语言的继承不通过 class，而是通过“原型对象”（prototype）实现，

#### 1、原型对象的概述

##### 1、1构造函数得到缺点

JavaScript通过构造函数生成新对象，构造函数可以视为对象的模板，实例对象的属性和方法，可以定义在构造函数内。


