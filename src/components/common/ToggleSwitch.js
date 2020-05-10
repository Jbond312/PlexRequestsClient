import React from 'react';
import PropTypes from 'prop-types';

import './Spinner.css';

const ToggleSwitch = ({ name, onChange, value, disabled = false }) => {
  return (
    <>
      <label className="switch">
        <input
          type="checkbox"
          name={name}
          className="col-sm-10"
          checked={value}
          onChange={onChange}
          disabled={disabled}
        />
        <span className="slider round"></span>
      </label>
    </>
  );
};

ToggleSwitch.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default ToggleSwitch;
