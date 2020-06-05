import React from "react";

const TextField = ({value, label}) => (
  <div className="text-field">
    <label className='text-label'>{label}</label>
    <div className='text-value'>{typeof value == "object" ? (value ? value.toString() : "") : value}</div>
  </div>
);

export default TextField;
