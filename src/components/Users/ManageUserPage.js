import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import * as Selectors from '../redux/selectors/usersSelectors'
import { getUsers } from '../redux/actions/userActions'
import Spinner from '../common/Spinner';
import UserForm from './UserForm';

const ManageUserPage = ({ users, getUsers, loading, ...props }) => {

  const [user, setUser] = useState({ ...props.user })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (users.length === 0) {
      getUsers()
    } else {
      setUser({ ...props.user })
    }
  }, [users.length])

  function handleChange({ target }) {
    setUser({ ...user, [target.name]: target.value })
  }

  function handleSave(event) {
    event.preventDefault()

    if (!isFormValid()) {
      return
    }

    console.log('SAVE')
  }

  function isFormValid() {
    const error = {}

    if (!user.username) error.username = 'Username is required'

    setErrors(error)
  }

  return (
    loading ? (<Spinner />) : (
      <>
        <UserForm user={user} onChange={handleChange} onSave={handleSave} errors={errors} /></>)
  );
};

ManageUserPage.propTypes = {
  users: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
}

function mapStateToProps(state, ownProps) {
  const users = Selectors.getUsers(state);
  const userId = ownProps.match.params.id
  return {
    user: users.find(user => user.id === parseInt(userId, 10)) || newCourse,
    users: users,
    loading: Selectors.getIsLoading(state)
  }
}

const mapDispatchToProps = {
  getUsers
}

const newCourse = {
  id: undefined,
  username: '',
  isDisabled: false,
  lastLogin: undefined
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageUserPage);
