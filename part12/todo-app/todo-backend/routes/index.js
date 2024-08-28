const express = require('express');
const router = express.Router();
const redis = require('../redis')

const configs = require('../util/config');
const { Todo } = require('../mongo');

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});


router.get('/statistics', async (req, res) => {
  const oldData = (await redis.getAsync('added-todo')) || (await Todo.find({})).length
  await redis.setAsync('added-todo', Number(oldData))
  res.json({"addedTodo": (await redis.getAsync('added-todo'))})  
  
})


module.exports = router;
