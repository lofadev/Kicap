import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useState } from 'react';
import './Select.scss';

export default function SelectOptions({
  labelName,
  required,
  options,
  optionDefault,
  name,
  formik,
  value = 'id',
}) {
  const { errors, handleChange, values, touched } = formik;
  const error = errors[name];
  const hasError = touched[name] && error;
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={`form-group ${hasError ? 'has-error' : ''}`}>
      {labelName && (
        <label htmlFor={name} onClick={handleOpen}>
          {labelName} {required && <span className='required'>*</span>}
        </label>
      )}
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={values[name]}
          onChange={handleChange}
          displayEmpty
          defaultValue={values[name]}
          open={open}
          onOpen={handleOpen}
          onClose={handleClose}
          id={name}
          name={name}
        >
          {optionDefault && (
            <MenuItem value='' sx={{ fontSize: '1.4rem', padding: 0 }}>
              {optionDefault}
            </MenuItem>
          )}
          {options &&
            options.map((option) => (
              <MenuItem key={option.id} value={option[value]}>
                {option.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      {hasError && <span className='form-error'>{error}</span>}
    </div>
  );
}
