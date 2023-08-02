// import './App.css'
import { useState } from 'react';
import Login from './pages/Login'
import Register from './pages/Register';
import TodoList from './pages/TodoList';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('userToken'))

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };


  return (
    <Router>

      <Routes>
        
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/register" element={<Register />} />
        {/* <Route path='/' element={<TodoList />} /> */}
        <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
        <Route path="/" element={isLoggedIn ? <TodoList onLogout={handleLogout} /> : <Navigate to="/login" />} />
        
      </Routes>

    </Router>

  );
}

export default App;
