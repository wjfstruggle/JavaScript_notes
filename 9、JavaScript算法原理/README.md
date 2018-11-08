### JavaScript算法原理

- 冒泡排序
- 递归
- 快速排序

#### 冒泡排序

- 以数组为例

- var arr = [3,55,2,57,66,44,78]

> 原理：

![](http://i.imgur.com/sSwJFV2.gif)

算法步骤：

- 1）比较相邻的元素。如果第一个比第二个大，就交换他们两个。
- 2）对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对。这步做完后，最后的元素会是最大的数。
- 3）针对所有的元素重复以上的步骤，除了最后一个。
- 4）持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较。

```JavaScript
第0次开始循环比较后者
 	1: 3 -- >55 比较      		  [3,55,2,57,66,44,78]
 	2: 3 -- >2比较        交换位置   [2,55,3,57,66,44,78]
 	3: 3 -- >57比较          [2,55,3,57,66,44,78]
 	4: 3 -- >66比较          [2,55,3,57,66,44,78]
 	5: 3 -- >44比较          [2,55,3,57,66,44,78]
 	6: 3 -- >78比较          [2,55,3,57,66,44,78]
 	
第1次开始循环比较后者
 	2: 55 -- >3 比较      交换位置[2,3,55,57,66,44,78]
 	3: 55 -- >57比较        [2,3,55,57,66,44,78]
 	4: 55 -- >66比较          
 	5: 55 -- >44比较          交换位置[2,3,44,57,66,55,78]
 	6: 3 -- >78比较
 	
第2次开始循环比较后者
 	3: 44 -- >57 比较      [2,3,44,57,66,55,78]
 	4: 44 -- >66比较       
 	5: 44 -- >55比较          
 	6: 44 -- >78比较        
依次类推。
```
**列子1**
```JavaScript

	var arr = [3, 55, 2, 57, 66, 44, 78]
	var temp;
	for(var i = 0; i < arr.length; i++) {
		for(var j = i + 1; j < arr.length; j++) {
			// 判断大小
			if(arr[i] > arr[j]) {
				// 交换位置
				temp = arr[i];
				arr[i] = arr[j]
				arr[j] = temp;
			}
		}
	}

```

**列子2**	
```javascrpt
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
			var temp;
			for(var i = 0; i < arr5.length; i++) {
				for(var j = i + 1; j < arr5.length; j++) {
					if(arr5[i].age > arr5[j].age) {
						temp = arr5[i].age;
						arr5[i].age = arr5[j].age
						arr5[j].age = temp;
					}
				}
			}
			console.log(arr5)
```
#### 递归

- 每一次调用自身时都会开辟一块新的内存用来保存之前函数中的值并压入栈中，所以说这里你可以看成是另一个新的函数在运行，新函数中的各种值、变量等等都跟调用之前的函数没什么关系，虽然它调用的就是它自己。（当然了，如果上一个函数需要新函数的return值，那还是有点关系的）

**递归就是调用自身函数**

> 来看看几个列子

```JavaScript
	// 小明去存1000钱，每天会产生1%的利息，求问，30天后，小明可以拿回多少钱
			
	function digui(day) {
		// 第一天的钱
		if (day == 0) {
			return 1000;
		}
		// 每一天的钱 = money * 1.01
		// 规律： 调用前一项来运算
		return digui(day - 1) * 1.01;
	}
	digui(30);

```

```javascript
//小明题目升级版，小明拿着1000块在周一买入基金，一开户立给10块红利，逢周六日没有利息，平时利息为1%，请问30天后，小明可以拿回多少钱？
// 递归方法
			
function digui(day) {
		if (day == 0) {
			return 1010;
		}
		 // 除去周六和周日
		if (day % 7 == 6 || day % 7 == 0) {
			return digui(day - 1);
		}
		return digui(day - 1) * 1.01;
	}
	console.log(digui(30));

```

```javascript
// 有雌雄一对兔子，假定过两个月后可繁殖一对雌雄兔子，问过n个月后共有多少只兔子。
			/*
			 月数             对数               
			 1       1
			 2       2     1老1新
			 3       2	  
			 4       4	   2老2新
			 5       4     
			 6       8     4老4新
			 7       8
			 8       16    8老8新
			 * 
			 * */
	function numDigui(n) {
		if (n == 1) {
			return 1;
		}
		// 奇数月
		if (n % 2 !== 0){
			return numDigui(n -1)
		} else {
			// 偶数月
			return numDigui(n- 1) * 2
		}
	}
	numDigui(1)
```

### 快速排序

- 基本思想：

	-  1、先找一个成员作为基准
	-  2、基准和其他成员比较，小的放左边，大的放右边
	-  3、将左右两边的数据集合重复步骤1和步骤2，直到数据集合会只有一个值为止。
	
![](http://i.imgur.com/dERn9JJ.gif)

```javascript
// 以12为基准
var arr = [10, 14, 8, 12, 5, 6, 17]

第一次排序     [10,8,5,6]  12  [14,17]

// 以8为基准
第二次 排序   [5,6,10]  8 [12,14,17]

// 直到数据集合会只有一个值为止。
```

- 列子
```javascript
var arr = [10, 14, 8, 12, 5, 6, 17]
	function quickSort(arr) {
		if(arr.length <= 1) {
			return arr;
		}
		var left = []; // 左右两个空数组
		var right = [];
		// 确定基准  步骤一：取中间的元素作为基准，并且取整
		var markIndex = Math.floor(arr.length / 2)
		// 先把基准删除，后续再用数组方法拼接回来
		var mark = arr.splice(markIndex, 1)[0]
		//console.log(mark)//12
		for(var i = 0; i < arr.length; i++) {
			// 判断12与和其他成员比较，小的放左边，大的放右边
			if(mark > arr[i]) {
			// 小的放左边
				left.push(arr[i]);
			} else {
			// 大的放右边
				right.push(arr[i]);
			}
		}
		// 通过递归，继续排序
		// 左边的数组 + 基准 + 右边的数组
		return quickSort(left).concat(mark, quickSort(right));
	}
	console.log(quickSort(arr));
```