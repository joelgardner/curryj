var curryj = require('../src/curry');
var assert = require('chai').assert;

describe('curryj library', function () {

  it('for arity 1, should return the same function', function () {
    var hello = curryj.curry(_f1);
    assert.equal(_f1, hello);
  });

  it('for arity 1, should return a function whose return value is correct', function () {
    var hello = curryj.curry(_f1);
    assert.equal("hello world", hello("world"));
  });

  it('for arity 2, should return a curried function which can be partially applied', function () {
    var hello2 = curryj.curry(_f2),
        helloWorldAnd = hello2('world');
    assert.equal(helloWorldAnd("universe"), 'hello world and #2: universe');
  });

  it('should return functions until all arguments are supplied', function () {
    var threeD = curryj.curry(_3dcoords),
        threeDx1 = threeD('x1'),
        threeDx1y2 = threeDx1('y2'),
        threeDx1y2z3 = threeDx1y2('z3');
    assert.equal(typeof(threeD), 'function');
    assert.equal(typeof(threeDx1), 'function');
    assert.equal(typeof(threeDx1y2), 'function');
    assert.equal(typeof(threeDx1y2z3), 'object');
    assert.equal(threeDx1y2z3.x, 'x1');
    assert.equal(threeDx1y2z3.y, 'y2');
    assert.equal(threeDx1y2z3.z, 'z3');
    assert.equal(threeDx1y2(threeDx1y2z3).z.z, 'z3');
  });

  it('should allow any combination of calls as long as all arguments are supplied', function () {
    var four = curryj.curry(_f4);
    var answer = 'the concat (or sum) of all these are : abc and finally, 4: d';
    assert.equal(four('a', 'b', 'c', 'd'), answer);
    assert.equal(four('a')('b', 'c', 'd'), answer);
    assert.equal(four('a')('b', 'c')('d'), answer);
    assert.equal(four('a')('b')('c')('d'), answer);
    assert.equal(four('a', 'b')('c', 'd'), answer);
    assert.equal(four('a', 'b', 'c')('d'), answer);
  });
});

/**
sample functions for testing
**/
function _f1(a) {
  return "hello " + a;
}

function _f2(a1, a2) {
  return _f1(a1) + ' and #2: ' + a2;
}

function _f3(a1, a2, a3) {
  return [a1, a2, a3].reduce(function(result, a) {
    return result + a;
  }, 'the concat (or sum) of all these are : ');
}

function _3dcoords(x, y, z) {
  return {
    x : x,
    y : y,
    z : z
  };
}

function _f4(a1, a2, a3, a4) {
  return _f3(a1, a2, a3) + ' and finally, 4: ' + a4;
}
