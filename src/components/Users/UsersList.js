import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ToggleSwitch from '../common/ToggleSwitch';

const UsersList = ({ users }) => {
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
                <td>{user.lastLogin}</td>
                <td className="switchCol">
                  <ToggleSwitch />
                </td>
                {/* <td>{user.isDisabled === false ? 'No' : 'Yes'}</td> */}
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
};

export default UsersList;
