### AJAX数据交互和跨域方式

AJAX不是JavaScript的规范，它只是一个哥们“发明”的缩写：Asynchronous JavaScript and XML，意思就是用JavaScript执行异步网络请求。

如果仔细观察一个Form的提交，你就会发现，一旦用户点击“Submit”按钮，表
单开始提交，浏览器就会刷新页面，然后在新页面里告诉你操作是成功了还是失败了。
如果不幸由于网络太慢或者其他原因，就会得到一个404页面。

这就是Web的运作原理：一次HTTP请求对应一个页面。

如果要让用户留在当前页面中，同时发出新的HTTP请求，就必须用JavaScript发送这个新请求，
接收到数据后，再用JavaScript更新页面，这样一来，用户就感觉自己仍然停留在当前页面，
但是数据却可以不断地更新。

最早大规模使用AJAX的就是Gmail，Gmail的页面在首次加载后，剩下的所有数据都依赖于
AJAX来更新。

用JavaScript写一个完整的AJAX代码并不复杂，但是需要注意：AJAX请求是异步执行的，
也就是说，要通过回调函数获得响应。

在现代浏览器上写AJAX主要依靠XMLHttpRequest对象：

具体来说，AJAX 包括以下几个步骤。

- 1、创建 XMLHttpRequest 实例
- 2、发出 HTTP 请求
- 3、接收服务器传回的数据
- 4、更新网页数据

```javascript
var url_get = "https://www.easy-mock.com/mock/5a91126f9d9af46407651597/test/test_get?num=10";
var url_post = "https://www.easy-mock.com/mock/5a91126f9d9af46407651597/test/test_post";
// 1、创建XMLhttp请求对象
var xhr = new XMLHttpRequest();
// 2、设置请求的方式
xhr.open("get", url_get);
// 监听状态值的改变
xhr.addEventListener("readystatechange", function(e) {
	// 状态值： 4 代表数据解析完成
	// 状态码 ： 200表示请求成功
	if(e.target.readyState == 4 && e.target.status == 200) {
		console.log(e.target.readyState)
		console.log(e)
		console.log(JSON.parse(e.target.responseText)) // 返回一个对象
	}
})
// 发送请求  	post请求 xhr.send("name=haha&age=12");
xhr.send();

// 回调函数
var baseUrl = "https://www.easy-mock.com/mock/5bed3df093d15a3354f97694/test";
var test_get = baseUrl + "/test_get"; // 基础路径 + 接口地址

ajax_get(test_get, function(e) {
	if(e.target.readyState == 4 && e.target.status == 200) {
		var res = JSON.parse(e.target.responseText)
		console.log(res)
	}
})

function ajax_get(url, callback) {
	var xhr;
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {
		// ie
		xhr = new ActiveXObject('Microsoft.XMLHTTP');
	}
	xhr.open("get", url);
	xhr.addEventListener('readystatechange',callback)
	xhr.send();
}
```
- 如果需要兼容IE浏览器

```javascript
var request;
if (window.XMLHttpRequest) {
    request = new XMLHttpRequest();
} else {
    request = new ActiveXObject('Microsoft.XMLHTTP');
}
```

### XMLHttpRequest 的实例属性
##### XMLHttpRequest.readyState
- XMLHttpRequest.readyState返回一个整数，表示实例对象的当前状态。该属性只读。它可能返回以下值。

- 0，表示 XMLHttpRequest 实例已经生成，但是实例的open()方法还没有被调用。

- 1，表示open()方法已经调用，但是实例的send()方法还没有调用，仍然可以使用实例的setRequestHeader()方法，设定 HTTP 请求的头信息。

- 2，表示实例的send()方法已经调用，并且服务器返回的头信息和状态码已经收到。

- 3，表示正在接收服务器传来的数据体（body 部分）。这时，如果实例的responseType属性等于text或者空字符串，responseText属性就会包含已经收到的部分信息。

- 4，表示服务器返回的数据已经完全接收，或者本次接收已经失败。

