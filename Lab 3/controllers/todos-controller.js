const TodosModel = require('../models/todos-model');

const getAllTodos = (status) => {
  const todos = TodosModel.getAllTodos();
  if (status) {
    return todos.filter(todo => todo.status === status);
  }
  return todos;
};

const getTodo = (id) => {
  return TodosModel.getTodo(id);
};

const addTodo = (todoString) => {
  if (!todoString.trim()) {
    return;
  }

  return TodosModel.addTodo(todoString);
};

const deleteTodo = (id) => {
  return TodosModel.deleteTodo(id);
};

const editTodo = (id, todoString, todoStatus) => {
  if (!todoString || !todoString.trim()) {
    return;
  }

  // Bonus
  if (todoStatus !== "to-do"
    && todoStatus !== "in-progress"
    && todoStatus !== "done") {
    return TodosModel.editTodo(id, todoString);
  }

  return TodosModel.editTodo(id, todoString, todoStatus);
};

module.exports = {
  getAllTodos,
  getTodo,
  addTodo,
  deleteTodo,
  editTodo
};