import React, { useState } from 'react'
import './Header.css'



function Header() {

    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click)
    const closeMobileMenu = () => setClick(false)

  return (
    <div>
        <div className='header'>
            <div className="container">
                <div className="header-con">
                    <div className="logo-container">
                        <a href="#">MissZeRy</a>
                    </div>
                    <ul className={click ? "menu active" : "menu"}>
                        <li onClick={closeMobileMenu}><a href="Home">Home</a></li>
                        <li onClick={closeMobileMenu}><a href="About">About</a></li>
                        <li onClick={closeMobileMenu}><a href="Contact">Contact</a></li>
                    </ul>
                    <div className="mobile-menu" onClick={handleClick}>
                        {click ? <i class="fa-solid fa-xmark"></i> : <i class="fa-solid fa-bars"></i>}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header