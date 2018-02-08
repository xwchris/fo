const Fo = require('./fo');

function *foo() {
  var x = yield 1 + 1;
  var y = x + 2;
  console.log('foo y', y);
  yield fo.transfer();
  console.log('wait 4s');
  yield fo.delay(4000);
  var z = yield y + 4;
  console.log('foo', z);
}

function *bar() {
  var x = yield 2 + 2;
  var y = x + 4;
  console.log('bar y', y);
  yield fo.transfer();
  var z = yield y + 1;
  console.log('bar', z);
}

var fo = Fo(foo, bar).run();
