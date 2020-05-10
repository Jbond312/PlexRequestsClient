import React from 'react';
import PropTypes from 'prop-types';

import Separator from '../common/Separator';
import InlineLabel from '../common/InlineLabel';
import ToggleSwitch from '../common/ToggleSwitch';
import { connect } from 'react-redux';

const UserForm = ({
  user,
  userRoleMap,
  onRoleChanged,
  onDisable,
  onSave = {},
}) => {
  return (
    <>
      <h2 style={{ marginBottom: '50px' }}>Manage User</h2>
      <form className="form" onSubmit={onSave}>
        <InlineLabel label="User Id" value={user.id} />
        <Separator />
        <InlineLabel label="Username" value={user.username} />
        <Separator />
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Disabled</label>
          <ToggleSwitch
            name="isDisabled"
            value={user.isDisabled === true}
            onChange={onDisable}
          />
        </div>
        <Separator />
        <InlineLabel
          label="Last Login"
          value={
            (user.lastLogin &&
              new Intl.DateTimeFormat('en-GB', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: false,
              }).format(Date.parse(user.lastLogin))) ||
            'Never logged in'
          }
        />
        <Separator />
        <div className="form-group row">
          <div className="col-sm-2">Roles</div>
          <div className="col-sm-10">
            {user.roles &&
              userRoleMap.map((role) => {
                return (
                  <div
                    key={role.name}
                    className="form-check row"
                    style={{ marginLeft: '1px', marginBottom: '10px' }}
                  >
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name={role.name}
                      style={{ width: '15px', height: '15px' }}
                      id={role.name}
                      checked={role.checked}
                      onChange={onRoleChanged}
                    />
                    <label className="form-check-label" htmlFor={role.name}>
                      {role.name}
                    </label>
                  </div>
                );
              })}
          </div>
        </div>
        <Separator />
        <button type="submit" className="btn btn-save">
          Save
        </button>
      </form>
    </>
  );
};

UserForm.propTypes = {
  user: PropTypes.object.isRequired,
  userRoles: PropTypes.array.isRequired,
  userRoleMap: PropTypes.array.isRequired,
  onRoleChanged: PropTypes.func.isRequired,
  onDisable: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

function mapStateToProps(_, ownProps) {
  let userRoleMap = [];
  if (ownProps.user && ownProps.userRoles) {
    userRoleMap = ownProps.userRoles.map((role) => {
      return {
        name: role,
        checked: ownProps.user.roles.includes(role),
      };
    });
  }
  return {
    userRoleMap: userRoleMap,
  };
}

export default connect(mapStateToProps)(UserForm);
