### 什么是 DOM?
- 文档对象模型 (DOM) 是HTML和XML文档的编程接口。它提供了对文档的结构化的表述，
- 并定义了一种方式可以使从程序中对该结构进行访问，从而改变文档的结构，样式和内容。
- DOM 将文档解析为一个由节点和对象（包含属性和方法的对象）组成的结构集合。简言之，它会将web页面和脚本或程序语言连接起来。

- 一个web页面是一个文档。这个文档可以在浏览器窗口或作为HTML源码显示出来。但上述两个情况中都是同一份文档。
- 文档对象模型（DOM）提供了对同一份文档的另一种表现，存储和操作的方式。 DOM是web页面的完全的面向对象表述，它能够使用如 JavaScript等脚本语言进行修改。

- W3C DOM 和WHATWG DOM标准在绝大多数现代浏览器中都有对DOM的基本实现。许多浏览器提供了对W3C标准的扩展，所以在使用时必须注意，文档可能会在多种浏览器上使用不同的DOM来访问。


**，低版本IE 中的所有 DOM 对象都是以 COM对象的形式实现的。这意味着 IE 中的DOM 对象与原生 JavaScript 对象的行为或活动特点并不一致。这些差异需要注意。**

- DOM节点的层次
- Node类型
- Document类型
- Element类型
- Text类型
- DocumentFragment类型
- Attr类型

# DOM节点的层次

DOM是树形的结构，

	<!doctype html>
	<html>
	<head>
	    <meta charset="UTF-8">
	    <title>Document</title>
	    <link rel="stylesheet" href="./a.css"/>
	</head>
	<body>
	    <p>hello word</p>
	    <script src="index.js"></script>
	</body>
	</html>

DOM的结构如下

