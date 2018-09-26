### Object类型

我们现在看到的大多数引用类型的值都是Object类型的事列；

创建object实列有两种方式。

- 通过new操作符后跟Object构造函数
	
		var person = new Object();
		person.name  = "zhangsan"
		person.age = 20

var person = new Object();这行代码创建了一个Object的引用类型信实列，该实列保存在变量person中

name和age是person的属性

- 使用对象字面量表示法(推荐用法)

**对象字面量语法，因为这种语法要求的代码量少，而且能够给人封装数据的感觉。实际上，对象字面量也是向函数传递大量可选参数的首选方式**

	
		var person= {
			name: "zhangsan",
			age: 20,
			5: true
		}
		
这个列子会创建三个属性：name，age，5.数值属性会自动转换成字符串

- 点表示法(这也是很多面向对象语言中通用的语法)

- 方括号表示法(使用方括号表示法来访问对象的属性。在使用方括号语法时，应该将要访问的属性以字符串的形式放在方括号中)

            console.log(person["name"]); //"zhangsan"
            console.log(person.name);    //"zhangsan"

> 从功能上看，这两种访问对象属性的方法没有任何区别。**方括号语法的主要优点是可以通过变量来访问属性**;    

            var propertyName = "name";
            console.log(person[propertyName]); //"zhangsan"

> 除非必须使用变量来访问属性，否则我们建议使用点表示法。

> 通过typeof操作符来检测每个属性是否存在

		function ObjectDisplay(args) {
				var ouput = ''
				if (typeof args.name == "string") {
					ouput += "name:" + args.name + "\n" 
				}
				if (typeof args.age == "Number") {
					ouput += "age:" + args.age + "\n"
				}
				console.log(ouput);
			}
			ObjectDisplay({
				name: "nicholas",
				age: 20
			})

### 常用方法

object的每个实列都具有以下属性和方法

- 【1】constructor：保存着用于创建对象的函数。对于前面的列子而言，构造函数就会object（）

- 【2】hasOwnProperty(propertyName) : 用于检查给定的属性在当前对象的事列中是否存在。参数的属性名（propertyName）必须是以字符串形式指定的（o.hasOwnProperty("name")）

- 【3】isPrototypeOf(object): 用于检查传入的对象是否是当前的原型

- 【4】propertyIsEnnumberable(propertyName): 用于检查给定的属性能否够使用for-in语句来枚举，必须是以字符串形式指定的

- 【5】toLocaleString() 返回对象的字符串表示，该字符与执行环境的地区相对应

- 【6】toString() 返回字符串的表示

- 【7】valueOf() 返回对象的字符串、数值、或者布尔值，通常与toString（）方法返回相同

**第六章（面向对象详细讨论）**
