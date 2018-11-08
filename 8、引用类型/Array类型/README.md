<a name="zero"></a>

# Array类型

- [数组的定义](#数组的定义)
- [检测数组](#检测数组)
- [转换方法](#检测数组)
- [栈方法](#栈方法)
- [队列方法](#队列方法)
- [重排序方法](#重排序方法)
- [操作方法](#操作方法)
- [位置方法](#位置方法)
- [迭代方法](#迭代方法)
- [归并方法](#归并方法)

除了 Object 之外， Array 类型恐怕是 ECMAScript 中最常用的类型了。而且，ECMAScript 中的数组与其他多数语言中的数组有着相当大的区别。虽然 ECMAScript 数组与其他语言中的数组都是数据的有序列表，但与其他语言不同的是，ECMAScript 数组的每一项可以保存任何类型的数据。也就是说，可以用数组的第一个位置来保存字符串，用第二位置来保存数值，用第三个位置来保存对象，以此类推。而且，CMAScript 数组的大小是可以动态调整的，即可以随着数据的添加自动增长以容纳新增数据。

<a name="数组的定义"></a>

### 数组的定义

- 构造函数模式

            var colors = new Array("red", "blue", "green"); //创建一个包含 3 项，即字符串red", "blue", "green"的数组
            var colors = new Array(3); // 创建一个包含 3 项的数组，实际项目中，很少有人这么写；
            var colors = Array("red", "blue", "green"); //构造函数的new是可以省略的；

- 数组字面量表示法

> 数组字面量由一对包含数组项的方括号表示，多个数组项之间以逗号隔开

            var colors = ["red", "blue", "green"]; // 创建一个包含 3 个字符串的数组
            var names = []; // 创建一个空数组
            var values = [1,2,]; // 不要这样！这样会创建一个包含 2 或 3 项的数组
            var options = [,,,,,]; // 不要这样！这样会创建一个包含 5 或 6 项的数组

在 IE 中， values 会成为一个包含 3 个项且每项的值分别为 1、2 和 undefined 的数组；在其他浏览器中， values 会成为一个包含 2项且值分别为1 和 2 的数组。原因是 IE8 及之前版本中的 ECMAScript 实现在数组字面量方面存在 bug。由于这个 bug导致的另一种情况如最后一行代码所示，该行代码可能会创建包含 5 项的数组（在 IE9+、Firefox、Opera、Safari 和 Chrome 中），也可能会创建包含 6 项的数组（在 IE8 及更早版本中）。在像这种省略值的情况下，每一项都将获得 undefined 值；这个结果与调用 Array 构造函数时传递项数在逻辑上是相同的。但是由于 IE 的实现与其他浏览器不一致，因此强烈建议不要使用这种语法。

在读取和设置数组的值时，要使用方括号并提供相应值的基于 0 的数字索引，如下所示：**数组的索引是以0开始的,一定要注意**

            var colors = ["red", "blue", "green"]; // 定义一个字符串数组
            console.log(colors[0]); // 显示第一项,可以思考下，如果访问的索引超过数组长度呢？会返回什么
            colors[2] = "black"; // 修改第三项
            colors[3] = "brown"; // 新增第四项,如果设置某个值的索引超过了数组现有项数,数组就会自动增加到该索引值加 1 的长度（就这个例子而言，索引是 3，因此数组长度就是 4）
            
- 利用 length 属性也可以方便地在数组末尾添加新项

            var colors = ["red", "blue", "green"]; // 创建一个包含 3 个字符串的数组
            colors[colors.length] = "black"; // （在位置 3 ）添加一种颜色
            colors[colors.length] = "brown"; // （在位置 4 )再添加一种颜色
 > 由于数组最后一项的索引始终是 length-1 ，因此下一个新项的位置就是 length 。每当在数组末尾添加一项后，其 length 属性都会自动更新以反应这一变化。

<a name="检测数组"></a>

### 检测数组

- instanceOf

		if (value instanceOf Array ) {
			// ....
		}
		
instanceOf操作问题在于，假定只有一个全局环境。如果网页中包含多个框架，就存在两个以上不同的全局执行环境，从而有两个不同版本的array构造函数
为了解决这个问题，es5新增了一个方法Array.isArray()

- Array.isArray()

这个方法的最终目的是确定某个值到底是不是数组

		
		if (Array.isArray(value) ) {
			// ....
		}
		
<a name="转换方法"></a>

### 转换方法

- toLocaleString()

- toString()

- valueOf()

toString()返回数组中每个值以字符串的形式以逗号隔开的字符串

valueOf() 返回的还是数组

```JavaScript
<script type="text/javascript">
	var colors = ["red","bule","green"]
	console.log(colors.toString()) //red,bule,green  
	console.log(colors.valueOf()) // ["red", "bule", "green"] 
	console.log(colors.toLocaleString()) // red,bule,green  
</script>
```
		

<a name="栈方法"></a>

### 栈方法
	先进后出原则

- push()入栈
	
	- push() 接收任意个参数，把他们添加到数组的尾部，修改数组的长度。

```JavaScript		
<script type="text/javascript">
	var arr = [1,2,3,4,5,6,7,8]
	console.log(arr, arr.length) // [1, 2, 3, 4, 5, 6, 7, 8] 8 
	arr.push(9,10)
	console.log(arr,arr.length) // [1, 2, 3, 4, 5, 6, 7, 8] 8 
</script>
```
- pop()出栈

	- pop()方法从数组末尾移除最后一项，减少数组的长度，返回删除的项。
	
			<script type="text/javascript">
				var arr = [1,2,3,4,5,6,7,8]
				arr.pop()
				console.log(arr) // [1, 2, 3, 4, 5, 6, 7] 
				var item = arr.pop()
				console.log(item) // 7
			</script>

<a name="队列方法"></a>

### 队列方法

- shift() 

	- shift() 从数组头部删除一项并返回该值，同时数组长度减1
	
	
			<script type="text/javascript">
				var arr = [1,2,3,4,5,6,7,8]
				console.log(arr, arr.length) // [1, 2, 3, 4, 5, 6, 7, 8] 8 
				arr.shift()
				console.log(arr, arr.length) // [2, 3, 4, 5, 6, 7, 8] 7
				var item = arr.shift() 
				console.log(item) // 2
			</script>

- unshift()

	- unshift() 从数组头部增加任意项并返回数组的长度
	
			<script type="text/javascript">
				var arr = [1,2,3,4,5,6,7,8]
				console.log(arr, arr.length) // [1, 2, 3, 4, 5, 6, 7, 8] 8 
				arr.unshift(9,10)
				console.log(arr, arr.length) // [9,10,2, 3, 4, 5, 6, 7, 8] 10
			</script>
			
<a name="重排序方法"></a>

### 重排序方法

- reverse()

	- reverse()反转数组项的顺序
			
			<script type="text/javascript">
				var values = [1,2,6,4,5,9]
				values.reverse()
				console.log(values) // [9, 5, 4, 6, 2, 1] 
			</script>

- sort()

 	- sort()默认情况下，sort（）方法按升序排列数组项（从小到大），但是sort（）方法会调用每个数组项的toString（）转型方法，然后比较得到的字符串。
 	
 			<script type="text/javascript">
				var arr = [0, 1,5 ,10, 15]
				arr.sort()
				console.log(arr) // [0, 1, 10, 15, 5] 
			</script>
			
可见，这不是最佳方案。

那么就要使用简单的比较函数,将比较函数作为参数传递给sort（）方法即可

		<script type="text/javascript">
			function sortArray(a, b) {
				if (a < b) {
					return -1
				} else if (a > b) {
					return 1
				} else {
					return 0
				}
			}
			var arr = [0, 1,5 ,10, 15]
			console.log(arr.sort(sortArray)) // sortArray
		</script>
		
**最简便写法**

		<script type="text/javascript">
			function sortArray(a,b) {
				return a - b
			}
			var arr = [0, 1,5 ,10, 15]
			console.log(arr.sort(sortArray)) // [0, 1, 5, 10, 15]
		</script>

<a name="操作方法"></a>

### 操作方法

- concat()

	- concat()数组拼接，将接收到的参数添加到副本的末尾，返回新构建的数组
	
			<script type="text/javascript">
				var arr1 = [1,2,3]
				var arr2 = [4,5,6]
				var arr = arr1.concat(arr2)
				console.log(arr)// [1, 2, 3, 4, 5, 6] 
			</script>

- slice()

	- slice()接收一个或者两个参数，返回起始项和结束项。接收一个参数，slice（）返回从该参数指定的位置开始到末尾的所有项。如歌是两个参数，返回起始位置和结束位置，但是不包括结束位置的项。
	
**注意：slice（）方法不会影响原始数组**

如果方法中有负数，则用数组的长度加上负数参数来确定起始位置。

如果起始位置大于结束位置，返回一个空数组

		<script type="text/javascript">
			var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
			console.log(arr.slice(1)) // [2, 3, 4, 5, 6, 7, 8, 9]
			console.log(arr.slice(2,5)) // [3,4,5]
			console.log(arr.slice(-2, 7)) // []
			console.log(arr.slice(-7, 7)) //-7+9=2（起始位置为2） [3,4,5,6,7]
		</script>

- splice()是数组中最强大的方法，他有很多种用法，主要用来向数组中的中部插入项，但是这种方法的方式有3种

	- 删除
		- 可以删除任意数量的项，需要两个参数：要删除的第一项位置和要删除的项数
				
				var colors = ["red", "green", "yellow", "blue"]
				var removed = colors.splice(0,2)
				console.log(colors) // ["yellow", "blue"]
				console.log(removed)// ["red", "green]
	
	- 插入
		- 可以指定位置任意插入数量的项，只需提供3个参数：起始位置、0（要删除的项数）、要插入的项数
		
				var colors = ["red", "green", "yellow", "blue","pink","black"]
				// 从第2的位置开始插入字符串"1","2","3"
				var pushes = colors.splice(2,0, "1","2","3") 
				console.log(colors) // ["red,green,1,2,3,yellow,blue,pink,black"] 
				console.log(pushes)// [""]
	- 替换
	
		- 可以指定位置任意插入数量的项，只需提供3个参数：起始位置、（要删除的项数）、要插入的项数
				
				var colors = ["red", "green", "yellow", "blue","pink","black"]
				// 从第0个开始删除2个字符串，并插入字符串"1","2","3"
				var pushes = colors.splice(0,2, "1","2","3") 
				console.log(colors) // ["1", "2", "3", "yellow", "blue", "pink", "black"]  
				console.log(pushes)// [""]
				
<a name="位置方法"></a>

### 位置方法

这两个方法接收两个参数：要查找的项和（可选）表示起点位置的索引,返回要查找的项在数组中的位置

- indexOf() 方法

	- indexOf() 起始位置（0）向后查找,没有找到返回-1
	
			var numbers = [1,"blue",3,"red",5,6,7,8,9]
			console.log(numbers.indexOf(1)) // 0
			console.log(numbers.indexOf("blue")) // 1
			console.log(numbers.indexOf("red")) // 3
			console.log(numbers.indexOf(10)) // -1

- lastIndexOf() 数组末尾位置向前查找

	- lastIndexOf() 数组末尾位置向前查找
	
			var numbers = [1,"blue",3,"red",5,6,7,8,9]
			console.log(numbers.lastIndexOf("blue")) // 1
			
<a name="迭代方法"></a>

### 迭代方法

- fliter()
	- 利用指定的函数确定是否在返回数组包含某一项
		
			<script type="text/javascript">
				// 数组每项的值大于10
				var numbers = [1,15,3,20,5,6,14,8,9]
				var filterResult = numbers.filter(function(item, index, array) {
					return item > 10
				})
				console.log(filterResult) // 15,20,14
			
			</script>
			<script type="text/javascript">
				var numbers = [1,15,3,20,5,6,14,8,9]
				var filterResult = numbers.filter(function(item, index, array) {
					// 数组索引大于5
					return index > 5
				})
				console.log(filterResult) // 14,8,9
			</script>
			<script type="text/javascript">
				var numbers = [1,15,3,20,5,6,14,8,9]
				var filterResult = numbers.filter(function(item, index, array) {
					// 数组对象本身
					return array
				})
				console.log(filterResult) // 1,15,3,20,5,6,14,8,9
			</script>
			
- forEach()
	- 针对数组中每一项运行传入的函数，这个方法没有返回值，本质上与for循环迭代一样
	
### 练习

```javascript
//1.移除数组 arr[1, 2, 3, 4, 2] 中的2。不要直接修改数组 arr，结果返回新的数组
			var arr = [1, 2, 3, 4, 2]
			var arr1 = arr.filter(function(item) {
				if(item !== 2) {
					return item;
				}
			})
			console.log("原素组：" + arr, "移除2中的新数组：" + arr1)

			// 方法二,改变原数组（删除原数组时，长度会变化）
			for(var i = 0; i < arr.length; i++) {
				if(arr[i] == 2) {
					arr.splice(i, 1) // 删除
					i-- // 抵消后面的i++,下次循环依然是当前位置
				}
			}
			console.log(arr)
			//2.定义一个函数,能在数组 arr[1, 2, 3, 4, 2] 的 "2"后面添加元素 "Melon"。不要直接修改数组 arr，结果返回新的数组
			var arr2 = [1, 2, 3, 4, 2]
			var new_arr = []

			function insert(arr) { // 用的参数也是拷贝地址，修改数据时需要注意影响原数组
				for(var i = 0; i < arr.length; i++) {
					new_arr.push(arr[i])
					if(arr[i] == 2) {
						new_arr.push("Melon"); // 在2指定下的索引添加元素
					}
				}
				console.log(new_arr)
			}
			insert(arr2)
			//3.统计数组 arr[1, 2, 3, 4, 2] 中2出现的次数
			var time = 0;
			var arr3 = [1, 2, 3, 4, 2, 4]
			arr3.map(function(item) {
				if(item == 2) {
					return time++
				}
			})
			console.log("2出现的次数" + time + "次")

			// 方法二
			var time = 0;
			for(var i = 0; i < arr3.length; i++) {
				if(arr3[i] == 2) {
					time++
				}
			}
			console.log("2出现的次数" + time + "次")

			// 方法三

			//4.找出数组 arr[1, 2, 3, "melon", 4, "melon", 2, 4, "melon"] 中重复出现过的元素,并用数组将重复元素装起来输出
			var arr4 = [1, 2, 3, "melon", 4, "melon", 2, 4, "melon"]

			function repeatArr(arr) {
				var arr4_re = []
				arr.sort().sort(function(a, b) {
					// arr[0]与arr[1]作比较，相等就是重复元素
					if(a == b && arr4_re.indexOf(a) == -1) {
						arr4_re.push(a)
					}
				})
				return arr4_re;
			}
			console.log(repeatArr(arr4))

			// 方法二
//			var arr4 = [1, 2, 3, "melon", 4, "melon", 2, 4, "melon"]
//			function a() {
//				var new_arr = []
//				for(var i = 0; i < arr4.length; i++) {
//					for(var j = i + 1; i < arr4.length; j++) {
//						if(arr4[i] == arr4[j] && new_arr.indexOf(arr4[i]) == -1) {
//							new_arr.push(arr4[i])
//						}
//					}
//				}
//				console.log(new_arr)
//			}
//			a()
			//5.在arr里面输出年龄小于17的对象
			var arr5 = [{
					name: "111",
					sex: "boy",
					age: 18
				},
				{
					name: "222",
					sex: "girl",
					age: 17
				},
				{
					name: "333",
					sex: "boy",
					age: 16
				},
				{
					name: "444",
					sex: "girl",
					age: 15
				},
				{
					name: "555",
					sex: "boy",
					age: 20
				}
			]
			var arr5 = arr5.filter(function(item, index) {
				if(item.age < 17) {
					return item
				}
			})
			console.log(arr5)
```