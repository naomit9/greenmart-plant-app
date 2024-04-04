import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/logo.jpg'

function Header() {
    return (
        <header>

            <Link to="/" className='logo'>
                <img src={logo} alt='Logo' /> GreenMart
            </Link>

            <nav>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/plants'>Plants</NavLink>
                <NavLink to='/about'>About</NavLink>
            </nav>

        </header>
    )
}

export default Header