'use strict';

const PORT = process.env.PORT || 80;

const express = require('express');
const fs = require('fs');

const app = express();

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));

app.get('/file', (req, res) => {
    const stream = fs.createReadStream('file');

    stream.pipe(res);
});
