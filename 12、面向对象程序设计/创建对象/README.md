### 工厂模式

```js
function createPerson(name, age, job) {
  var o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;
  o.sayName = function (){
    console.log(this.name);
  };
  return o
}
var person1 = createPerson('jenny', 18, '程序员');
var person2 = createPerson('jack', 20, '财务');
```
- 函 数 createPerson() 能 够 根 据 接 受 的 参 数 来 构 建 一 个 包 含 所 有 必 要 信 息 的 Person 对 象。 可 以 无 数 次 地 调 用 这 个 函 数， 而 每 次 它 都 会 返 回 一 个 包 含 三 个 属 性 一 个 方 法 的 对 象。 工 厂 模 式 虽 然 解 决 了 创 建 多 个 相 似 对 象 的 问 题， 但 却 没 有 解 决 对 象 识 别 的 问 题（ 即 怎 样 知 道 一 个 对 象 的 类 型）。 随 着 JavaScript 的 发 展， 又 一 个 新 模 式 出 现 了。

### 构造函数模式
```js
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function() {
    console.log(this.name);
  }
}
var person3 = new Person('jenny', 18, '程序员');
var person4 = new Person('jack', 20, '财务');
person3.constructor == Person // true
person3 instanceof Object // true
person3 instanceof Person // true
```
- 可以看出
- > 没 有 显 式 地 创 建 对 象； 
- >直 接 将 属 性 和 方 法 赋 给 了 this 对 象； 
- >没 有 return 语 句。

- 此 外， 还 应 该 注 意 到 函 数 名 Person 使 用 的 是 大 写 字 母 P 。按 照 惯 例， 构 造 函 数 始 终 都 应 该 以 一 个 大 写 字 母 开 头， 而 非 构 造 函 数 则 应 该 以 一 个 小 写 字 母 开 头。 这 个 做 法 借 鉴 自 其 他 OO 语 言， 主 要 是 为 了 区 别 于 ECMAScript 中 的 其 他 函 数； 因 为 构 造 函 数 本 身 也 是 函 数， 只 不 过 可 以 用 来 创 建 对 象 而 已。 

**要 创 建 Person 的 新 实 例， 必 须 使 用 new 操 作 符。 以 这 种 方 式 调 用 构 造 函 数 实 际 上 会 经 历 以 下 4 个 步 骤：**

- 1、创建一个新对象，
- 2、将构造函数的作用域赋值给新对象（this指向这个新对象）
- 3、执行构造函数中的代码
- 4、返回新对象

- constructor最初用来标志对象类型，但instanceof检测对象类型更可靠。

### 将构造函数当做函数

```js
// 当做构造函数使用
  var person5 = new Person('jenny', 18, '程序员');
  person5.sayName();

  // 作为普通函数调用
  Person('nihao', 22, '运营')
  window.sayName() // 'nihao'
  // 在另一个对象中调用
  var obj4 = {}
  Person.call(obj4, "hello", 23, '销售')
  Person.apply(obj4, ["hello", 23, '销售'])
  obj4.sayName()// hello
```

- 构造函数缺陷

```js
person3.sayName == person4.sayName // false
```

### 原型模式
- 我 们 创 建 的 每 个 函 数 都 有 一 个 prototype （原 型） 属 性， 这 个 属 性 是 一 个 指 针， 指 向 一 个 对 象， 而 这 个 对 象 的 用 途 是 包 含 可 以 由 特 定 类 型 的 所 有 实 例 共 享 的 属 性 和 方 法。 如 果 按 照 字 面 意 思 来 理 解， 那 么 prototype 就 是 通 过 调 用 构 造 函 数 而 创 建 的 那 个 对 象 实 例 的 原 型 对 象。 使 用 原 型 对 象 的 好 处 是 可 以 让 所 有 对 象 实 例 共 享 它 所 包 含 的 属 性 和 方 法。 换 句 话 说， 不 必 在 构 造 函 数 中 定 义 对 象 实 例 的 信 息， 而 是 可 以 将 这 些 信 息 直 接 添 加 到 原 型 对 象 中， 如 下 面 的 例 子 所 示。
```js
// 原型模式
  function Person1() {}
  Person1.prototype.name = 'backPok';
  Person1.prototype.age = '23'
  Person1.prototype.job = '飞行员';
  Person1.prototype.sayName = function() {
    console.log(this.name)
  }
  var person6 = new Person1();
  var person7 = new Person1();
  person6.name == person7.name // true
```
![JavaScript原型.png](http://edu.bluej.cn/public/uploads/JavaScript原型.png)


