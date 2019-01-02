<a name="zero"><a/>

# 数据类型

- 一、[Undefined and Null](#Undefined 和 Null)
- 二、[Boolean](#boolean)
- 三、[Number](#number)
- 四、[String](#String)
- 五、[object](#object)

> ECMAScript5中有5种简单的数据类型（也称为基本数据类型）
- 包括Undefined，null，Boolean，number，string。还有一种复杂的数据类型Object

### typeof操作符，检测给定变量的数据类型
- [1] "Undefined" - 如果这个值未定义
- [2] "Boolean" - 这个值是布尔值
- [3] "string" - 这个值是字符串
- [4] "number" - 这个值是数值
- [5] "object" - 如果这个值是对象或者null
- [6] "function" - 这个值是函数

```
<script type="text/javascript">
	var message = "some thing"
	var s = true
	var obj1 = {}
	function show() {
	}
	console.log(typeof message) // string
	console.log(typeof "222");//string，是一个字符串
	console.log(typeof 12) // number
	console.log(typeof obj) // undefined
	console.log(typeof s) // boolean
	console.log(typeof obj1) // object
	console.log(typeof show) // function

	typeof检测任何数据，返回的都是一个字符串，两次和两次以上的连续typeof结果肯定都是string；

    //两次检测 结果是string
    console.log("开始2次typeof");
    console.log(typeof typeof qqqq);
    console.log(typeof typeof 222);
    console.log(typeof typeof "222");
    console.log(typeof typeof {});
    console.log(typeof typeof null);
    console.log(typeof typeof function(){});
</script>
```
**[↑ 返回目录](#zero)**

<a name="Undefined 和 Null"></a>

### Undefined和Null

- Undefined只有一个值，特殊的undefined。在var声明变量未赋值是加以初始化时，这个变量的值就是undefined
- 列如
var message
alert(message == undefined)// true


    console.log(xxx);// xxx is not defined

和下面

    var xxx;
    console.log(xxx)


这个列子也是等价的:
var message = undefined
alert(message == undefined) //true


- Null是第二个只有一个值的数据类型，即使null。null值表示一个空对象指针，用typeof检测
会返回object
  - var car = null
  - typeof car // object

- 如果定义的变量准备用来保存对象，最好将该变量初始化为null
而不是其他值。这样一来就可以检测null值就知道相应的变量是否已经保存了一个对象的引用
。

```
if (car ! null) {
	// 逻辑
}

```
> 实际上undefined值是派生null的值
- alert(null == undefined) // true

- null（空值，曾经赋过值，但是目前没有值）
  - 逻辑上null表示一个空对象的指针
  - 使用typeof检测的时候会返回object；（object原型的终点也是null）
- undefined（没有值，指从没有赋过值）
  - 使用var声明变量但没有初始化/赋值的
  - 区分空对象指针与尚未定义的变量
  - 对未初始化的变量以及未声明的变量使用typeof运算符均会返回undefined；

在非严格模式和严格模式下，我们可以声明一个undefined的局部变量，因为undefined是一个标识符，
可以当作变量来使用和赋值；但却不能声明一个null的局部变量，
因为null是一个特殊关键字，并不是一个标识符；
注意这是为了深入理解null和undefined的背后原理而挖出来的不同，
请不要真的声明一个undefined的变量（这是一个非常不好的习惯，严格点的压缩工具
，压缩时都不会给你通过的，直接给你抛Error；）

- undefined和null的关系；

是undefined派生自null；因为undefined派生子null；所以Null和undefined做比较的时候是true；但是null和undefined和别的人和类型比较都不想等；

  - undefined派生子null，因此在使用”==”进行比较的时候会返回true；
  - 没有必要将变量显示声明undefined；
  - 声明非空对象对应将其赋值为null；比如做定时器的时候用timer=null来重置变量；

> Undefined类只有一个值，就是特殊的undefine；（大写的Undefined是代表Undefined类的意思，就好比人类和人的关系；）

	      var test1;
	      var test2=undefined;
	      console.log(test1==undefined);//true，变量声明了，但是没有定义；
	      console.log(test1=="undefined");//false,"undefined"是一个字符串，含有undefined的字符；而不是undefined类型；
	      console.log(test2==undefined);//true，变量声明了，但是没有被定义，undefined是变量的默认值；我们声不需要显示的把某个变量设置为undefined，因为没有赋值的变量，默认就是undefined;可以试验下，这里的两个等于号和三个等于号的区别，2个是比较（会隐式转换类型，===是不转化类型的，是绝对相等）
	      console.log(test1);//undefined
	      console.log(test2);//undefined
	      console.log(test3);//Error，报错了; Uncaught ReferenceError: test3 is not defined；对于尚未声明的变量，只能执行一项操作，就是typeof检测其数据类型；（对未经声明的变量调用delete也不会导致错误，但属于脱裤子放屁，没啥意义，而且在严格模式下确实会导致错误；）

> Null是第二个只有一个值的数据类型，这个特殊的值是null，从逻辑上来看，null值表示一个空对象指针，而这也正是typeof操作符检测null时候，返回"object"的原因；
只要意在保存对象的变量还没有真正保存对象，就应该明确的让变量赋值为null值；这不仅可以体现null作为空对象指针的惯例，而且也有助于进一步却分null和undefined；

<a name="boolean"></a>
### boolean型

- boolean只有两个字面值：true和false,true不一定等于1，而false不一定等于0；

- 转换。要将一个值转换对应的boolean，调用Boolean()函数，总会返回一个boolean值。

- 转为true的
    - Boolean的true本身
    - 任何非空字符串
    - 任何非零数值
    - 对象
- 转换为flase
    - false本身
    - 空字符串
    - 0和NaN（0=-0吗？可以输出看一下，是等于的）

	          console.log(0===(-0));//true

    - null和undefined；

为false值的是，false本身、空字符串、0、NaN、null、undefined；这些值要记住，很重要；
```
<script type="text/javascript">
	var message = "hello world"
	var name = ''
	var messageBoolean = Boolean(message)
	var nameBoolean = Boolean(name)
	console.log( typeof message) // string
	console.log(typeof messageBoolean) // boolean
	// 任何非空字符串都为true
	console.log(Boolean('')) // false
	console.log(Boolean('aaa')) // true
	console.log(Boolean(true)) //true
	console.log(Boolean(12)) // 非0数值都为true
	console.log(Boolean(0)) // false
	console.log(Boolean(NaN)) // false
	// 任何对象都为true，null为false
	console.log(Boolean({})) //true
	console.log(Boolean(null)) //false
	console.log(Boolean(undefined)) // false
</script>
```
**总结：0、NaN、""、null、undefined、false本身；只有这六个是false类型的；其它都是true；**

**[↑ 返回目录](#zero)**


<a name="number"><a/>

### number 型

包含：正数、负数、零、小数、以及特殊的NaN；

- 进制
  - 十进制（最常用）
  - 八进制（仅了解即可）
      - 第一位必须是0
      - 有效序列0-7（0后面跟着由0-7[包括0-7]之间的数字组成的序列）
      - 如果超出范围
        - 前导位0被忽略
        - 后续数值以十进制计数
  - 十六进制（仅了解即可）
      - 前两位必须0x
      - 有效序列
        - 0-9
        - A-F

- 浮点数；
  - 小数点后至少一位数字
  - 可以用科学计算法
    - 小数点后带有6个0的浮点数
    - 以e为底*10的正负N次幂
  - 最高精度：17位小数
  - 缺点
    - 存在舍入误差(**浮点数之间的运算也是非常不准确的，需要转成整数，然后再运算，运算后再转回对应的小数**)
    - 无法测试特定浮点数值，不要直接对浮点数进行运算；
    - 在做有浮点数运算的情况下，先转成整数，然后得到结果后再转成小数；

	    //浮点数直接运算，结果不一定是正确的;
	    var test1=0.1+0.2;
	    console.log(test1);//0.30000000000000004
	    var test2=(0.1*10+0.2*10)/10;
	    console.log(test2);//0.3

- 数值范围（仅作了解）
  - 最小值 Number.MIN_VALUE
  - 最大值 Number.MAX_VALUE：
  - 超出范围
      - 正无穷
          - Infinity
          - Number.POSITIVE_INFINTY
      - 负无穷
          - -Infinity
          - Number.NEGATIVE_INFINITY
      - 缺陷
          - 无法参与下一次计算
      - 检测方法，用isFinite
          - 超出范围 false
          - 合法范围true
- NaN
  - NaN，即为非数值是一个特殊的数值。NaN本身有两个特点，一是NaN的操作（NaN/任何数值）都会返回NaN。
  其次，NaN和任何值都不相等，包括NaN本身

> console.log(NaN == NaN) //false

- 针对这两个特点，ECMAScript定义了一个函数isNaN();它接收一个函数，参数可以是任意类型，而这个函数会帮助我们确定这个参数是否“不是数值”
isNaN()接收参数后，会尝试将这个值转化为数值，
**任何不能被转化为数值的值都返回true**

//任何不能被转化为数值的值都返回true

```
	console.log(isNaN(10)) //false
	console.log(isNaN(NaN))// true
	console.log(isNaN("10")) //false
	console.log(isNaN("bule")) //true
	console.log(isNaN(true)) //false
```
**在基于对象调用isNaN()函数时，会首先调用对象的valueOf()方法，然后确定该方法返回的值是否可以转化为数值，
如果不能，再调用toString()方法，再测试返回。所以为什么10和"10"都能返回false。**

- 数值转换
  - Number()，parseInt()，parseFloat()可以把非数值转换为数值
- Number()函数转换规则如下
  - [1] 如果是布尔值，true和false分别转换为1和0
  - [2] 如果是数字值，只是简单的传入和返回
  - [3] 如果是NaN,则返回0
  - [4] 如果是undefined，返回NaN
  - [5] 如果是字符串：如下
  		- 如果字符串包含数字如"10"，返回10，"011"返回11（忽略前面的0），
  		浮点型"1.1"，返回1.1
  		- 如果字符串包含16进制，如“0xf”，则将其转换为10进制
  		- 如果字符串为空""，转换为0
  		- 如果出了包含上述都没的情况，返回NaN。
  		- 如果是对象，调用对象的valueOf()方法，如果转化结果是NaN,调用toString()方法一次执行上述转换规则

```
<script type="text/javascript">
	console.log(Number("hello world")) //NaN
	console.log(Number("")) // 0
	console.log(Number("11")) // 11
	console.log(Number("0011")) // 11
	console.log(Number("1.1")) // 1.1
	console.log(Number(undefined)) //NaN
	console.log(Number("12blue"))//NaN
	console.log(Number(true)) // 1
	console.log(Number(false)) // 0
	console.log(Number(null))	// 0
	console.log(Number(0xf)) // 15
</script>
```

- parseInt()函数转换，处理整数时用的最多数字
  - 转换过程会忽略字符串前面的空格，直到找到第一个非空格字符。
  如果第一个字符不是数字或者负号，返回NaN。parseInt（）转换空字符返回NaN(Number（）返回0)。
  列如"1234bule"转换为1234，blue会被忽略掉

```
<script type="text/javascript">
	console.log(parseInt("1234blue"))// 1234
	console.log(parseInt("")) // NaN
	console.log(parseInt("22.5")) // 22
	console.log(parseInt(0xf)) // 15
	console.log(parseInt(70)) //70
</script>
```
- parseFloat()
  - 从第一个字符开始解析
  - 遇到无效浮点格式后结束
  - 只有第一个小数点有效
  - 忽略前导0
  - 十六进制始终为0
  - 没有小数点或小数点后全0；转换为整数
  - 提供第二个参数，参数设置为多少进制

	        //num1是多少分
	        var num1="564878.12415ssss";

	        var min1=Number(num1)/60,
	            min2=parseInt(num1)/60,
	            min3=parseFloat(num1)/60;
	        console.log(min1,min2,min3);

	        var targetMin=parseInt(min2);
	        console.log(targetMin);//9414秒

			console.log(parseFloat(12, 10)) // 12
			console.log(parseFloat("ab")) // NaN
**[↑ 返回目录](#zero)**

<a name="String"></a>

### string型

##### 字符串的特性；

- 由0个或多个16位unicode字符组成；
- 引号包裹，单引号和双引号都可以；但是单引号和双引号不能交叉使用；（放在引号内的任何东西都是属于字符串，即使里面没有东西或者空格，都属于合法的字符串 ）

	    var str1="2";
	    var str2='2';
	    var str3="";
	    var str4=" ";
	    var str5="function(){}";
	    //上面都是合法的string类型
	    console.log(typeof str1);
	    console.log(typeof str2);
	    console.log(typeof str3);
	    console.log(typeof str4);
	    console.log(typeof str5);

- 使用.length属性可以访问字符串的长度;

length计算包括空格

	    //字符串长度
	    var strTest1="wujianfeng";//共10个
	    var strTest2="JavaScript学习笔记";//共14
	    console.log(strTest1.length);//10
	    console.log(strTest2.length);//14
	    //这只是个简单的判断，如果想用JavaScript判断或者获取所占的字节，就不能这么判断了，因为中文和英文字符所占的字节长度不同，所以要想获得中文字符的真正长度，就需要对输入的字符进行判断或过滤(可以unicode区间进行判断)，如果符合中文字符，则使用不同的标准。

- 无法精确返回双字节字符长度(上面已经做说明)
- 转义序列表示一个字符
- 字符串一旦被创建，其值是不能改变的，若要改变必须销毁原有字符串，然后用另一个包含新值的字符串填充改变量；
	- 原理后面会有总结

转义序列；
- \n 换行，常用的,这个需要记住；
- \\ 斜杠\是常用转义使用的
	- \’单引号 常用
	- \”双引号 常用

下面的仅作了解就可以了
- \t 制表符
- \b 空格
- \r 回车符
- \f 分页符
- \xnn 十六进制，n代表0-F
- \unnnn 以十六进制代码表示一个unicode字符

##### 类型转换

- toString()
	- 把别的类型数据，转为字符串

	      适用类型
	      Number/Boolean/String/Object
	      参数：number类型的数值基数；一般不需要写，仅作了解，如果需要按照2/8/16进制来转换，需要写；

	    //toString()和String()
	    var testNum=1;
	    console.log(typeof testNum);//number
	    var testTarget2=testNum.toString();//推荐用法
	    console.log(typeof testTarget1);//string
	    console.log(typeof testTarget2);//string
	    console.log(typeof testTarget3);//string

- String()

	      Null
	      Undefined
	      null和undefined没有toString方法，所以转换的时候用String()函数；

	      null.String() // "null"
	      undefined.String() // "undefined"

	    var testNull=null;
	    console.log(typeof testNull);//object
	    //var testString2=testNull.toString();//Uncaught TypeError:Cannot read property 'toString' of null
	    var testString3=String(testNull);
	    console.log(typeof testString3);//string

- Eval()
  - 计算字符串表达式的值并以数值形式返回；

	    //eval
	    var evalVal="1+2+5+8+10";
	    console.log(typeof evalVal);//string
	    var evalComputed=eval(evalVal);
	    console.log(evalComputed,typeof evalComputed);//26 "number"

##### 如果把某个数据转化为字符串，可以有一个快捷的方式，就是把它与一个字符串""相加就可以了；


	    //+""用来转换字符串
	    var numVal=2;
	    var boolVal=false;
	    var nullVal=null;
	    var undefinedVal=undefined;

	    var numValPlus=numVal+"";
	    var boolValPlus=boolVal+"";
	    var nullPlus=nullVal+"";
	    var undefinedPlus=undefinedVal+"";z;
	    console.log(numValPlus,typeof numValPlus);
	    console.log(boolValPlus,typeof boolValPlus);
	    console.log(nullPlus,typeof nullPlus);
	    console.log(undefinedPlus,typeof undefinedPlus);

某个数据并不仅限于Number类型；数组也可以的；

		console.log([1,2,3,4]+"")


再看一组的加法(将字符串转为数字,注意浮点数的运算精度)；

		console.log("1.1" + 1.1);
		console.log(+"1.1" + 1.1);
		console.log((+"1.1") + (+1.1));//2.2 注：加入括号为清楚起见，不是必需的。


备注：先简单的总结，后面有专门深入总结；

**[↑ 返回目录](#zero)**

### object型
- 对象（object）是 JavaScript 语言的核心概念，也是最重要的数据类型。

- 什么是对象？简单说，对象就是一组“键值对”（key-value）的集合，是一种无序的复合数据集合。

```js
var obj = {
	foo: "hello", // foo 键名， hello // 键值
	bar: "world"
}
```
