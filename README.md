----
# A (very) small currying library for javascript

#### One simple function:
`curryj.curry`: takes a `function` and returns a function that can be partially applied:
```js
var curry = require('curryj').curry;

var add = curry(function(a, b) {
  return a + b;
});

var add3 = add(3);
console.log(add3(7));    // 10

var _3d = curry(function(x, y, z) {
  return { x: x, y: y, z: z };
});

console.log(_3d(0, 1, 2));  // { x:0, y:1, z:2 }
console.log(_3d(3)(4, 5));  // { x:3, y:4, z:5 }
console.log(_3d(6, 7)(8));  // { x:6, y:7, z:8 }
console.log(_3d(9)(0)(1));  // { x:9, y:0, z:1 }
```


Usage of currying allows for cool stuff as explained [here](https://hughfdjackson.com/javascript/why-curry-helps/).
