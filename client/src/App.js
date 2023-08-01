// import './App.css'
import FormEmployee from './FormEmployee';
import ListEmployee from './ListEmployee';
import Login from './pages/Login'
import Register from './pages/Register';
import TodoList from './pages/TodoList';
// import TodoForm from './todoForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>

        <Routes>
          {/* <Route path="/" element={<ListEmployee />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path='/TodoForm' element={<TodoForm />} /> */}
          {/* <Route path='/' element={<TodoForm />} /> */}
          <Route path='/' element={<TodoList />} />
          <Route path="/home" element={<ListEmployee />} />
          <Route path="/add" element={<FormEmployee />} />
          <Route path="/edit/:userId" element={<FormEmployee />} />
          
        </Routes>
  
    </Router>

  );
}

export default App;
