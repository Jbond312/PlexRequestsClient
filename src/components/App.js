import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import Header from './common/Header';
import HomePage from './HomePage';
import UsersPage from './Users/UsersPage';
import PageNotFound from './PageNotFound';
import ManageUserPage from './Users/ManageUserPage';
import LoginPage from './Login/LoginPage';

const App = () => {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/user/:id" component={ManageUserPage} />
        <Route path="/users" component={UsersPage} />
        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
};

export default App;
