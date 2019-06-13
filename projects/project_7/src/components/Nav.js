import React from 'react';
import { NavLink } from 'react-router-dom';

// The Nav component sets up the default buttons.
const Nav = () => {
  return (
    <nav className="main-nav">
      <ul>
        <li><NavLink to="/cat">Cats</NavLink></li>
        <li><NavLink to="/dog">Dogs</NavLink></li>
        <li><NavLink to="/laptop">Laptops</NavLink></li>
      </ul>
    </nav>
  );
}

export default Nav;