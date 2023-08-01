// const express = require('express');
// const app = express();
// const mysql = require('mysql');
// const cors = require('cors');

// app.use(cors());
// app.use(express.json());

// const db = mysql.createConnection({
//     user: "root",
//     host: "localhost",
//     password: "1234"
//     // database: "employeesSystem"
// })

// app.get('/employees', (req, res) => {
//     db.query("SELECT * FROM employeesSystem.employees", (err, result) => {
//         if (err) {
//             console.log(err)
//         } else {
//             console.log(result)
//             res.setHeader('Content-Type', 'application/json');
//             res.end(JSON.stringify(result));
//         }
//     })
// })

// app.post('/createEmployee', (req, res) => {
//     const name = req.body.name;
//     const age = req.body.age;
//     const position = req.body.position;
//     const salary = req.body.salary;
//     // console.log(name)
//     db.query("INSERT INTO employeesSystem.employees (name, age, position, salary) VALUES (?,?,?,?)",
//         [name, age, position, salary], (err, result) => {
//             if (err) {
//                 console.log(err)
//             } else {
//                 res.send("Inserted Successfully")
//             }
//         })
// })

// app.delete('/delete/:id', (req, res) => {
//     const id = req.params.id;
//     db.query("DELETE FROM employeesSystem.employees WHERE id =?", [id], (err, result) => {
//         if (err) {
//             console.log(err)
//         } else {
//             res.send("Deleted Successfully")
//         }
//     })
// })


// app.get('/editEmployees/:id', (req, res) => {
//     const id = req.params.id;
//     db.query("SELECT * FROM employeesSystem.employees WHERE id =?", [id], (err, result) => {
//         if (err) {
//             console.log(err)
//         } else {
//             // console.log(result)
//             res.setHeader('Content-Type', 'application/json');
//             res.end(JSON.stringify(result));
//         }
//     })
// })


// app.put('/updateEmployee/:id', (req, res) => {
//     const id = req.params.id;
//     const name = req.body.name;
//     const age = req.body.age;
//     const position = req.body.position;
//     const salary = req.body.salary;

//     db.query("UPDATE employeesSystem.employees SET name =?, age =?, position =?, salary =? WHERE id =?",
//         [name, age, position, salary, id], (err, result) => {
//             if (err) {
//                 console.log(err)
//             } else {
//                 console.log(result)
//                 res.setHeader('Content-Type', 'application/json');
//                 res.end(JSON.stringify(result));
//             }
//         })
// })

// app.listen('3001', () => {
//     console.log('Server is running on port 3001')
// })


// // register


// app.post('/register', (req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;
//     const email = req.body.email;
//     db.query("INSERT INTO employeesSystem.user (username, email, password) VALUES (?,?,?)", 
//     [username, email, password], (err, result) => {
//         if (err) {
//             res.status(400).send("Username or email already exists");
//         } else {
//             res.send("Register Successfully")
//         }
//     })
// })

// // login

// app.post('/login', (req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;

//     db.query("SELECT * FROM employeesSystem.user WHERE username = ? and password = ?",
//         [username, password], (err, result) => {
//             if (err) {
//                 console.log(err)
//                 res.status(400).send("Username or password was wrong");
//             } else {
//                 res.setHeader('Content-Type', 'application/json');
//                 res.end(JSON.stringify(result));
//             }
//         })
// })



// Mongodb.connect

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Todo = require('./routes/TodoRoutes')
const User = require('./routes/UserRoutes')

const app = express();
app.use(express.json());
app.use(cors());

// ติดต่อกับ MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/todo_list', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// mongoose.connect('mongodb+srv://admin:1234@cluster0.auijtni.mongodb.net/todo_list', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });


app.use(Todo)
app.use(User)

// set port
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


// // todo Scheme
// const todoSchema = mongoose.Schema({
//     text: String,
//     completed: Boolean,
//     isEditing: Boolean
// });

// const Todo = mongoose.model('todos', todoSchema);

// // get
// app.get('/todos', async (req, res) => {
//     try {
//         const todos = await Todo.find();
//         res.json(todos);
//     } catch (error) {
//         res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงรายการทั้งหมดใน Todo List' });
//     }
// });

// // add
// app.post('/todos/create', async (req, res) => {
//     console.log("add todo")
//     console.log(req.body)
//     try {
//         const newData = req.body;
//         const createdData = await Todo.create(newData);
//         res.status(201).json(createdData);
//     } catch (err) {
//         res.status(500).json({ error: 'Failed to create data' });
//     }
// });

// // delete
// app.delete('/todos/delete/:id', async (req, res) => {
//     console.log("delete")
//     const { id } = req.params;
//     try {
//         await Todo.findByIdAndDelete(id);
//         res.status(200).json({ message: 'ลบรายการเรียบร้อยแล้ว' });
//     } catch (error) {
//         res.status(500).json({ error: 'เกิดข้อผิดพลาดในการลบรายการ' });
//     }
// });


// //   update
// app.put('/todos/update/:id', async (req, res) => {
//     const { id } = req.params;
//     const newData = req.body.text;

//     try {
//         const updatedData = await Todo.findByIdAndUpdate(id, { text: newData });
//         res.status(200).json(updatedData);
//     } catch (error) {
//         res.status(500).json({ error: 'เกิดข้อผิดพลาดในการแก้ไขรายการ' });
//     }
// });

// // task completed
// app.put('/todos/completed/:id', async (req, res) => {
//     const { id } = req.params;
//     const newData = req.body.completed;

//     try {
//         const updatedData = await Todo.findByIdAndUpdate(id, { completed: newData });
//         res.status(200).json(updatedData);
//     } catch (error) {
//         res.status(500).json({ error: 'เกิดข้อผิดพลาดในการแก้ไขรายการ' });
//     }
// });



// // user register Scheme
// const userSchema = mongoose.Schema({
//     username: String,
//     password: String,
//     email: String
// });

// const User = mongoose.model('user', userSchema);

// // register
// app.post('/register', async (req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;
//     const email = req.body.email;
//     const newData = req.body;
//     console.log(username, password, email);

//     try {
//         const existingUser = await User.findOne({ username: username });
//         if (existingUser) {
//             console.log("ซ้ำ")
//             return res.status(409).json({ error: 'ชื่อผู้ใช้นี้มีอยู่ในระบบแล้ว' });
//         }
//         console.log("ลงทะเบียนสำเร็จ")
//         const newUser = await User.create({ username: username, password: password, email: email });
//         console.log(newUser)
//         res.status(201).json({ message: 'ลงทะเบียนสำเร็จ' });

//     } catch (error) {
//         res.status(500).json({ message: 'เกิดข้อผิดพลาดในการลงทะเบียน' });
//     }
// });

// // login
// app.post('/login', async (req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;

//     try {
//         const existingUser = await User.findOne({ username: username, password: password });
//         if (existingUser) {
//             res.json(existingUser)
//         } else {
//             return res.status(409).json({ error: 'ชื่อผู้ใช้นี้ไม่มีอยู่ในระบบ' });
//         }
//     }catch{
//         res.status(500).json({ message: 'เกิดข้อผิดพลาดในการลงทะเบียน' });
//     }

// });
