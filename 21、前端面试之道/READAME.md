# css

- [css盒子模型](#css盒子模型)
- [BFC](#BFC)
- [布局居中](#布局居中)

# css盒子模型

css盒子模型规定元素的处理： `包含content，padding，margin，border`

分为两种： IE盒模型，标准盒模型

IE： `content`（内容区域）+ `padding` + `border`

标准盒模型： `content`（内容区域）+ `padding` + `border` +`margin`

# BFC

**块级格式上下文** ，是一个独立的渲染区域，让处于BFC的内部元素与外部元素互相隔离，使内部元素的定位不收影响。

> ie下为layout。可以通过zoom: 1 触发

- 触发条件

  - 根元素
  - `position: absolute/fixed`
  - `display: inline-block / table`
  - `float` 元素
  - `overflow !== visible`

- 应用
  - 阻止margin重叠
  - 清除内部浮动元素
  - 自适应两栏布局
  - 可以阻止元素被浮动元素覆盖

```html
<div class="header">
  <ul>
    <li>首页</li>
    <li>新闻</li>
    <li>关于</li>
    <li>更多</li>
  </ul>
  <div class="box"></div>
  <div class="box fr"></div>
  <div class="clear"></div>
</div>
```

- 清浮动三种方法
  - 参css伪类清浮动

```css
*{
  margin: 0;
  padding: 0;
  list-style: none;
}
.header {
  background-color: skyblue;
  border: 9px solid #ccc;
}
.box {
  height: 50px;
  width: 50px;
  background-color: rgb(31, 72, 88);
  float: left;
}
ul::after {
  /* 方法一： 伪类清除浮动 */
  content: '';
  display: block;
  line-height: 0;
  height: 0;
  clear: both;
  visibility: hidden;
}
ul {
  zoom: 1; /*ie*/
}
```

  - 容器加上 overflow: hidden;

```css
ul {
  /* 方法二 容器加上 overflow: hidden; */
  overflow: hidden; 
}
```
  - 在浮动元素在添加一个空的div标签 css: clear: both;
```css
.clear {
  /* 方法三 在浮动元素在添加一个空的div标签 css: clear: both; */
  clear: both;
}
.fr {
  float: right;
}
```

# 布局居中

- 水平居中
  - 行内元素： `text-align:center;`
  - 块级元素： `margin: 0 auto;`
  - `position: absolute;transform: translateX(-50%);left: 50%;`
  - `display: flex;justify-content: center;`

- 垂直居中
  - `position: absolute;transform: translateY(-50%);top: 50%;`
  - `display: flex;align-items: center;`

- 水平垂直居中
  - `absolute + transform`
    `flex + justify-content + align-items`

