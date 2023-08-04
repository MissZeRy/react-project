import { useState } from 'react'
import './Register.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Register() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [password2, setPassword2] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();

        await axios.post('https://react-api-production.up.railway.app/register', {
            username: username,
            password: password,
            email: email
        }).then((response) => {

            let modal = document.querySelector('.modal-content')
            modal.classList.add('active')

            let btnPopup = document.querySelector('.btn-reg-modal');
            btnPopup.addEventListener('click', () => {
                navigate("/login", { replace: true })
            })

            // navigate("/login", { replace: true })
        }).catch((error) => {
            console.log("register erroe", error)
            let formError = document.querySelector('.form-box')
            formError.classList.add('duplicate')
        })
    }

    function checkSummit(event) {
        event.preventDefault();

        const usernameValid = checkUsername(username);
        const emailValid = checkEmail(email);
        const passwordValid = checkPassword(password, password2);

        if (usernameValid && emailValid && passwordValid) {
            handleRegister(event)
        }
    }

    function checkUsername(username) {
        const minUsernameLength = 6;
        const usernamePattern = /[A-Z]/.test(username);

        if (!usernamePattern) {
            showError('username', 'Username must contain at least one uppercase letter.');
            return false;
        } else if (username.length < minUsernameLength) {
            showError('username', 'Username must be at least 6 characters.');
            return false;
        } else {
            showSuccess('username');
            return true;
        }
    }

    function checkEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            showError('email', 'Invalid email address.');
            return false;
        } else {
            showSuccess('email');
            return true;
        }
    }

    function checkPassword(password, password2) {
        const minPasswordLength = 6;
        const passwordPattern = /[A-Z]/.test(password);

        if (!passwordPattern) {
            showError('password', 'Password must contain at least one uppercase letter.');
            return false;
        } else if (password.length < minPasswordLength) {
            showError('password', 'Password must be at least 6 characters.');
            return false;
        } else {
            showSuccess('password');
            if (password !== password2) {
                showError('password2', 'Passwords do not match.');
                return false;
            } else {
                showSuccess('password2');
                return true;
            }
        }
    }

    function showError(field, message) {
        const formControl = document.getElementById(field).parentElement;
        formControl.className = 'form-contorl error';
        const errorMessage = formControl.querySelector('.error-message');
        errorMessage.innerText = message;
    }

    function showSuccess(field) {
        const formControl = document.getElementById(field).parentElement;
        formControl.className = 'form-contorl success';
    }


    const enableBtn = () => {
        let checkBox = document.querySelector('.reg-checkbox')
        let btnReg = document.querySelector('.btn-reg')

        if (checkBox.checked) {
            btnReg.removeAttribute('disabled')
        } else {
            btnReg.disabled = true
        }
    }

    return (
        <div>
            <div className='body-register'>
                <div className="cricle-1"></div>
                <div className="cricle-2"></div>
                <div className="cricle-3"></div>
                <div className="cricle-4"></div>

                <div className="form-box">
                    <h1>Register</h1>
                    <form onSubmit={checkSummit} id='form'>
                        <span className='alert-incorrect'>Incorrect username or password</span>
                        <div className="form-contorl">

                            <input type="text" id="username" required autocomplete="off" onChange={(event) => setUsername(event.target.value)}></input>
                            <span></span>
                            <label>Username</label>
                            <div><span className='error-message'>Error Message</span></div>
                        </div>
                        <div className="form-contorl">

                            <input type="text" id="email" required autocomplete="off" onChange={(event) => setEmail(event.target.value)}></input>
                            <span></span>
                            <label>Email</label>
                            <div><span className='error-message'>Error Message</span></div>
                        </div>
                        <div className="form-contorl">

                            <input type="password" id="password" required autocomplete="off" onChange={(event) => setPassword(event.target.value)}></input>
                            <span></span>
                            <label>Password</label>
                            <div><span className='error-message'>Error Message</span></div>
                        </div>
                        <div className="form-contorl">

                            <input type="password" id="password2" required autocomplete="off" onChange={(event) => setPassword2(event.target.value)}></input>
                            <span></span>
                            <label>Confirm Password</label>
                            <div><span className='error-message'>Error Message</span></div>
                        </div>

                        <div class="agree-conditions">
                            <label><input type='checkbox' className='reg-checkbox' onClick={enableBtn} id='reg-checkbox'></input> I agree to the terms & conditions</label>
                        </div>
                        <button type="submit" class="btn-reg" disabled='true'>Singup</button>
                        <div class="register">
                            Already have an account? <Link to={'/login'}>Login</Link>
                        </div>
                    </form>
                </div>
            </div>

            <div class="modal-content">
                <div className="register-modal">
                    <i class="fa-regular fa-circle-check"></i>
                    <h3>Thank You!</h3>
                    <p>Your registration was successful</p>
                    <button className='btn-reg-modal'>OK</button>
                </div>
            </div>

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        </div>
    )
}

export default Register


