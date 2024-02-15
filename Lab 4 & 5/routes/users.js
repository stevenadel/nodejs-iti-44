const router = require('express').Router();
const { UsersController } = require('../controllers');
const asyncWrapper = require('../lib/async-wrapper');

router.post('/', async (req, res, next) => {
  const [err, user] = await asyncWrapper(UsersController.createUser(req.body));
  if (!err) {
    return res.json(user);
  }
  return next(err);
});

router.post("/login", async (req, res, next) => {
  const [err, token] = await asyncWrapper(UsersController.login(req.body));
  if (!err) {
    return res.json({ token: token });
  }
  return next(err);
});

router.get('/', async (req, res) => {
  const users = await asyncWrapper(UsersController.getUsers());
  return res.json(users);
});

router.delete("/:id", async (req, res, next) => {
  const [ err ] = await asyncWrapper(UsersController.deleteUser(req.params.id));
  if (!err) {
    return res.json({ message: 'User deleted successfully' });
  }
  return next(err);
});

router.patch("/:id", async (req, res) => {
  const [err, editedUser] = await asyncWrapper(UsersController.editUser(req.body, req.params.id));
  if (!err) {
    return res.json(editedUser);
  }
  return next(err);
});

router.get("/:id/todos", async (req, res, next) => {
  const [err, todos] = await asyncWrapper(UsersController.getUserTodos(req.params.id));
  if (!err) {
    return res.json(todos);
  }
  return next(err);
});

module.exports = router;