import React from 'react';

const UsersList = () => {
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>E-Mail</th>
            <th>Is Enabled</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>User A</td>
            <td>user@email.com</td>
            <td>true</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default UsersList;