> 通信过程中，每当实例对象发生状态变化，它的readyState属性的值就会改变。这个值每一次变化，都会触发readyStateChange事件。

```javascript
var xhr = new XMLHttpRequest();

if (xhr.readyState === 4) {
  // 请求结束，处理服务器返回的数据
} else {
  // 显示提示“加载中……”
}
```

### XMLHttpRequest.onreadystatechange

XMLHttpRequest.onreadystatechange属性指向一个监听函数。readystatechange事件发生时（实例的readyState属性变化），就会执行这个属性。

另外，如果使用实例的abort()方法，终止 XMLHttpRequest 请求，也会造成readyState属性变化，导致调用XMLHttpRequest.onreadystatechange属性。

下面是一个例子。

```javascript
var xhr = new XMLHttpRequest();
xhr.open( 'GET', 'http://example.com' , true );
xhr.onreadystatechange = function () {
  if (xhr.readyState !== 4 || xhr.status !== 200) {
    return;
  }
  console.log(xhr.responseText);
};
xhr.send();
```

### XMLHttpRequest.response

- XMLHttpRequest.response属性表示服务器返回的数据体（即 HTTP 回应的 body 部分）。它可能是任何数据类型，比如字符串、对象、二进制对象等等，具体的类型由XMLHttpRequest.responseType属性决定。该属性只读。

如果本次请求没有成功或者数据不完整，该属性等于null。但是，如果responseType属性等于text或空字符串，在请求没有结束之前（readyState等于3的阶段），response属性包含服务器已经返回的部分数据。

		var xhr = new XMLHttpRequest();
		
		xhr.onreadystatechange = function () {
		  if (xhr.readyState === 4) {
		    handler(xhr.response);
		  }
		}

### XMLHttpRequest.responseText

- XMLHttpRequest.responseText属性返回从服务器接收到的字符串，该属性为只读。只有 HTTP 请求完成接收以后，该属性才会包含完整的数据。

		var xhr = new XMLHttpRequest();
		xhr.open('GET', '/server', true);
		
		xhr.responseType = 'text';
		xhr.onload = function () {
		  if (xhr.readyState === 4 && xhr.status === 200) {
		    console.log(xhr.responseText);
		  }
		};
		
		xhr.send(null);
		
### XMLHttpRequest 的实例方法
#### XMLHttpRequest.open()

- XMLHttpRequest.open()方法用于指定 HTTP 请求的参数，或者说初始化 XMLHttpRequest 实例对象。它一共可以接受五个参数。

		void open(
		   string method,
		   string url,
		   optional boolean async,
		   optional string user,
		   optional string password
		);
		
- method：表示 HTTP 动词方法，比如GET、POST、PUT、DELETE、HEAD等。

- url: 表示请求发送目标 URL。

- async: 布尔值，表示请求是否为异步，默认为true。如果设为false，则send()方法只有等到收到服务器返回了结果，才会进行下一步操作。该参数可选。由于同步 AJAX 请求会造成浏览器失去响应，许多浏览器已经禁止在主线程使用，只允许 Worker 里面使用。所以，这个参数轻易不应该设为false。

- user：表示用于认证的用户名，默认为空字符串。该参数可选。

- password：表示用于认证的密码，默认为空字符串。该参数可选。

**注意，如果对使用过open()方法的 AJAX 请求，再次使用这个方法，等同于调用abort()，即终止请求。**

下面发送 POST 请求的例子。

		var xhr = new XMLHttpRequest();
		xhr.open('POST', encodeURI('someURL'));		

#### XMLHttpRequest.send()
- XMLHttpRequest.send()方法用于实际发出 HTTP 请求。它的参数是可选的，如果不带参数，就表示 HTTP 请求只包含头信息，也就是只有一个 URL，典型例子就是 GET 请求；如果带有参数，就表示除了头信息，还带有包含具体数据的信息体，典型例子就是 POST 请求。

* 下面是 GET 请求的例子。

