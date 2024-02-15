const router = require('express').Router();
const TodosController = require('../controllers/todos-controller');

router.get('/', (req, res) => {
  res.render('todos-view', { title: "To-Do's", todos:  TodosController.getAllTodos()});
});

router.get('/todos', (req, res) => {
  const { status } = req.query; // Bonus
  const responseBody = TodosController.getAllTodos(status);
  responseBody && responseBody.length > 0 ? res.json(responseBody) : res.sendStatus(204);
});

router.get('/todos/:id', (req, res) => {
  const responseBody = TodosController.getTodo(req.params.id);
  responseBody ? res.json(responseBody) : res.status(404).end();
});

router.post('/todos', (req, res) => {
  const todoString = req.body.title;
  const responseBody = TodosController.addTodo(todoString);
  responseBody ? res.status(201).json(responseBody) : res.sendStatus(404);
});

router.delete('/todos/:id', (req, res) => {
  const responseBody = TodosController.deleteTodo(req.params.id);
  responseBody ? res.json(responseBody) : res.sendStatus(404);
});

router.patch('/todos/:id', (req, res) => {
  const responseBody = TodosController.editTodo(req.params.id, req.body.title, req.body.status);
  responseBody ? res.json(responseBody) : res.sendStatus(404);
});

router.get('/image', (req, res) => {
  res.send(`
        <html>
            <body>
                <h1>Image Static Server</h1>
                <img src="/public/cat.jpg" style="width: 80%">
            </body>
        </html>
    `);
});

// router.use((req, res) => {
//   res.sendStatus(404);
// });

module.exports = router;