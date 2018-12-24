window.onload = function() {
	var banner = document.getElementsByClassName("banner")[0];
	var li = document.getElementsByTagName("li");
	var leftBtn = document.querySelector(".leftBtn");
	var rightBtn = document.querySelector(".rightBtn");

	// 每个图片的宽度
	var li_width = li[0].offsetWidth;
	// 索引值
	var index = 0;
	// 添加点击事件
	var timer = null; //定时器
	rightBtn.addEventListener("click", next_banner);
	
	leftBtn.addEventListener("click", prev_banner);

	function next_banner() {
		index++;
		// 长度超过图片数量，返回第一张图。
		if(index >= li.length) {
			index = 0;
		}
		banner.style.left = -li_width * index + "px"
	}

	function prev_banner() {
		index--;
		// 长度超过图片数量，返回第一张图。
		if(index <= -li.length) {
			index = 0;
		}
		banner.style.left = li_width * index + "px"
		console.log(index,banner.style.left)
	}
	// 自动轮播
	function autoPlay() {
		timer = setInterval(next_banner, 3000)
	}
	// 鼠标经过事件，停止轮播
	banner.onmouseover = function() {
		clearInterval(timer)
	}
	// 鼠标离开。自动开启轮播
	banner.onmouseleave = function() {
		autoPlay();
	}
	// 缓冲函数
}