```javascript
var xhr = new XMLHttpRequest();
xhr.open('GET',
  'http://www.example.com/?id=' + encodeURIComponent(id),
  true
);
xhr.send(null);

// 等同于
var data = 'id=' + encodeURIComponent(id);
xhr.open('GET', 'http://www.example.com', true);
xhr.send(data);

```
上面代码中，GET请求的参数，可以作为查询字符串附加在 URL 后面，也可以作为send方法的参数。

下面是发送 POST 请求的例子。
```javascript
var xhr = new XMLHttpRequest();
var data = 'email='
  + encodeURIComponent(email)
  + '&password='
  + encodeURIComponent(password);

xhr.open('POST', 'http://www.example.com', true);
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xhr.send(data);
```
注意，所有 XMLHttpRequest 的监听事件，都必须在send()方法调用之前设定。

send方法的参数就是发送的数据。多种格式的数据，都可以作为它的参数。

			void send();
			void send(ArrayBufferView data);
			void send(Blob data);
			void send(Document data);
			void send(String data);
			void send(FormData data);
			
如果发送 DOM 对象，在发送之前，数据会先被串行化。发送二进制数据，最好使用ArrayBufferView或Blob对象，这使得通过 Ajax 上传文件成为可能。

通过检测window对象是否有XMLHttpRequest属性来确定浏览器是否支持标准的XMLHttpRequest。注意，不要根据浏览器的navigator.userAgent来检测浏览器是否支持某个JavaScript特性，一是因为这个字符串本身可以伪造，二是通过IE版本判断JavaScript特性将非常复杂。

当创建了XMLHttpRequest对象后，要先设置onreadystatechange的回调函数。在回调函数中，通常我们只需通过readyState === 4判断请求是否完成，如果已完成，再根据status === 200判断是否是一个成功的响应。

XMLHttpRequest对象的open()方法有3个参数，第一个参数指定是GET还是POST，第二个参数指定URL地址，第三个参数指定是否使用异步，默认是true，所以不用写。

注意，千万不要把第三个参数指定为false，否则浏览器将停止响应，直到AJAX请求完成。如果这个请求耗时10秒，那么10秒内你会发现浏览器处于“假死”状态。

最后调用send()方法才真正发送请求。GET请求不需要参数，POST请求需要把body部分以字符串或者FormData对象传进去。

## 跨域

### 同源政策

- 所谓同源指的是“三个相同”

	- 协议相同

	- 域名相同

	- 端口相同
	
```javascript
举例来说，http://www.example.com/dir/page.html这个网址，协议是http://，域名是www.example.com，端口是80（默认端口可以省略），它的同源情况如下。

http://www.example.com/dir2/other.html：同源
http://example.com/dir/other.html：不同源（域名不同）
http://v2.www.example.com/dir/other.html：不同源（域名不同）
http://www.example.com:81/dir/other.html：不同源（端口不同）
https://www.example.com/dir/page.html：不同源（协议不同）
```
#### 同源政策的目的

- 是为了保证用户信息的安全，防止恶意的网站窃取数据。

> 设想这样一种情况：A 网站是一家银行，用户登录以后，A 网站在用户的机器上设置了一个 Cookie，包含了一些隐私信息（比如存款总额）。用户离开 A 网站以后，又去访问 B 网站，如果没有同源限制，B 网站可以读取 A 网站的 Cookie，那么隐私信息就会泄漏。更可怕的是，Cookie 往往用来保存用户的登录状态，如果用户没有退出登录，其他网站就可以冒充用户，为所欲为。因为浏览器同时还规定，提交表单不受同源政策的限制。

- 由此可见，同源政策是必需的，否则 Cookie 可以共享，互联网就毫无安全可言了。

#### jsonp跨域

- jsonp （只能get请求）前端动态添加script。 后端也要响应处理

```javascript
var url_jsonp = "http://suggest.taobao.com/sug?code=utf-8&q=鼠标&callback=cb";
			
var script = document.createElement("script");
// 加载资源
script.src = url_jsonp;
document.body.appendChild(script);

// 回调函数
function cb(e) {
	console.log(e)
}
// 返回的是一串代码cb( 数据 )

cb({result: [["鼠标垫", "771666"]})
			
```





















