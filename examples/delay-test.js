/* eslint no-console: 0 */
/* eslint-env node */

var Fo = require('./fo');

function *foo() {
  yield 1;
  yield 2;
  console.log('foo1');
  fo.delay(4000);
  yield 3;
  console.log('foo2');
}

function *bar() {
  yield 3;
  console.log('bar 1');
  yield 4;
  console.log('bar 2');
}

var fo = Fo().run(foo, bar);