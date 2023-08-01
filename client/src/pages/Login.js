import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'
import axios from 'axios';

function Login() {

    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault();
        await axios.post('http://localhost:3001/login', {
            username: username,
            password: password
        }).then((response) => {
                console.log("Login Succeed")
                console.log(response.data.token);
                sessionStorage.setItem('user', response.data.username)
                navigate("/", { replace: true })
        }).catch((error) => {
            console.log("Login ",error)
            let formError = document.querySelector('.form-box')
            formError.classList.add('incorrect')
        })
    }

    return (
        <div className='body-login'>
            <div className="cricle-1"></div>
            <div className="cricle-2"></div>
            <div className="cricle-3"></div>
            <div className="cricle-4"></div>
            <div className="form-box">
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <span className='alert-incorrect'>Incorrect username or password</span>
                    <div className="form-contorl">
                        <span class="icon_login"><i class="fa-solid fa-user"></i></span>
                        <input type="text" id="username" required autocomplete="off" onChange={(event) => setUsername(event.target.value)}></input>
                        <span></span>
                        <label>Username</label>
                    </div>
                    <div className="form-contorl">
                        <span class="icon_login"><i class="fa-solid fa-user"></i></span>
                        <input type="password" id="password" required autocomplete="off" onChange={(event) => setPassword(event.target.value)}></input>
                        <span></span>
                        <label>Password</label>
                    </div>
                    <div class="remember-forgot">
                        <label><input type='checkbox'></input> Remember me</label>
                        <a href="/login">Forgot Password</a>
                    </div>
                    <button type="submit" class="btn-log">Login</button>
                    <div class="register">
                        Don't have an account? <Link to={'/register'}>Register</Link>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Login