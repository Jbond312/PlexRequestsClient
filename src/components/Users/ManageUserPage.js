import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as Selectors from '../redux/selectors/usersSelectors';
import {
  getUsers,
  getUserRoles,
  updateUser,
} from '../redux/actions/userActions';
import Spinner from '../common/Spinner';
import UserForm from './UserForm';
import { toast } from 'react-toastify';

const ManageUserPage = ({
  users,
  userRoles,
  getUsers,
  getUserRoles,
  updateUser,
  ...props
}) => {
  const [user, setUser] = useState({ ...props.user });
  const [errors, setErrors] = useState({});
  const [allUserRoles, setAllUserRoles] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (userRoles.length === 0) {
      getUserRoles();
    } else {
      setAllUserRoles([...userRoles]);
    }
  }, [userRoles.length]);

  useEffect(() => {
    if (users.length === 0) {
      getUsers();
    } else {
      setUser({ ...props.user });
    }
  }, [users.length]);

  useEffect(() => {
    if (userRoles.length > 0 && users.length > 0) {
      setLoaded(true);
    }
  }, [userRoles.length, users.length]);

  function handRoleChanged({ target }) {
    if (target.checked) {
      setUser({ ...user, roles: [...user.roles, target.name] });
    } else {
      const removedRoles = user.roles.filter((role) => role !== target.name);
      setUser({ ...user, roles: removedRoles });
    }
  }

  function handUserDisabled({ target }) {
    setUser({ ...user, isDisabled: target.checked });
  }

  function handleSave(event) {
    event.preventDefault();
    console.log(user);
    if (!isFormValid()) {
      return;
    }
    console.log('SAVE');

    updateUser(user).then(() => {
      toast.success('User updated successfully');
    });
  }

  function isFormValid() {
    const error = {};

    if (!user.username) error.username = 'Username is required';

    setErrors(error);

    return Object.keys(error).length === 0;
  }

  return !loaded ? (
    <Spinner />
  ) : (
    <>
      <UserForm
        user={user}
        userRoles={allUserRoles}
        onRoleChanged={handRoleChanged}
        onDisable={handUserDisabled}
        onSave={handleSave}
        errors={errors}
      />
    </>
  );
};

ManageUserPage.propTypes = {
  users: PropTypes.array.isRequired,
  userRoles: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired,
  getUserRoles: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  const userRoles = Selectors.getUserRoles(state);
  const users = Selectors.getUsers(state);
  const userId = ownProps.match.params.id;
  return {
    userRoles: userRoles,
    user: users.find((user) => user.id === parseInt(userId, 10)) || newCourse,
    users: users,
  };
}

const mapDispatchToProps = {
  getUsers,
  getUserRoles,
  updateUser,
};

const newCourse = {
  id: undefined,
  username: '',
  isDisabled: false,
  lastLogin: undefined,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageUserPage);
