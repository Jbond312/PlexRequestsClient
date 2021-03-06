import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';

import * as Selectors from '../redux/selectors/authSelectors';
import { login } from '../redux/actions/authActions';
import LoginForm from './LoginForm';

const LoginPage = ({ isAuthenticated, login }) => {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [canSave, setCanSave] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setCanSave(false);
      toast.success('Login successful');
    }
  }, [isAuthenticated]);

  function handleChange({ target }) {
    setLoginData({
      ...loginData,
      [target.name]: target.value,
    });
    checkFormValidity();
  }

  function checkFormValidity() {
    const error = {};
    if (!loginData.username) error.username = 'Username is required';
    if (!loginData.password) error.password = 'Password is required';

    setErrors(error);
    setCanSave(Object.keys(error).length == 0);
  }

  function handleSave(event) {
    event.preventDefault();

    if (!canSave) {
      return;
    }

    login(loginData.username, loginData.password);
  }

  return (
    <>
      {isAuthenticated ? (
        <Redirect to="/" />
      ) : (
        <LoginForm
          loginData={loginData}
          errors={errors}
          onChange={handleChange}
          onSave={handleSave}
          canSave={canSave}
        />
      )}
    </>
  );
};

LoginPage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: Selectors.getIsLoggedIn(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: bindActionCreators(login, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
