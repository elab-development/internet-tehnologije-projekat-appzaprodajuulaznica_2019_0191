import React from 'react';
import { TextField } from '@mui/material';

const FormTextField = ({ name, label, value, onChange, type = 'text', required = false, fullWidth = true, ...props }) => {
  return (
    <TextField
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      type={type}
      required={required}
      fullWidth={fullWidth}
      margin="normal"
      {...props}
    />
  );
};

export default FormTextField;