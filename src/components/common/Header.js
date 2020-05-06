import React from 'react';
import { NavLink } from 'react-router-dom';

const activeStyle = { color: '#E9A049' };

const Header = () => {
  return (
    <>
      <NavLink exact to="/" activeStyle={activeStyle}>
        Home
      </NavLink>
      {' | '}
      <NavLink to="/users" activeStyle={activeStyle}>
        Users
      </NavLink>
    </>
  );
};

export default Header;
