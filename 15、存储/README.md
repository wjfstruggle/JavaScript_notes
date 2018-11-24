### 

```js
	function getQueryString(name) {
		//  获取URL的参数	 ?key = 123&name='jack'
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
		var r = window.location.search.substr(1).match(reg);
		if(r != null) {
			return unescape(r[2]);
		}
		return null;
	}
	
	function getCookie(name) {
		var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");　　
		return(arr = document.cookie.match(reg)) ? unescape(arr[2]) : null;
	}
```