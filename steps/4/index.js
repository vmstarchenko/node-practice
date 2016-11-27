'use strict';

const PORT = process.env.PORT || 80;

const express = require('express');
const {fork} = require('child_process');

const app = express();

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));

app.get('/fib/:n', (req, res) => {
    const {n} = req.params;
    const child = fork('worker');

    child.on('message', data => {
        const {result} = data;

        child.kill();
        res.end(String(result));
    });

    child.send({n});
});
