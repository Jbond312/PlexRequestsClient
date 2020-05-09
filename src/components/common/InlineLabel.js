import React from 'react';
import PropTypes from 'prop-types';

const InlineLabel = ({ label, value }) => {
  return (
    <div style={{ display: 'inline-block' }}>
      <label style={{ width: '100px' }}>{label}</label>
      <label style={{ marginLeft: '100px' }}>{value}</label>
    </div>
  );
};

InlineLabel.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
};

export default InlineLabel;
