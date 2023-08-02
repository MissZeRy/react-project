import React, { useState } from 'react'
import './Header.css'



function Header({ logout }) {

    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click)
    const closeMobileMenu = () => setClick(false)

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        logout()
    }

    return (
        <div>
            <div className='header'>                
                    <div className="header-con">
                        <div className="logo-container">
                            <h2>MissZeRy</h2>
                        </div>
                        <ul className={click ? "menu active" : "menu"}>
                            <li onClick={closeMobileMenu}><a href="/">Todo</a></li>
                            <button onClick={handleLogout} className='logout'>Logout</button>
                        </ul>
                        <div className="mobile-menu" onClick={handleClick}>
                            {click ? <i class="fa-solid fa-xmark"></i> : <i class="fa-solid fa-bars"></i>}
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default Header