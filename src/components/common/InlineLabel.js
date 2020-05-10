import React from 'react';
import PropTypes from 'prop-types';

const InlineLabel = ({ label, value }) => {
  return (
    <div className="form-group row">
      <label className="col-sm-2 col-form-label">{label}</label>
      <label className="col-sm-10">{value}</label>
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
