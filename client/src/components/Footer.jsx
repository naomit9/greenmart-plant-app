import React from 'react'
import { Link, NavLink } from 'react-router-dom'

function Footer() {
  return (
    <footer>
        &copy; CopyRight GreenMart { new Date().getFullYear() }
    </footer>
  )
}

export default Footer