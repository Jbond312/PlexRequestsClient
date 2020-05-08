import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import Spinner from '../common/Spinner';
import UsersList from './UsersList';
import { getUsers, getIsLoading } from '../redux/selectors/usersSelectors';
import * as userActions from '../redux/actions/userActions';

const UsersPage = ({ actions, users, isLoading }) => {
  useEffect(() => {
    if (users.length === 0) {
      actions.getUsers();
    }
  }, [users.length]);

  return (
    <>
      <h1>Users</h1>

      {isLoading ? <Spinner /> : <UsersList users={users}></UsersList>}
    </>
  );
};

UsersPage.propTypes = {
  actions: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    users: getUsers(state),
    isLoading: getIsLoading(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getUsers: bindActionCreators(userActions.getUsers, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);
