'use strict';

const assert = require('assert');

const fib = function (n) {
    assert(typeof n === 'number', 'n must be a number');

    if (n === 0) {
        return 0;
    }

    if (n === 1) {
        return 1;
    }

    return fib(n - 1) + fib(n - 2);
};

process.on('message', data => {
    const {n} = data;
    const result = fib(Number(n));
    process.send({result});
});
