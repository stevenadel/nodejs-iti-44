const { log } = require('console');
const fs = require('fs');
const path = require("path");

const todoPath = path.join(__dirname, "../../Lab 1/todos.json");

const getAllTodos = () => {
  const todoContent = fs.readFileSync(todoPath, "utf-8");
  return todoContent ? JSON.parse(todoContent) : "";
};

const getTodo = (id) => {
  const todos = getAllTodos();
  const todo = todos.find((todo) => todo.id == id);
  return todo;
};

const addTodo = (todoString) => {
  const todos = getAllTodos();

  let latestID = 0;
  if (todos && todos.length > 0) {
    latestID = todos.at(-1).id;
  }

  const newTodo = { id: latestID + 1, title: todoString, status: "to-do" };
  todos.push(newTodo);
  fs.writeFileSync(todoPath, JSON.stringify(todos));
  return todos;
};

const deleteTodo = (id) => {
  const todos = getAllTodos();
  const newTodos = todos.filter((todo) => todo.id != id);

  if (todos.length == newTodos.length) {
    return false;
  }
  
  fs.writeFileSync(todoPath, JSON.stringify(newTodos));
  return newTodos;
};

const editTodo = (id, todoString, todoStatus="to-do") => {
  const todos = getAllTodos();
  const todo = todos.find((todo) => todo.id == id);
  if (!todo) {
    return;
  }

  todo.title = todoString;
  todo.status = todoStatus; // Bonus
  fs.writeFileSync(todoPath, JSON.stringify(todos));
  return todo;
};

module.exports = {
  getAllTodos,
  getTodo,
  addTodo,
  deleteTodo,
  editTodo
};