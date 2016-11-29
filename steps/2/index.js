'use strict';

const PORT = process.env.PORT || 8082;

const assert = require('assert');
const express = require('express');

const app = express();

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));

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

app.get('/fib/:n', (req, res) => {
    const fib = memoize(function (n) {
        assert(typeof n === 'number', 'n must be a number');

        if (n === 0) {
            return 0;
        }

        if (n === 1) {
            return 1;
        }

        return fib(n - 1) + fib(n - 2);
    });

    const {n} = req.params;

    const response = String(fib(Number(n)));

    res.end(response);
});