![](http://i.imgur.com/tY1ymHt.png)

- 节点间的各种关系可以用传统的家族关系来描述，相当于把文档树比喻成家谱。在 HTML 中，可以将 <body> 元素看成是 <html> 元素的子元素；相应地，也就可以将 <html> 元素看成是 <body> 元素的父元素。而 <head> 元素，
则可以看成是 <body> 元素的同胞元素，因为它们都是同一个父元素 <html> 的直接子元素。

### Node类型

DOM 可以将任何 HTML 或 XML 文档描绘成一个由多层节点构成的结构。节点分为几种不同的类型，每种类型分别表示文档中不同的信息及（或）标记。每个节点都拥有各自的特点、数据和方法，另外也与其他节点存在某种关系。节点之间的关系构成了层次，而所有页面标记则表现为一个以特定节点为根节点的树形结构

文档节点只有一个子节点，即 <html> 元素，我们称之为**文档元素**。文档元素是文档的最外层元素，文档中的其他所有元素都包含在文档元素中。每个文
档只能有一个文档元素。在 HTML 页面中，文档元素始终都是 <html> 元素。在 XML 中，没有预定义的元素，因此任何元素都可能成为文档元素。

每一段标记都可以通过树中的一个节点来表示：HTML 元素通过元素节点表示，特性（attribute）通过特性节点表示，文档类型通过文档类型节点表示，而注释则通过注释节点表示。总共有 12 种节点类型(nodeType)，这些类型都继承自一个基类型。

```javascript
<p>hello word</p>
<p id="test1">hello word</p>
<p>hello word</p>
<p>hello word</p>

<script>
    var testOne=document.getElementById("test1");
    console.dir(testOne);//p#test1
    console.dir(testOne.__proto__);//HTMLParagraphElement
    console.dir(testOne.__proto__.__proto__);//HTMLElement
    console.dir(testOne.__proto__.__proto__.__proto__);//Element
    console.dir(testOne.__proto__.__proto__.__proto__.__proto__);//Node,重点关注这个属性；
    console.dir(testOne.__proto__.__proto__.__proto__.__proto__.__proto__);//EventTarget
    console.dir(testOne.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__);//Object
</script>
```

可以输出看下Node上面的属性和方法；

![](http://i.imgur.com/8Rc7GSh.png)

重点关心下面几个**属性**；

- nodeType  节点类型
- nodeName  节点名称
- nodeValue 节点值
- childNodes    获取所有的子节点
- children      获取所有的元素子节点
- firstChild    获取第一个子节点（不一定是元素节点）
- lastChild     获取最后一个子节点
- nextSibling   获取下一个弟弟节点（不一定是元素节点）
- previousSibling   获取上一个哥哥节点
- parentNode        获取父亲节点

Node上面的**方法**

- appendChild   将节点添加到指定容器的最后面
- insertBefore  将新的节点添加到指定容器中某一个节点的前面
- replaceChild  把原有的元素进行替换
- removeChild   删除元素
- cloneNode     复制原有的节点，如果传递的值是true，代表将子子孙孙的后代元素一起赋值，false代表只复制当前元素本身

> DOM1 级定义了一个 Node 接口，该接口将由 DOM 中的所有节点类型实现。这个 Node 接口在JavaScript 中是作为 Node 类型实现的；除了 IE 之外，在其他所有浏览器中都可以访问到这个类型。JavaScript 中的所有节点类型都继承自 Node 类型，因此所有节点类型都共享着相同的基本属性和方法。

### Node的属性

##### nodeType / nodeName / nodeValue

NodeType 有以下几种；但是并不需要都记住的；

- ELEMENT_NODE:1
- ATTRIBUTE_NODE:2
- TEXT_NODE:3
- CDATA_SECTION_NODE:4
- ENTITY_REFERENCE_NODE:5
- ENTITY_NODE:6
- PROCESSING_INSTRUCTION_NODE:7
- COMMENT_NODE:8
- DOCUMENT_NODE:9
- DOCUMENT_TYPE_NODE:10
- DOCUMENT_FRAGMENT_NODE:11
- NOTATION_NODE:12

### dom获取

- getElementById() // 获取id
- getElementsByClassName() // 获取class元素
- getElementsByName()   // 获取属性
- querySelector		// 支持css选择器
- querySelectorAll		// 获取静态的nodelist列表

```html
<ul id="test1">
	<li class="item">01</li>
	<li>02</li>
	<li>03</li>
	<li>04</li>
	<li>05</li>
</ul>
<ol id="ol">
	<li id="liID">1</li>
	<li>2</li>
	<li>3</li>
</ol>
<input type="" name="username" id="username" value="" />
```

```javascript
// 通过id获取
var test1 = document.getElementById("test1")
var ol = document.getElementById("ol");
console.log(test1)

// 通过class类名获取，返回的是一个类似数组（长得像数组，但是没有数组的方法）
var item= document.getElementsByClassName("item")
console.log(item[0])

// 通过标签获取
var li = document.getElementsByTagName("li");

console.log(li)

// 通过name属性获取
var username = document.getElementsByName("username")
console.log(username)

//querySelector(css选择器)
var ol = document.querySelector("ol > li")
console.log(ol)

var olAll = document.querySelectorAll("ol > li")
console.log(olAll)

// getElement和querySelector差异
var ol = document.getElementsByTagName("ol")[0]
var ol_getElement = ol.getElementsByTagName("li")
var ol_querySelector = document.querySelectorAll("ol>li");

var newLi = document.createElement("li")
ol.appendChild(newLi);
console.log("getElement", ol_getElement)
console.log("querySelector", ol_querySelector)
console.log("querySelector", document.querySelectorAll("ol>li"))

// HTMLCollection是一个动态的列表
// NodeList是一个静态集合
```

**Text 类型的介绍**
```html
	<!-- 没有内容，也就没有文本节点 -->
	<div></div>
	<!-- 有空格，因而有一个文本节点 -->
	<div> </div>
	<!-- 有内容，因而有一个文本节点 -->
	<div>Hello World!</div>
	<ul>
		<li>0</li>
		<li>1</li>
		<li>2</li>
		<li>3</li>
		<li>4</li>
	</ul>
	<!--包含一个文本节点-->
	<ol>
	</ol>
	<!--不包含一个文本节点-->
	<ol></ol>
```
上面代码给出的第一个 <div> 元素没有内容，因此也就不存在文本节点。开始与结束标签之间只要存在内容，就会创建一个文本节点。因此，第二个 <div> 元素中虽然只包含一个空格，但仍然有一个文本子节点；文本节点的 nodeValue 值是一个空格。第三个 <div> 也有一个文本节点，其 nodeValue 的值为 "Hello World!" 。

### node属性

- 获取子节点
			
	- childNodes包含文本节点和元素节点(标签)
	- childElementCount元素节点的个数
	- children所有的子元素节点
	
```javascript
// 获取ul
var ul = document.getElementsByTagName("ul")[0];
// 类数组，有length属性反映出查询页面结构的个数
console.log(ul, ul.length)

console.log(ul.childNodes)// [text, li, text, li, text, li, text, li, text, li, text]

console.log(ul.childElementCount) // HTMLCollection(5) 元素的集合

console.log(ul.children) // 子元素li

console.log(ul.children[2]) // 子元素第三个li

// 第一个子元素和最后一个子元素
// 注意firstChild和firstElementChild的区别
// firstChild指的是ul元素的第一个子节点
// firstElementChild指的是ul元素的第一个元素节点
console.log(ul.firstChild,ul.firstElementChild) // text  // <li>0</li>
console.log(ul.lastChild,ul.lastElementChild) // text  // <li>4</li>

// 兄弟节点
var li = document.getElementsByTagName("li")
// 下一个节点
console.log(li[2].nextSibling, li[2].nextElementSibling)// text  // <li>3</li>
// 如果到了尽头，表示没有下一个或者上一个了， 就会返回null
console.log(li[2].nextSibling, li[2].nextElementSibling.nextElementSibling.nextElementSibling)//text  null
// 上一个节点
console.log(li[2].previousSibling, li[2].previousElementSibling)// text  // <li>1</li>

// 查找父元素
console.log(li[2].parentNode, li[2].parentElement);
```

总结：

- 1、父节点的 firstChild 和 lastChild属性分别指向其 childNodes 列表中的第一个和最后一个节点。firstChild等于childNodes[0]，lastChild原理一样；
- 2、在只有一个子节点的情况下， firstChild 和lastChild 指向同一个节点。如果没有子节点，那么 firstChild 和 lastChild 的值均为 null 。
- 3、如果列表中只有一个节点，那么该节点的 nextSibling 和 previousSibling 都为 null 

### Node的方法

- appendChild
- insertBefore
- cloneNode

#### appendChild() 方法将一个节点添加到指定父节点的子节点列表末尾

- 如果被插入的节点已经存在于当前文档的文档树中,则那个节点会首先从原先的位置移除,然后再插入到新的位置.
```html
<ul>
	<li>01</li>
	<li>02</li>
	<li>03</li>
	<li>04</li>
	<li>05</li>
	<li>
	</li>
</ul>
```
```javascript
// 创建一个新的段落p元素,然后添加到body的最尾部
var p = document.createElement("p");
document.body.appendChild(p);
var ul = document.getElementsByTagName("ul")[0]
			
// 创建li
var newLi = document.createElement("li")

// appendChild(newLi)// 在对尾插入
ul.appendChild(newLi)// 在对尾插入
```

### removeChild() 方法从DOM中删除一个子节点。返回删除的节点。

#### insertBefore(新节点， 插入到某个元素之前)

```javascript
var newLi = document.createElement("li")
ul.insertBefore(newLi, ul.children[2])

// 第二个参数为null时，则插入对尾
// 若插入元素已存在父节点中，insertBefore会更新这个元素的位置
ul.insertBefore(newLi, null)
```

#### cloneNode 克隆节点
赋值节点

	var dupNode = node.cloneNode(blooeanValue);

- node是被赋值的节点
- dupNode是赋值后的文件；
- blooeanValue 是否采用深度克隆
	- 如果为true,则该节点的所有后代节点也都会被克隆
	- 如果为false,则只克隆该节点本身.
- 虽然 blooeanValue是可选的参数，但是推荐当做必须参数用；

备注：

- 克隆一个元素节点会拷贝它所有的属性以及属性值,当然也就包括了属性上绑定的事件(比如onclick="alert(1)"),但不会拷贝那些使addEventListener()方法或者node.onclick = fn这种用JavaScript动态绑定的事件.
	- 推荐：平时写代码的时候，用事件委托的方式去写代码；
- **clonenode()可能导致文件重复的元素ID**,如果原始节点设置了ID，并且克隆节点会被插入到相同的文档中，那么应该更新克隆节点的ID以保证唯一性。name属性可能也需要进行修改
- 想要克隆一个节点来添加到另外一个文档中,请使用Document.importNode()代替本方法.

```javascript
// 克隆节点
			
// 浅拷贝，默认浅拷贝
var newUl = ul.cloneNode();
document.body.appendChild(newUl)

// 深拷贝cloneNode(布尔值)，true，连同子元素的结构都进行克隆
var newUl = ul.cloneNode(true);
document.body.appendChild(newUl)
```

#### 添加文本

- innerText
- innerHTML

		// innerText 只更改元素的文本
		newLi.innerText = "这是新加的li标签"
		// innerHTML如果包含HTML代码，就会将代码部分解析并输出HTML结构
		newLi.innerHTML = "<h1>这是新加的li标签<h1/>"
		
		// outerHTML和innerHTML对比，作用在元素本身
		newLi.outerHTML = "<h1>这是新加的li标签<h1/>" // <h1>这是新加的li标签</h1>

##### removeChild

该方法从指定的DOM结构中，删除一个子元素；返回值是要删除的节点;

    <div class="parent-test1">
        <p>hello word1</p>
        <p id="test1">hello word2</p>
        <p id="test2">hello word3</p>
        <p>hello word4</p>
    </div>
    <div class="parent-test2"></div>
    
    <script>
        var parent1=document.getElementsByClassName("parent-test1")[0];
        var parent2=document.getElementsByClassName("parent-test2")[0];
        var parent3=document.getElementsByClassName("parent-test666")[0];
        var oTest1=document.getElementById("test1");
        var oTest2=document.getElementById("test2");
        var returnValue1=parent1.removeChild(oTest1);
        console.log(returnValue1);//<p id="test1">hello word2</p>
        //var returnValue2=parent2.removeChild(oTest2);//Uncaught NotFoundError: Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.
        var returnValue666=parent2.removeChild(parent3);//Uncaught TypeError: Failed to execute 'removeChild' on 'Node': parameter 1 is not of type 'Node'.
    </script>

- oTest1和parent1是父子节点的关系；
- returnValue===oTest1，
- 如果要删除的和被删除的节点不是父子关系，会报错
	- 子元素不存在：parameter 1 is not of type 'Node'.
	- 要删除的子元素，不是父元素内的子元素：The node to be removed is not a child of this node.

参考：[web文档](https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild)

### dom样式

```javascript
<div class="box" data-type="type">
			111
</div>
<button onclick="cla()">点击切换</button>
<script type="text/javascript">
	var div = document.getElementsByClassName("box")[0];
	div.id = "box"
	console.log(div.className, div.nodeName) // box DIV
	
	// 获取
	// getAttribute获取属性
	console.log(div.getAttribute("id")) // box
	console.log(div.getAttribute("data-type")) // type
	
	// 设置
	// setAttribute()设置属性
	console.log("设置属性"+div.setAttribute("style", "color:red"));
	
	// 删除属性，连属性名也去掉
	console.log(div.removeAttribute("style"))
	
	//通过类名控制样式
	div.className += " box1"
	
	// div.classList表示元素包含的class的列表， value表示原本class的值。
	console.log(div.classList)
	
	// 添加类名
	div.classList.add("fz30")
	
	// 移除类名
	div.classList.remove("box1");
	
	var btn = div.getElementsByTagName("button")[0];
	function cla() {
//				// 判断active类名是否存在
//				if (div.className.indexOf("active") == -1) {
//					div.classList.add("active")
//				} else {
//					div.classList.remove("active")
//				}
		// 方法二
		div.classList.toggle("active")
	}
	
	// 添加行内样式
	div.style.fontSize = "40px";
	
	console.log(window.getComputedStyle(div))
//			console.log(div.currentStyle)
	
	function getStyle(element, style) {
		if (window.getComputedStyle) {
			if (style == "float") {
				style = "cssFloat"
			}
			return window.getComputedStyle(element)[style]
		} else {
			// ie7以下的方法
			if (style == "float") {
				style = "styleFloat"
			}
			return element.currentStyle[style]
		}
	}
	// 最终样式 浮动的属性名在不同的浏览器会不一样
	// 变形transform的值以矩阵方式显示
	console.log(getStyle(div, "color"))
</script>
```

### 鼠标事件

- click 鼠标点击
- dblclick 鼠标双击事件
- mousedown在元素上按下任意鼠标按钮
- mousemove指针在元素内移动时持续触发
- mouseover指针移到有事件监听的元素或者它的子元素内
- mouseenter指针移到有事件监听的元素内
- moseup在元素上释放任意鼠标按键

#### click 鼠标点击

		<div id="test"></div>
		
		<script>
		  document.getElementById("test").addEventListener("click", function( event ) {
		    // 在被点击的div内显示当前被点击次数
		    event.target.textContent = "click count: " + event.detail;
		  }, false);
		</script>
- 简易选项卡

```javascript

```
#### dbclick

- 在单个元素上单击两次鼠标的指针设备按钮 (通常是小鼠的主按钮) 时, 将触发 dblclick 事件

- 拖拽事件
- 原理： 鼠标按下一个元素，在文档中拖拽
	
	- 时间对象mousedown,mousemove,mouseup
```javascript
<script type="text/javascript">
	var box = document.querySelector(".box");
	var sw = false; //开关，默认是关闭
	// mousedown事件
	box.addEventListener("mousedown", function(e) {
		// 获取鼠标在当前元素位置
		var mouseX = e.clientX - box.offsetLeft;
		var mouseY = e.clientY - box.offsetTop;
		sw = true; // 开关打开
//		console.log(mouseX, mouseY)
		// mousemove事件
		document.addEventListener("mousemove", function(e) {
			// 获取元素拖动时的位置
			var left = e.clientX - mouseX;
			var top = e.clientY - mouseY;
			// 判断元素位置是否超出文档。
			if(left < 0) {
				left = 0;
			} else if(left > document.body.clientWidth - box.offsetWidth) {
				left = document.body.clientWidth - box.offsetWidth;
			}
			if(top < 0) {
				top = 0;
			} else if(top > document.body.clientHeight - box.offsetHeight) {
				top = document.body.clientHeight - box.offsetHeight
			}
			if(sw) {
				box.style.left = left + "px";
				box.style.top = top + "px";
			}

		})
		document.addEventListener("mouseup", function() {
			sw = false;
		})
	})
	
	// 移动端拖拽
	box.addEventListener("touchstart", function() {
		var flag = true;
	})
	box.addEventListener("touchmove", function(e) {
		console.log(e)
		var handX = e.changedTouches[0].pageX
		var handY = e.changedTouches[0].pageY
		box.style.top = handY - (box.clientHeight/ 2)  + "px";
		box.style.left = handX - (box.clientWidth / 2)  + "px";
	})
	
	box.addEventListener("touchend", function(e) {
	})
</script>
```
### 鼠标坐标
如图所示

![](https://pic002.cnblogs.com/images/2012/389001/2012090315221723.gif)

- 不知道大家看到这张图的第一感觉如何，反正我的感觉就是“这次第，怎一个乱字了得”。既然我认为上图太多太乱，那么我就把offset、scroll、client分开说，希望能让大家彻底弄清楚，今天只说offset。

在这里我们可以看到，关于offset共有4个东西需要弄清楚：

　　1、offsetTop

　　2、offsetLeft返回当前元素左上角相对于  HTMLElement.offsetParent 节点的左边界偏移的像素值。

　　3、offsetWidth

　　4、offsetHeight

![](https://mdn.mozillademos.org/files/347/Dimensions-offset.png)
	
```javascript
/*
 * clientX:  和当前窗口位置有关
 * clientY
 * 
 * layerX   1、如果正常文档流，当前元素的偏移加上鼠标在元素內的偏移（体现在父子元素）
 * layerY	2、如果是绝对定位，则与offset相同
 * 
 * offsetX  // 相对监听元素的内部坐标
 * offsetY
 * 
 * pageX  只跟页面的原来尺寸有关
 * pageY
 * 
 * screenX  相对屏幕位置
 * screenY*/
// 兼容性写法
var offsetX = e.offsetX || e.pageX - box.offsetLeft;
console.log(offsetX)

	//物体跟随鼠标移动
			
	document.body.addEventListener("mousemove", function(e) {
		// 坐标位置
		console.log(e.pageX, e.pageY)
		// 鼠标位置 - 自身宽度的一半
		box.style.left = e.pageX - (box.clientWidth / 2) + 'px';
		box.style.top = e.pageY - (box.clientHeight / 2) + 'px';
		console.log(box.offsetLeft)
	})
```
