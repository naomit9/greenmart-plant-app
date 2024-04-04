import React from 'react'
import { Link, NavLink } from 'react-router-dom'

function Footer() {
  return (
    <footer>
        &copy; CopyRight { new Date().getFullYear() }
    </footer>
  )
}

export default Footer