import React from "react";
import PropTypes from "prop-types";

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
                <td>{user.username}</td>
                <td>{user.isDisabled === false ? "No" : "Yes"}</td>
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
