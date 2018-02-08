/* eslint no-console: 0 */

// 判断数组
var isArray = Array.isArray && function (o) {
  return typeof o === 'object' && Object.prototype.toString.call(o) === '[object Array]';
};

// 构造Fo实例
var Fo = function(...gs) {
  this.controlTransfer = false;
  this.controlMap = {};
  this.controlQueue = isArray(gs) && gs.map(g => ({
    iterator: g(),
    value: null
  })) || [];
  if (this instanceof Fo) return this;
  return new Fo(...gs);
};

// 执行单个generator
Fo.prototype.runSingle = function(it, value) {
  var ret;
  var self = this;

  // 递归迭代
  (function iterator(val) {
    // 转换控制权 保存迭代状态
    if (self.controlTransfer) {
      self.controlQueue.push({
        iterator: it,
        value: val,
      });
      self.controlTransfer = false;
      return;
    }

    // 获取执行结果
    ret = it.next(val);
    var done = ret.done;
    var value = ret.value;

    // 如果已经完成执行则停止递归
    if (!done) {
      // 异步promise情况 等待值返回
      if (typeof value === 'object' && 'then' in value) {
        value.then(iterator);
      } else {
        // 延迟执行 防止出现yield还未阻塞的情况
        iterator(value);
      }
    }
  })(value);
};

// 运行generator
Fo.prototype.run = function() {
  var queue = this.controlQueue;
  var self = this;
  // 延迟执行 先返回值
  setTimeout(function() {
    while (queue.length !== 0) {
      var result = queue.shift();
      self.runSingle(result.iterator, result.value);
    }
  }, 0);
  return this;
};

// 转换控制权
Fo.prototype.transfer = function () {
  this.controlTransfer = true;
};

// 空等延迟
Fo.prototype.delay = function(delay) {
  var startTime = Date.now();
  var currentTime = startTime;
  while(currentTime < startTime + delay) {
    currentTime = Date.now();
  }
};

// 防止修改
Fo = Object.freeze(Fo);

module.exports = Fo;