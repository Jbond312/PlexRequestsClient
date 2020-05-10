import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { getAuthStatus } from './redux/actions/authActions';
import Header from './common/Header';
import HomePage from './HomePage';
import UsersPage from './Users/UsersPage';
import PageNotFound from './PageNotFound';
import ManageUserPage from './Users/ManageUserPage';
import LoginPage from './Login/LoginPage';
import { connect } from 'react-redux';
import LogoutPage from './Login/LogoutPage';

const App = ({ getAuthStatus }) => {
  useEffect(() => {
    getAuthStatus();
  }, []);

  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/logout" component={LogoutPage} />
        <Route path="/user/:id" component={ManageUserPage} />
        <Route path="/users" component={UsersPage} />
        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
};

App.propTypes = {
  getAuthStatus: PropTypes.func.isRequired,
};

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = {
  getAuthStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
