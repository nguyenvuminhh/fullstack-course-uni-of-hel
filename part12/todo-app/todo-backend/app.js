const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const todosRouter = require('./routes/todos');

const app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());

app.use('/todos', todosRouter);
app.use('/', indexRouter);
app.use('/api/todos', (req, res) => {
    res.json({qwerty:"qwerty"})
});


module.exports = app;
