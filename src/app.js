import './db';
import './redis';

import express from 'express';
import create from './sql/create-task';
import read from './sql/read-task';

const app = express();
const port = process.env.PORT;

app.get('/', function (req, res) {
    res.render('index');
});

app.post('/task', async function (req, res) {
    const task = await create(res.body);
    res.status = 201;
    res.body = { task };

});

app.get('/task/:id', async function (req, res) {
    const task = await read(req.params.id);
    res.status = 200;
    res.body = task;
});

// Start the server
app.listen(port, function(){
    console.log('Server is running on Port: ',port);
});
