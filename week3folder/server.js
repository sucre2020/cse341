const express = require('express');

const app = express();

const port = 5000;

app.get('/', (req, res) => {
    res.send('hello Efita!');
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});