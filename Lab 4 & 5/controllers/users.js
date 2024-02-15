const UsersModel = require('../models/users');
const TodosModel = require('../models/todos');
const WebError = require('../lib/web-error');

const createUser = async (user) => {
  const newUser = await UsersModel.create(user)
    .catch((err) => {
      throw new WebError(err.message, 422);
    });
  return newUser;
};

const login = async (user) => {
  const { username, password } = user;
};

const getUsers = async () => {
  const users = await UsersModel.find().select({ username: 1 });
  return users;
};

const deleteUser = async (id) => {
  await UsersModel.deleteOne({ _id: id })
    .catch((err) => {
      throw new WebError(err.message, 422);
    });
};

const editUser = async (user, userId) => {
  const editedUser = await UsersModel.findOneAndUpdate({ _id: userId }, user, { new: true })
    .catch((err) => {
      throw new WebError(err.message, 422);
    });
  return editedUser;
};

const getUserTodos = async (userId) => {
  const todos = await TodosModel.find({ userId: userId })
    .catch((err) => {
      throw new WebError(err.message, 404);
    });
  return todos;
};

module.exports = {
  createUser,
  login,
  getUsers,
  deleteUser,
  editUser,
  getUserTodos
};
