import React from 'react';
import PropTypes from 'prop-types';

import TextInput from '../common/TextInput';
import PasswordInput from '../common/PasswordInput';

const LoginForm = ({ loginData, onChange, onSave, canSave, errors }) => {
  return (
    <>
      <h2>Login</h2>
      <form className="form" onSubmit={onSave}>
        <TextInput
          name="username"
          label="Username"
          value={loginData.username}
          onChange={onChange}
          error={errors.username}
        />
        <PasswordInput
          name="password"
          label="Password"
          value={loginData.password}
          onChange={onChange}
          error={errors.password}
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!canSave}
          value="LOGIN"
        >
          Login
        </button>
      </form>
    </>
  );
};

LoginForm.propTypes = {
  loginData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  canSave: PropTypes.bool.isRequired,
  errors: PropTypes.object,
};

export default LoginForm;
