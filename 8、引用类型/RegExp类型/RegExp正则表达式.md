## 正则表达式

ECMAscript通过regexp类型来支持正则表达式。

- 创建
- 元字符
- 修饰符
- 属性
- 方法

创建一个表达式如下：

		var expression = / pattern / flags(标志)
		
- pattern 可以包含任何简单或复杂的正则表达式，包括字符类、限定符、分组、向前查找以及反向引用。

- flags  标明正则表达式的行为
	
	- g 表示全局匹配
	
	- i 不区分大小写
	
	- m 表示多行模式

### 元字符

- 单个字符数字
	- 			. 匹配除了以换行符以外的任意字符
	- 			[a-zA-Z0-9]与[^a-zA-Z0-9]匹配方括号任意字符，^表示匹配不包括方括号的字符
	- 			\d 与 \D 匹配数字和匹配非数字
	- 			\w 与 \W 匹配所有的字母数字下划线[a-zA-Z0-9_], \W与之相反

- 空白符
	- \O		匹配null字符
	- \b		匹配空格字符
	- \f		匹配换页符
	- \n		匹配换行符
	- \r		匹配回车符
	- \s 和 \S	匹配空白字符，空格、制表符或换行符。大写的S是匹配非空字符
	- \t		匹配制表符

- 定位符
	- ^         行首匹配
	- $			行尾匹配
	- \A		只匹配字符串的开始处
	
- 限定符
	- x?		匹配0个或一个x
	- x*		匹配0个或者任意多个x
	- x+		匹配一个或者多个
	- x{m,n}	匹配m-n个x；

- 分组
	- (?:x)		匹配x但不记录匹配结果（匹配不捕获）
	- x(?=y)		当x后面接y时匹配x
	- x(?!y)		当x后不是y时匹配x
	
- 引用
	- \1...\9	$1...$9		返回就割在模式匹配期间找到的，最近保存的部分
	
- 或模式
	- x|y|z		匹配x或者y或者z
	

### 属性

- 实例属性
	- global			布尔值，检测是走设置g标记
	- ignoreCase		布尔值，检测是否设置i标记
	- nultiline		布尔值，检测是否设置了m标记
	- lastIndex		整数，表示开始搜索下一个匹配项的字符位置，从 0 算起。
	- source			返回正则表达式的字符串表示,按照字面量形式而非传入构造函数中的字符串模式返回。
	

通过这些属性可以获知一个正则表达式的各方面信息，但却没有多大用处，因为这些信息全都包含在模式声明中

    var pattern1 = /\[bc\]at/i;
    console.log(pattern1.global); //false
    console.log(pattern1.ignoreCase); //true
    console.log(pattern1.multiline); //false
    console.log(pattern1.lastIndex); //0
    console.log(pattern1.source); //"\[bc\]at"
    var pattern2 = new RegExp("\\[bc\\]at", "i");
    console.log(pattern2.global); //false
    console.log(pattern2.ignoreCase); //true
    console.log(pattern2.multiline); //false
    console.log(pattern2.lastIndex); //0
    console.log(pattern2.source); //"\[bc\]at"

尽管第一个模式使用的是字面量，第二个模式使用了 RegExp 构造函数，但它们的source 属性是相同的。可见， source 属性保存的是规范形式的字符串，即字面量形式所用的字符串

- 构造函数属性
	- $_		input	返回最近一次匹配的字符串
	- $&		lastMatch	返回最近一次的匹配项
	- $+		lastParen	返回最近一次匹配的捕获组
	- $`		leftContext	返回被查找的字符串中从字符串开始位置到最后匹配之前的位置之间的字符
	- $'		rightContext	返回被搜索的字符串中从最后一个匹配位置开始到字符串结尾之间的字符
	- $*		multiline		检测表达式是否采用多行匹配m
	
- 实列方法
	- test  在该字符串中检测模式匹配，返回true或者false
		- 接收一个字符串参数，该方法常用于if语句中
			
			
					<script type="text/javascript">
						var text = "cat, bat, sat, fat";
						var pattern = /cat/g
						var pattern1 = /ca1t/g
						console.log(pattern.test(text)) // true
						console.log(pattern.test(text)) // false
					</script>
					<script type="text/javascript">
						var text1 = "000-00-0000"
						var pattern2 = /\d{3} - \d{2} - \d{4}/;
						if (pattern2.test(text1)) {
							alert("the pattern2 was matched")
						}
					</script>
	- exec  该方法专门为捕获组而设计的
		- 功能： 正则捕获的数据，一个数组；
		- 参数：	要应用模式匹配的字符串
		- 特性：
			- 使用全局标记g；持续查找所有匹配项并返回
			- 不使用全局标记g；始终返回第一个匹配项信息
		- 执行的过程
			- 检测字符串参数，获取正则表达式匹配文本
			- 找到匹配文本则返回一个数组
				- 第0个元素：与整个模式匹配的字符串
				- 其他元素：与捕获组匹配的字符串
			- 否则返回null
			
		- 派生属性
			- index		匹配项在字符串中的位置
			- input		应用正则表达式的字符串
			- length		返回数组元素的个数
			
						<script type="text/javascript">
							var text = "mom and dad and baby"
							var pattern = /mom (and dad (and baby)?)?/gi
							var matctes = pattern.exec(text)
							// index		匹配项在字符串中的位置
							console.log(matctes.index) // 0
							console.log(matctes.input) // "mom and dad and baby"
							console.log(matctes[0])// "mom and dad and baby"
							console.log(matctes[1])//  and dad and baby
							console.log(matctes[2]) // and baby
						</script>
						

对于exec（）而言，即使模式中使用了全局标志g，她每次也只会返回一个匹配项，在不设置全局标志下，每次调用exec则都会在字符串中继续查找心得匹配项

		<script type="text/javascript">
			// 全局模式和非全局模式，exec（）返回的字符串不一样
			var text = "cat, bat, sat, fat";
			var pattern = /.at/;
			var str = pattern.exec(text)
			console.log(str.index) // 0
			console.log(str[0]) // cat
			console.log(str[1]) // undefined
			console.log(pattern.lastIndex)// 0
			
			var pattern2 = /.at/g;
			var str = pattern2.exec(text)
			console.log(str.index) // 0
			console.log(str[0]) // cat
			console.log(pattern2.lastIndex)// 3
			
			str2 = pattern2.exec(text)
			console.log(str2.index)// 5
			console.log(str2[0])// bat
			console.log(pattern2.lastIndex)// 8
		</script>
		
第一个模式 pattern1 不是全局模式，因此每次调用 exec() 返回的都是第一个匹配项（ "cat" ）。而第二个模式 pattern2 是全局模式，因此每次调用 exec() 都会返回字符串中的下一个匹配项，直至搜索到字符串末尾为止。此外，还应该注意模式的 lastIndex 属性的变化情况。在全局匹配模式下， lastIndex 的值在每次调用 exec() 后都会增加，而在非全局模式下则始终保持不变。\
