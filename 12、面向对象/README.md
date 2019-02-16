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

> * instanceof 运算符

> * 构造函数的继承

> * 多重继承

> * 模块

	- 基本的实现方法

	- 封装私有变量：构造函数的写法

	- 封装私有变量：立即执行函数的写法

	- 模块的放大模式

	- 输入全局变量

### Object 对象的相关方法

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

**[↑ 返回目录](#zero)**

<a name="对象的继承"></a>

- 面向对象编程很重要的一个方面，就是对象的继承。A 对象通过继承 B 对象，就能直接拥有 B 对象的所有属性和方法。这对于代码的复用是非常有用的。

> 大部分面向对象的编程语言，都是通过“类”（class）实现对象的继承。传统上，JavaScript 语言的继承不通过 class，而是通过“原型对象”（prototype）实现，

#### 1、原型对象的概述

##### 1、1构造函数得到缺点

JavaScript通过构造函数生成新对象，构造函数可以视为对象的模板，实例对象的属性和方法，可以定义在构造函数内。

```js
function Cat (name, color) {
  this.name = name;
  this.color = color;
}

var cat1 = new Cat('大毛', '白色');

cat1.name // '大毛'
cat1.color // '白色'
```

- 上面代码中，Cat函数是一个构造函数，函数内部定义了name属性和color属性，所有实例对象（上例是cat1）都会生成这两个属性，即这两个属性会定义在实例对象上面。

```js
function Cat(name, color) {
  this.name = name;
  this.color = color;
  this.meow = function () {
    console.log('喵喵');
  };
}

var cat1 = new Cat('大毛', '白色');
var cat2 = new Cat('二毛', '黑色');

cat1.meow === cat2.meow
// false
```
- 上面代码中，cat1和cat2是同一个构造函数的两个实例，它们都具有meow方法。由于meow方法是生成在每个实例对象上面，所以两个实例就生成了两次。也就是说，每新建一个实例，就会新建一个meow方法。这既没有必要，又浪费系统资源，因为所有meow方法都是同样的行为，完全应该共享。

- 这个问题的解决方法，就是 JavaScript 的原型对象（prototype）。

#### 1、2 prototype属性的作用

- JavaScript 继承机制的设计思想就是，原型对象的所有属性和方法，都能被实例对象共享。也就是说，如果属性和方法定义在原型上，那么所有实例对象就能共享，不仅节省了内存，还体现了实例对象之间的联系。

> 下面，先看怎么为对象指定原型。JavaScript 规定，每个函数都有一个prototype属性，指向一个对象。

		function f() {}
		typeof f.prototype // "object"

上面代码中，函数f默认具有prototype属性，指向一个对象。

对于普通函数来说，该属性基本无用。但是，对于构造函数来说，生成实例的时候，该属性会自动成为实例对象的原型。

```js
function Animal(name) {
  this.name = name;
}
Animal.prototype.color = 'white';

var cat1 = new Animal('大毛');
var cat2 = new Animal('二毛');

cat1.color // 'white'
cat2.color // 'white'
```
上面代码中，构造函数Animal的prototype属性，就是实例对象cat1和cat2的原型对象。原型对象上添加一个color属性，结果，实例对象都共享了该属性。

- 原型对象的属性不是实例对象自身的属性。只要修改原型对象，变动就立刻会体现在所有实例对象上。

		Animal.prototype.color = 'yellow';

		cat1.color // "yellow"
		cat2.color // "yellow"
- 原型对象的color属性的值变为yellow，两个实例对象的color属性立刻跟着变了。这是因为实例对象其实没有color属性，都是读取原型对象的color属性。也就是说，当实例对象本身没有某个属性或方法的时候，它会到原型对象去寻找该属性或方法。这就是原型对象的特殊之处。

		cat1.color = 'black';

		cat1.color // 'black'
		cat2.color // 'yellow'
		Animal.prototype.color // 'yellow';

上面代码中，实例对象cat1的color属性改为black，就使得它不再去原型对象读取color属性，后者的值依然为yellow。

**总结一下，原型对象的作用，就是定义所有实例对象共享的属性和方法。这也是它被称为原型对象的原因，而实例对象可以视作从原型对象衍生出来的子对象。**

		Animal.prototype.walk = function () {
		  console.log(this.name + ' is walking');
		};

> 上面代码中，Animal.prototype对象上面定义了一个walk方法，这个方法将可以在所有Animal实例对象上面调用。

#### 1、3 原型链

JavaScript规定，所有的对象都有自己的原型对象。任何一个对象，都可以充当其他对象的原型，由于
原型也是对象，所以他有自己的原型，因此就会形成一个原型链（prototype）：对象到原型，再到原型的原型...

- 如果一层层地上溯，所有对象的原型最终都可以上溯到Object.prototype，即Object构造函数的prototype属性。也就是说，所有对象都继承了Object.prototype的属性。这就是所有对象都有valueOf和toString方法的原因，因为这是从Object.prototype继承的。

> 那么，Object.prototype对象有没有它的原型呢？回答是Object.prototype的原型是null。null没有任何属性和方法，也没有自己的原型。因此，原型链的尽头就是null。

		Object.getPrototypeOf(Object.prototype)
		// null

- 上面代码表示，Object.prototype对象的原型是null，由于null没有任何属性，所以原型链到此为止。Object.getPrototypeOf方法返回参数对象的原型

- 读取对象的某个属性时，JavaScript 引擎先寻找对象本身的属性，如果找不到，就到它的原型去找，如果还是找不到，就到原型的原型去找。如果直到最顶层的Object.prototype还是找不到，则返回undefined。如果对象自身和它的原型，都定义了一个同名属性，那么优先读取对象自身的属性，这叫做“覆盖”（overriding）。

#### 1、4 constructor属性

> prototype对象有一个constructor属性，默认指向prototype对象所在的构造函数。

- 由于constructor属性定义在prototype对象上面，意味着可以被所有实例对象继承。

		function P() {}
		var p = new P();

		p.constructor === P // true
		p.constructor === P.prototype.constructor // true
		p.hasOwnProperty('constructor') // false

上面代码中，p是构造函数P的实例对象，但是p自身没有constructor属性，该属性其实是读取原型链上面的P.prototype.constructor属性。

constructor属性的作用是，可以得知某个实例对象，到底是哪一个构造函数产生的。

		function F() {};
		var f = new F();

		f.constructor === F // true
		f.constructor === RegExp // false

上面代码中，constructor属性确定了实例对象f的构造函数是F，而不是RegExp。

另一方面，有了constructor属性，就可以从一个实例对象新建另一个实例。

		function Constr() {}
		var x = new Constr();

		var y = new x.constructor();
		y instanceof Constr // true

上面代码中，x是构造函数Constr的实例，可以从x.constructor间接调用构造函数。这使得在实例方法中，调用自身的构造函数成为可能。

### instanceof运算符

> instanceof运算符返回一个布尔值，表示对象是否为某个构造函数的实例。

		var v = new Vehicle();
		v instanceof Vehicle // true

上面代码中，对象v是构造函数Vehicle的实例，所以返回true。

instanceof运算符的左边是实例对象，右边是构造函数。它会检查右边构建函数的原型对象（prototype），是否在左边对象的原型链上。因此，下面两种写法是等价的。

		v instanceof Vehicle
		// 等同于
		Vehicle.prototype.isPrototypeOf(v)

上面代码中，Object.prototype.isPrototypeOf的详细解释见后文。

由于instanceof检查整个原型链，因此同一个实例对象，可能会对多个构造函数都返回true。

		var d = new Date();
		d instanceof Date // true
		d instanceof Object // true

上面代码中，d同时是Date和Object的实例，因此对这两个构造函数都返回true。

instanceof的原理是检查右边构造函数的prototype属性，是否在左边对象的原型链上。有一种特殊情况，就是左边对象的原型链上，只有null对象。这时，instanceof判断会失真。

		var obj = Object.create(null);
		typeof obj // "object"
		Object.create(null) instanceof Object // false

上面代码中，Object.create(null)返回一个新对象obj，它的原型是null（Object.create的详细介绍见后文）。右边的构造函数Object的prototype属性，不在左边的原型链上，因此instanceof就认为obj不是Object的实例。但是，只要一个对象的原型不是null，instanceof运算符的判断就不会失真。

instanceof运算符的一个用处，是判断值的类型。

		var x = [1, 2, 3];
		var y = {};
		x instanceof Array // true
		y instanceof Object // true

上面代码中，instanceof运算符判断，变量x是数组，变量y是对象。

注意，instanceof运算符只能用于对象，不适用原始类型的值。

		var s = 'hello';
		s instanceof String // false

上面代码中，字符串不是String对象的实例（因为字符串不是对象），所以返回false。

此外，对于undefined和null，instanceOf运算符总是返回false。

		undefined instanceof Object // false
		null instanceof Object // false

利用instanceof运算符，还可以巧妙地解决，调用构造函数时，忘了加new命令的问题。

			function Fubar (foo, bar) {
			  if (this instanceof Fubar) {
			    this._foo = foo;
			    this._bar = bar;
			  } else {
			    return new Fubar(foo, bar);
			  }
			}

上面代码使用instanceof运算符，在函数体内部判断this关键字是否为构造函数Fubar的实例。如果不是，就表明忘了加new命令。

### 构造函数的继承

```js
function Father() {
	this.name = "父亲"
}
function Son() {
	this.name = "儿子";
	this.age = 18;
	this.run = function() {
		console.log("run")
	}
}
var f1 = new Father()

// 子类的原型就是父类的一个实例
Son.prototype = new Father();
Son.prototype.constructor = Son;
var s1 = new Son()
console.log(f1,s1)

//Object.create(被继承的对象)
var s2 = Object.create(f1)
console.log(s2)


// Father.prototype.constructor === Father true


// hasOwnProperty判断对象上的属性是否属于对象自己拥有的属性
console.log(s1.hasOwnProperty("age")) // true

// isPrototypeOf判断实例对象与原型的关系
console.log(Son.prototype.isPrototypeOf(s1)) // true


// getPrototypeOf返回原型对象
console.log("getPrototypeOf", Object.getPrototypeOf(s1) == Son.prototype) //true

var obj5 = {
	name: 'five'
}
Object.preventExtensions(obj5) // 禁止对象的扩展
obj5.age = 18; // 不能扩展
obj5.name = 'jack' // 可以修改
delete obj5.name // 可以
console.log(obj5) // {name: 'five'}

var obj6 = {
	name: 'six'
}
// Object.seal 阻止扩展并且禁止操作符（delete）
Object.seal(obj6)
obj6.name = 'xis'
delete obj6.name // 不可以
console.log('seal',obj6)

var obj7 = {
	name: 'seven'
}
// Object.freeze 禁止属性的修改
Object.freeze(obj7)
obj7.name = 'xis'
//			delete obj6.name // 不可以
console.log('freeze',obj7)

// 获取属性名(keys)
var obj8 = {
	name: 'eight',
	age: 12
}
console.log(Object.keys(obj8)) // ["name", "age"]
```

#### Object 对象的相关方法

> JavaScript 在Object对象上面，提供了很多相关方法，处理面向对象编程的相关操作

##### 1、Object.getPrototypeOf()

- Object.getPrototypeOf方法返回参数对象的原型。这是获取原型对象的标准方法。

```js
var F = function () {};
var f = new F();
Object.getPrototypeOf(f) === F.prototype // true
```
- 上面代码中，实例对象f的原型是F.prototype。

> 下面是几种特殊对象的原型。

```js
// 空对象的原型是 Object.prototype
Object.getPrototypeOf({}) === Object.prototype // true

// Object.prototype 的原型是 null
Object.getPrototypeOf(Object.prototype) === null // true

// 函数的原型是 Function.prototype
function f() {}
Object.getPrototypeOf(f) === Function.prototype // true
```

##### 2、Object.create()

- 生成实例对象的常用方法是，使用new命令让构造函数返回一个实例。但是很多时候，只能拿到一个实例对象，它可能根本不是由构建函数生成的，那么能不能从一个实例对象，生成另一个实例对象呢？

> JavaScript 提供了Object.create方法，用来满足这种需求。该方法接受一个对象作为参数，然后以它为原型，返回一个实例对象。该实例完全继承原型对象的属性。

```js
// 原型对象
var A = {
  print: function () {
    console.log('hello');
  }
};

// 实例对象
var B = Object.create(A);

Object.getPrototypeOf(B) === A // true
B.print() // hello
B.print === A.print // true
```
- 上面代码中，Object.create方法以A对象为原型，生成了B对象。B继承了A的所有属性和方法。

除了对象的原型，Object.create方法还可以接受第二个参数。该参数是一个属性描述对象，它所描述的对象属性，会添加到实例对象，作为该对象自身的属性。

```js
var obj = Object.create({}, {
  p1: {
    value: 123,
    enumerable: true,
    configurable: true,
    writable: true,
  },
  p2: {
    value: 'abc',
    enumerable: true,
    configurable: true,
    writable: true,
  }
});

// 等同于
var obj = Object.create({});
obj.p1 = 123;
obj.p2 = 'abc';
Object.create方法生成的对象，继承了它的原型对象的构造函数。

function A() {}
var a = new A();
var b = Object.create(a);

b.constructor === A // true
b instanceof A // true
```

上面代码中，b对象的原型是a对象，因此继承了a对象的构造函数A。

#### 3、Object.prototype.isPrototypeOf()

实例对象的isPrototypeOf方法，用来判断该对象是否为参数对象的原型。

```js
var o1 = {};
var o2 = Object.create(o1);
var o3 = Object.create(o2);

o2.isPrototypeOf(o3) // true
o1.isPrototypeOf(o3) // true
```

上面代码中，o1和o2都是o3的原型。这表明只要实例对象处在参数对象的原型链上，isPrototypeOf方法都返回true。

```js
Object.prototype.isPrototypeOf({}) // true
Object.prototype.isPrototypeOf([]) // true
Object.prototype.isPrototypeOf(/xyz/) // true
Object.prototype.isPrototypeOf(Object.create(null)) // false
```
- 上面代码中，由于Object.prototype处于原型链的最顶端，所以对各种实例都返回true，只有直接继承自null的对象除外。

#### 4、Object.prototype.__proto__

- 实例对象的__proto__属性（前后各两个下划线），返回该对象的原型。该属性可读写。

```js

var obj = {};
var p = {};

obj.__proto__ = p;
Object.getPrototypeOf(obj) === p // true

```
- 上面代码通过__proto__属性，将p对象设为obj对象的原型。

- 根据语言标准，__proto__属性只有浏览器才需要部署，其他环境可以没有这个属性。它前后的两根下划线，表明它本质是一个内部属性，不应该对使用者暴露。因此，应该尽量少用这个属性，而是用Object.getPrototypeof()和Object.setPrototypeOf()，进行原型对象的读写操作。

```js
	var A = {
		name: '张三'
	}
	var B = {
		name: '李四'
	}
	var C = {
		print: function() {
			console.log(this.name)
		}
	}
	A.__proto__ = C;
	B.__proto__ = C;
	A.print()// 张三
	B.print()// 李四
	A.print === B.print// true
	A.print === C.print// true
	B.print === C.print// true
```
- 上面代码中，A对象和B对象的原型都是proto对象，它们都共享proto对象的print方法。也就是说，A和B的print方法，都是在调用proto对象的print方法。

#### 5、获取原型对象方法的比较

- 如前所述，__proto__属性指向当前对象的原型对象，即构造函数的prototype属性。

		var obj = new Object();

		obj.__proto__ === Object.prototype
		// true
		obj.__proto__ === obj.constructor.prototype
		// true

上面代码首先新建了一个对象obj，它的__proto__属性，指向构造函数（Object或obj.constructor）的prototype属性。

- 因此，获取实例对象obj的原型对象，有三种方法。
	- obj.__proto__

	- obj.constructor.prototype

	- Object.getPrototypeOf(obj)

- 上面三种方法之中，前两种都不是很可靠。__proto__属性只有浏览器才需要部署，其他环境可以不部署。而obj.constructor.prototype在手动改变原型对象时，可能会失效。

```js
var P = function () {};
var p = new P();

var C = function () {};
C.prototype = p;
var c = new C();

c.constructor.prototype === p // false
```

- 上面代码中，构造函数C的原型对象被改成了p，但是实例对象的c.constructor.prototype却没有指向p。所以，在改变原型对象时，一般要同时设置constructor属性。

```js
	C.prototype = p;
	C.prototype.constructor = C;

	var c = new C();
	c.constructor.prototype === p // true
```
- 因此，推荐使用第三种Object.getPrototypeOf方法，获取原型对象。

### in运算符和for in循环

-
