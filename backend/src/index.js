const express = require('express');
const mongoose = require('mongoose');
const routes = require('./route');
const path = require('path');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect('mongodb+srv://dbuser:dbuser@cluster0-gslvv.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use(cors());
// acessar o arquivo direto da url
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));
app.use(routes);

server.listen(3000);
