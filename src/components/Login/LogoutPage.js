import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as Selectors from '../redux/selectors/authSelectors';
import { logout } from '../redux/actions/authActions';

const LogoutPage = ({ actions, isLoggedOut }) => {
  useEffect(() => {
    actions.logout();
  }, []);

  return (
    <>{isLoggedOut ? <Redirect to="/login" /> : <h1>Logging out...</h1>}</>
  );
};

LogoutPage.propTypes = {
  actions: PropTypes.object.isRequired,
  isLoggedOut: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    isLoggedOut: Selectors.getIsNotAuthenticated(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      logout: bindActionCreators(logout, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutPage);
