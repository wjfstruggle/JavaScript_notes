###测试1

选择题:		

	1.用户输入数值n后需要转为Number类型，以下错误的是？ (C)			
		
		(A).parseInt(n) (B).Number(n) (C)．n+ (D). +n
		
	2.下面哪一个不是 JavaScript 的保留字？ (C)
		
		(A).goto (B).super (C)．array (D).abstract 
		
	3.下面哪一个是JSON数据？ 	(B)
		(A).{name:"xiaoming",age,"student"}
		
		(B).{"name":"xiaoming","age":"student"}
		
		(C).{"xiaoming","student"}
		
		(D).["xiaoming","student"]
	
	
	
	4.下面哪种方式不能改变作用域链？  (A)
		(A).while (B).try catch (C)．eval  (D)以上都不是
	
	5.以下哪一条Javascript语句会产生运行错误？ (C)
		(A).var obj=[ ];
		(B).var obj={ };
		(C).var obj=( );
		
	6.以下代码是输出结果是: 		(C)				
		console.log(1+ "2"+"2"); 
		console.log(1+ +"2"+"2");  
		console.log("A"- "B"+"2"); 
		console.log("A"- "B"+2); 
		
		(A).122
			122
			NaN
			NaN
		
		(B).122
			32
			NaN
			NaN2
		
		(C).122
			32
			NaN2
			NaN
		
		(D).122
			32
			NaN2
			NaN2
	
	7.以下代码运行的结果是？ (D)
		console.log(ab);  
		var ab = "var";   
		console.log(ab);  
		let ab = "let";
		console.log(ab);
		
		(A). null "var" "let"
		(B). undefiend "var" "let"
		(C). "let" "let" "let"
		(D). 以上都不是
		
	8.不能在switch内使用的语句？ (D)
		
		(A). case
		(B). continue
		(C). break
		(D). return
	
	9.循环for(var i=0;i<9;i++)运行后，运行console.log(i)的值是？(A)

		(A). 9
		(B). 10
		(C). undefined
		(D). 以上都不是
	
	10.循环for(let i=0;i<9;i++)运行后，运行console.log(i)的值是？(D)
		
		(A). 9
		(B). 10
		(C). undefined
		(D). 以上都不是

问答题：
	1.浏览器端的JavaScript包括哪几个部分?		
	
	
	2.JavaScript有哪些基本类型?			
	
	
	3.简单概括null和undefined两者的区别；		
	
	
	4.JavaScript的typeof返回哪些数据类型？		
	
	
	5.例举3种强制类型转换和2种隐式类型转换?		
	
	
	
	
编程题：
	1.用代码实现一个8*8的棋盘；

	2.用代码实现以下功能：找出数组[2,5,3,4,5,9,4,5]中的重复的数字的重复次数（两个相同数字为一次）
	
	3.冒泡排序
	
	
	4.用JavaScript实现鼠标三击功能
			//提示
			/* 
			 * 
			var div = document.getElementById('div');
			div.addEventListener("mousedown",function(){
				alert("鼠标左键点下去触发")
			})
			div.addEventListener("mouseup",function(){ 
				alert("鼠标左键弹上来时触发")
			})
			*/