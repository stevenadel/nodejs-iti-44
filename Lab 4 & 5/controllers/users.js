const UsersModel = require('../models/users');
const TodosModel = require('../models/todos');
const WebError = require('../lib/web-error');
const jwt = require("jsonwebtoken");

const createUser = async (user) => {
  user.username = user.username.trim();
  const newUser = await UsersModel.create(user)
    .catch((err) => {
      throw new WebError(err.message, 422);
    });
  return newUser;
};

const login = async (userInput) => {
  const { username, password } = userInput;
  await UsersModel.findOne({ username })
  .catch((err) => {
    throw new WebError(err.message, 422);
  });

  try {
    await user.verifyPassword(password);
  } catch(err) {
    throw new WebError("Username or password is incorrect (unauthorized).", 401);
  }
  
  const token = jwt.sign({ username, id: user._id }, "fghjfh", { expiresIn: "3d" });
  return token;
};

const getUsers = async () => {
  const users = await UsersModel.find().select({ firstName: 1, _id: 0 });
  return users;
};

const deleteUser = async (id) => {
  const deleted = await UsersModel.deleteOne({ _id: id })
    .catch((err) => {
      throw new WebError(err.message, 422);
    });
  return deleted.deletedCount;
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
