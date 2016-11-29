'use strict';

const PORT = process.env.PORT || 8082;

const assert = require('assert');
const cluster = require('cluster');
const express = require('express');

const app = express();
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
} else {
    app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));

    app.get('/fib/:n', (req, res) => {
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

        const {n} = req.params;

        const response = String(fib(Number(n)));

        res.end(response);
    });
}
