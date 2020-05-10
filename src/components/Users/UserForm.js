import React from 'react';
import PropTypes from 'prop-types';
import Separator from '../common/Separator';
import InlineLabel from '../common/InlineLabel';
import ToggleSwitch from '../common/ToggleSwitch';

const UserForm = ({ user, onChange, onSave = {} }) => {
  return (
    <>
      <h2 style={{ marginBottom: '50px' }}>Manage User</h2>
      <form className="form" onSubmit={onSave}>
        <InlineLabel label="User Id" value={user.id} />
        <Separator />
        <InlineLabel label="Username" value={user.username} />
        <Separator />
        <div style={{ display: 'inline-block' }}>
          <label style={{ width: '100px', marginRight: '100px' }}>
            Disabled
          </label>
          <ToggleSwitch
            name="isDisabled"
            value={user.isDisabled}
            onChange={(e) => onChange(e, user)}
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
      </form>
      <Separator />
      <InlineLabel label="Roles" value="ROLES TO GO HERE" />
      <Separator />
      <button type="submit" className="btn btn-save">
        Save
      </button>
    </>
  );
};

UserForm.propTypes = {
  user: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

export default UserForm;
