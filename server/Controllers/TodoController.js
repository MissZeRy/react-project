const Todo = require('../models/Todo');

const getAllTodos = async (req, res) => {
    const { user } = req.params;
    try {
        const todos = await Todo.find({ user: user }).sort({ _id: -1 });
        res.json(todos);
    } catch (error) {
        res.status(500).json();
    }
}


const AddTodo = async (req, res) => {
    const newData = req.body;
    try {
        const createdData = await Todo.create(newData);
        res.status(201).json(createdData);
    } catch (err) {
        res.status(500).json();
    }
}

const DeletedTodo = async (req, res) => {
    const { id } = req.params;
    try {
        await Todo.findByIdAndDelete(id);
        res.status(200).json();
    } catch (error) {
        res.status(500).json();
    }
}

const UpdateTodo = async (req, res) => {
    const { id } = req.params;
    const newData = await req.body.text;
    try {
        const updatedData = await Todo.findByIdAndUpdate(id, { text: newData });
        res.status(200).json(updatedData);
    } catch (error) {
        res.status(500).json();
    }
}

const CompletedTodo = async (req, res) => {
    const { id } = req.params;
    const newData = await req.body.completed;

    try {
        const updatedData = await Todo.findByIdAndUpdate(id, { completed: newData });
        res.status(200).json(updatedData);
    } catch (error) {
        res.status(500).json();
    }
}

module.exports = { getAllTodos, AddTodo, DeletedTodo, UpdateTodo, CompletedTodo }