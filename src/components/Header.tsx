import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

export const Header = () => {
    const [isNavExpanded, setIsNavExpanded] = useState(false);


    useEffect(() => {
        console.log("Is Hamburger menu active? =>"+isNavExpanded);
    }, [isNavExpanded])

  return (
    <header>
    <nav className='navbar'>
    <div className='brand-title'>TsunBlog</div>
    <a className="toggle-button" onClick={() => {
        setIsNavExpanded(!isNavExpanded);
    }}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
    </a>
    <div className= {`navbar-links ${isNavExpanded ? "active" : ""}`}>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/create">Create</Link>
            </li>
            <li>
                <Link to="/about">About</Link>
            </li>
        </ul>
    </div>
    </nav>
    </header>
  )
}
export default Header