import React from 'react';

import './Spinner.css';

const ToggleSwitch = (props) => {
  return (
    <>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider round"></span>
      </label>
    </>
  );
};

export default ToggleSwitch;
