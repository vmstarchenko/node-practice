'use strict';

const PORT = process.env.PORT || 80;

const cluster = require('cluster');
const express = require('express');
const fs = require('fs');
const numCPUs = require('os').cpus().length;

const app = express();

if (cluster.isMaster) {
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
} else {
    app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));

    app.get('/file', (req, res) => {
        fs.readFile('file', (error, content) => {
            res.end(content);
        });
    });
}
