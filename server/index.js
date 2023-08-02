// Mongodb.connect

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Todo = require('./routes/TodoRoutes')
const User = require('./routes/UserRoutes')

const app = express();
app.use(express.json());
app.use(cors());

// connect MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/todo-list', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(Todo)
app.use(User)

// set port
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});