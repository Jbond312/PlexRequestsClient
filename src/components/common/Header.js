import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import * as Selectors from '../redux/selectors/authSelectors';
import { connect } from 'react-redux';

const activeStyle = { color: '#E9A049' };

const Header = ({ isAuthenticated }) => {
  return (
    <div id="header">
      <NavLink exact to="/" activeStyle={activeStyle}>
        Home
      </NavLink>
      {' | '}
      <NavLink to="/users" activeStyle={activeStyle}>
        Users
      </NavLink>
      <NavLink
        to={'/' + (isAuthenticated ? 'logout' : 'login')}
        activeStyle={activeStyle}
        style={{ float: 'right' }}
      >
        {isAuthenticated ? 'Logout' : 'Login'}
      </NavLink>
    </div>
  );
};

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: Selectors.getIsLoggedIn(state),
  };
}

export default connect(mapStateToProps)(Header);
