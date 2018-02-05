var isArray = Array.isArray && function (o) {
  return typeof o === 'object' && Object.prototype.toString.call(o) === '[object Array]';
};

// 执行单个generator

function fo(gs) {
  // 轮盘
  this.controlTransfer = false;
  this.controlQueue = isArray(gs) && gs.map(g => ({
    iterator: g(),
    value: null
  })) || [];
}

fo.prototype.runSingle = function(it, value) {
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
      console.log('control transfer now');
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

// 转换控制权
fo.prototype.transfer = function() {
  this.controlTransfer = true;
};

// 运行generator
fo.prototype.run = function() {
  const queue = this.controlQueue;
  while (queue.length !== 0) {
    const { iterator, value } = queue.shift();
    this.runSingle(iterator, value);
  }
};

module.exports = function(...gs) {
  return new fo(gs);
};