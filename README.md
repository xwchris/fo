# Fo

## 什么是Fo
Fo是一个简单的`generator`执行器，用来自动执行`generator`。其中还添加了控制权转换，用来进行多个`generator`“并发”执行。

## 安装
```javascript
git clone git@github.com:xwchris/fo.git
```

## 运行

浏览器环境：

```javascript
// generator函数
function *foo() {
  yield 1;
  fo.delay(2000);
  yield 2;
}
// 运行
var fo = Fo().run(foo);
```

Node环境：
```javascript
// 引入Fo
var Fo = require('./fo.js');
// generator函数
function *foo() {
  yield 1;
  fo.delay(2000);
  yield 2;
}
// 运行
var fo = Fo().run(foo);
```

## 怎么使用Fo
使用`Fo`需要`Fo()`函数进行初始化，`Fo(p1, p2, ...)`可以传入多个初始值，该值可以在运行的各个`generator`参数中拿到，拿到的是按照传入顺序，数组形式的参数。调用`Fo()`之后返回一个`Fo`实例对象，同时各个API也返回该实例对象因此可以进行链式调用。

## 包含的API
- `Fo(p1, p2, p3, ...)`，构造函数用来构造`Fo`实例，可同时传入多个初始参数
- `Fo.prototype.run(g1, g2, ...)`，用来运行多个`generator`，运行顺序按照`round-robin`方式来进行
- `Fo.prototype.delay(time)`，传入延迟时间来延迟执行，单位`ms`
- `Fo.prototype.transfer()`，将控制权交给下一个要执行的`generator`，在`generator`中使用

## 例子
在`examples`提供了两个运行的例子，第一个例子是浏览器中的一个打乒乓的小例子，用来说明控制转换，这是直接拿[Getting Concurrent With ES6 Generators](https://davidwalsh.name/concurrent-generators)中的`ping-pong`例子来用了，把其中的`ASQ`换成了自己的，感兴趣的可以看下大神的文章。第二个例子是node环境中用来展示延迟的例子。
