### 原型链

- 每个构造函数都有一个原型对象，原型对象包含一个指向构造函数的指针，而实列都包含一个指向原型对象的指针，从继承角度来说，让原型对象等于另一个类型的实列，此时的原型对象包 含 一 个 指 向 另 一 个 原 型 的 指 针， 相 应 地， 另 一 个 原 型 中 也 包 含 着 一 个 指 向 另 一 个 构 造 函 数 的 指 针。 假 如 另 一 个 原 型 又 是 另 一 个 类 型 的 实 例， 那 么 上 述 关 系 依 然 成 立， 如 此 层 层 递 进， 就 构 成 了 实 例 与 原 型 的 链 条。 这 就 是 所 谓 原 型 链 的 基 本 概 念。

```js
 function SuperType() {
      this.property = true
    }
    SuperType.prototype.getSuperValue = function() {
      return this.property
    }
    function SubType() {
      this.subproperty = false
    }
    // 继承
    SubType.prototype = new SuperType();

    SubType.prototype.getSubValue = function() {
      return this.subproperty
    }

    var instance = new SubType();
    instance.getSuperValue(); // true
    SubType.prototype.__proto__ == SuperType.prototype // true
    instance.constructor == SuperType // true
```
- 我 们 没 有 使 用 SubType 默 认 提 供 的 原 型， 而 是 给 它 换 了 一 个 新 原 型； 这 个 新 原 型 就 是 SuperType 的 实 例。 于 是， 新 原 型 不 仅 具 有 作 为 一 个 SuperType 的 实 例 所 拥 有 的 全 部 属 性 和 方 法， 而 且 其 内 部 还 有 一 个 指 针， 指 向 了 SuperType 的 原 型。 最 终 结 果 就 是 这 样 的： instance 指 向 SubType 的 原 型， SubType 的 原 型 又 指 向 SuperType 的 原 型。 getSuperValue() 方 法 仍 然 还 在 SuperType.prototype 中， 但 property 则 位 于 SubType.prototype 中。 这 是 因 为 property 是 一 个 实 例 属 性， 而 getSuperValue() 则 是 一 个 原 型 方 法。 既 然 SubType.prototype 现 在 是 SuperType 的 实 例， 那 么 property 当 然 就 位 于 该 实 例 中 了。 此 外， 要 注 意 instance.constructor 现 在 指 向 的 是 SuperType ，这 是 因 为 原 来 SubType.prototype 中 的 constructor 被 重 写 了 的 缘 故 1 。
> 1 实 际 上， 不 是 SubType 的 原 型 的 constructor 属 性 被 重 写 了， 而 是 SubType 的 原 型 指 向 了 另 一 个 对 象—— SuperType 的 原 型， 而 这 个 原 型 对 象 的 constructor 属 性 指 向 的 是 SuperType 。

![继承.png](http://edu.bluej.cn/public/uploads/继承.png)