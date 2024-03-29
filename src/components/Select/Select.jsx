import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function SelectOptions({
  labelName,
  required,
  options,
  optionDefault,
  name,
  formik,
}) {
  const { errors, handleChange, values, touched } = formik;
  const error = errors[name];
  const hasError = touched[name] && error;

  return (
    <div className={`form-group ${hasError ? 'has-error' : ''}`}>
      {labelName && (
        <label htmlFor={name}>
          {labelName} {required && <span className='required'>*</span>}
        </label>
      )}
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={values[name]}
          onChange={handleChange}
          displayEmpty
          id={name}
          name={name}
          defaultValue={values[name]}
        >
          <MenuItem value='' sx={{ fontSize: '1.4rem', padding: 0 }}>
            {optionDefault}
          </MenuItem>
          {options &&
            options.map((option) => (
              <MenuItem key={option.id} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      {hasError && <span className='form-error'>{error}</span>}
    </div>
  );
}
