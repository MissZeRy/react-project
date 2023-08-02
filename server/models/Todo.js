const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    user: String,
    text: String,
    completed: Boolean,
    isEditing: Boolean
});

const Todo = mongoose.model('todos', todoSchema);

module.exports = Todo;