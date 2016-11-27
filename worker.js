'use strict';

const assert = require('assert');

const memoize = function (fn) {
    const cache = {};

    return function (n) {
        const cached = cache[n];

        if (typeof cached !== 'undefined') {
            return cached;
        }

        const result = fn.call(this, n);
        cache[n] = result;

        return result;
    };
};

const fib = memoize(function (n) {
    assert(typeof n === 'number', 'n must be a number');

    if (n === 0) {
        return 0;
    }

    if (n === 1 || n === 2) {
        return 1;
    }

    return fib(n - 1) + fib(n - 2);
});

process.on('message', data => {
    const {n} = data;
    const result = fib(Number(n));
    process.send({result});
});
