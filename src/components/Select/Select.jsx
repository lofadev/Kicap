import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function SelectOptions({ options, optionDefault, id, value, handleOnChange }) {
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <Select value={value} onChange={handleOnChange} displayEmpty id={id} defaultValue={value}>
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
  );
}
