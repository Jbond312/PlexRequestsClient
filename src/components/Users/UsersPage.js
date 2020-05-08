import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import Spinner from '../common/Spinner';
import UsersList from './UsersList';
import { getUsers, getIsLoading } from '../redux/selectors/usersSelectors';
import * as userActions from '../redux/actions/userActions';
import { toast } from 'react-toastify';

const UsersPage = ({ actions, users, isLoading }) => {
  useEffect(() => {
    if (users.length === 0) {
      actions.getUsers();
    }
  }, [users.length]);

  function handleUserDisabled(event, user) {
    const updatedUser = { ...user, isDisabled: event.target.checked };
    actions.updateUser(updatedUser).catch(() => {
      toast.error('There was an error when updating the user');
    });
  }

  return (
    <>
      <h1 style={{ marginBottom: '50px' }}>Users</h1>

      {isLoading ? (
        <Spinner />
      ) : (
        <UsersList users={users} onChange={handleUserDisabled}></UsersList>
      )}
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
      updateUser: bindActionCreators(userActions.updateUser, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);
