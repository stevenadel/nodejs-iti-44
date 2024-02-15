const TodosModel = require('../models/todos');
const WebError = require('../lib/web-error');

const createTodo = async (todo) => {
  const newTodo = await TodosModel.create(todo)
    .catch((err) => {
      throw new WebError(err.message, 422);
    });
  return newTodo;
};

const editTodo = async (todo, id, userId) => {
  const { title, status, tags } = todo;
  const editedTodo = await TodosModel.findOneAndUpdate({ _id: id, userId: userId }, { title, status, tags }, { new: true })
    .catch((err) => {
      return next(new ValidationError(err.message));
    });
    return editedTodo;
};

const deleteTodo = async (id) => {
  const deleted = await TodosModel.deleteOne({ _id: id })
    .catch((err) => {
      throw new WebError(err.message, 422);
    });
  return deleted.deletedCount;
};

const getTodos = async (status, limit, skip) => {
  limit = limit || 10;
  skip = skip || 0;

  const todos = await TodosModel.find({ status: status }).limit(limit).skip(skip).populate('userId')
    .catch((err) => {
      throw new WebError(err.message, 422);
    });
  return todos;
};

module.exports = {
  createTodo,
  editTodo,
  deleteTodo,
  getTodos
};
