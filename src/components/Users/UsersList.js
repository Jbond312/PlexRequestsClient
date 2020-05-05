import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const UsersList = ({ users }) => {
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Disabled</th>
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
                <td>{user.isDisabled === false ? 'No' : 'Yes'}</td>
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
