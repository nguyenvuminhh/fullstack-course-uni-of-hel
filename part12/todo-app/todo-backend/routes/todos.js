const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const redis = require('../redis/index')

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  const current = (await redis.getAsync('added-todo')) === NaN ? (await redis.getAsync('added-todo')) : (await Todo.find({})).length
  await redis.setAsync('added-todo', Number(current) + 1)
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)
  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  const result = await Todo.findById(req.params.id)
  res.send(result)
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const newTodo = Todo.findByIdAndUpdate(req.params.id, req.body, {new: true})
  res.send(newTodo)
});

router.use('/:id', findByIdMiddleware, singleRouter)

module.exports = router;
