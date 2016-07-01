/**
Copyright (c) 2016
William Joel Gardner
**/

/**
Recursively return more function references until we've reached
the required number of arguments in the original (uncurried) function
**/
exports.curry = function(fn) {
  'use strict';

  if (fn.length === 1) return fn;
  return function _curry(/* args */) {
    var args = Array.prototype.slice.call(arguments);
    if (args.length >= fn.length) return fn.apply(undefined, args);
    for(var list = [], i = 0;i < args.length;++i) list.push(['args[', i, ']'].join(''));
    return eval('_curry.bind(undefined,' + list.join(',') + ')');
  }
};
