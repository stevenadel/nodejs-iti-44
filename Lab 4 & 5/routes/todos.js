const router = require('express').Router();
const { TodosController } = require('../controllers');
const asyncWrapper = require('../lib/async-wrapper');

router.post('/', async (req, res, next) => {
  const [err, todo] = await asyncWrapper(TodosController.createTodo(req.body));
  if (!err) {
    return res.json(todo);
  }
  return next(err);
});

router.patch('/:id', async (req, res) => {
  const [err, todo] = await asyncWrapper(TodosController.editTodo(req.body, req.params.id));
  if (!err) {
    return res.json(todo);
  }
  return next(err);
});

router.delete('/:id', async (req, res) => {
  const [ err, deleted ] = await asyncWrapper(TodosController.deleteTodo(req.params.id));
  if (!err && deleted) {
    return res.json({ message: 'User deleted successfully' });
  }
  return next(err);
});

router.get('/', async (req, res) => {
  const { status, skip, limit } = req.query;
  const [err, todos] = await TodosController.getTodos(status, skip, limit);
  if (!err) {
    return res.json(todos);
  }
  return next(err);
});

module.exports = router;