import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ToggleSwitch from '../common/ToggleSwitch';

const UsersList = ({ users, onChange }) => {
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>User Id</th>
            <th>Username</th>
            <th>Last Login</th>
            <th>Disable</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  <Link to={'/user/' + user.id}>{user.username}</Link>
                </td>
                <td>
                  {(user.lastLogin &&
                    new Intl.DateTimeFormat('en-GB', {
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                      second: 'numeric',
                      hour12: false,
                    }).format(Date.parse(user.lastLogin))) ||
                    'Never logged in'}
                </td>
                <td className="switchCol">
                  <ToggleSwitch
                    name="isDisabled"
                    value={user.isDisabled}
                    onChange={(e) => onChange(e, user)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

UsersList.propTypes = {
  users: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default UsersList;
