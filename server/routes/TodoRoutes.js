const express = require('express');
const router = express.Router();
const TodoController = require('../Controllers/TodoController');

router.get('/todos/:user', TodoController.getAllTodos);
router.post('/todos/create', TodoController.AddTodo);
router.delete('/todos/delete/:id', TodoController.DeletedTodo);
router.put('/todos/update/:id', TodoController.UpdateTodo);
router.put('/todos/completed/:id', TodoController.CompletedTodo);

module.exports = router;