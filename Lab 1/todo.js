const fs = require("fs");
const path = require("path");
const [, , command, ...data] = process.argv;

const todoPath = path.join(__dirname, "todos.json");
const todoContent = fs.readFileSync(todoPath, "utf-8");

let todos = [];
let latestID = 0;
if (!todoContent) {
    todos = JSON.parse(todoContent);
    latestID = todos.at(-1).id;
}

switch (command) {
    case "add":
        if (!data.join()) {
            console.log("To-Do cannot be empty.");
            return;
        }
        const newTodo = { id: latestID + 1, title: data.join(" ") };
        todos.push(newTodo);
        fs.writeFileSync(todoPath, JSON.stringify(todos));
        break;
    case "list":
        todos.forEach(todo => console.log(todo.title));
        break;
    case "edit":
        const [editID, editData] = data;
        const editIdNumber = parseInt(editID);

        if (isNaN(editIdNumber)) {
            console.log("Provided ID is not a number.");
            break;
        }

        const todo = todos.find((todo) => todo.id === editIdNumber);
        if (!todo) {
            console.log("To-Do not found.");
            break;
        }
        todo.title = editData;
        fs.writeFileSync(todoPath, JSON.stringify(todos));
        break;
    case "delete":
        const [deleteID] = data;
        const deleteIdNumber = parseInt(deleteID);

        const newTodos = todos.filter((todo) => todo.id !== deleteIdNumber)
        if (todos.length == newTodos.length) {
            console.log("To-Do not found.");
            return;
        }
        fs.writeFileSync(todoPath, JSON.stringify(newTodos));
        console.log("To-Do deleted successfully.");
        break;
    default:
        console.log("Invalid command.");
        break;
}
