import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import BaseRadio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import PropTypes from 'prop-types';
import './Radio.scss';

export default function Radio({ labelName, options, name, formik }) {
  const { setFieldValue, values } = formik;
  const handleChangeRadio = (e) => {
    setFieldValue(name, e.target.value);
  };
  return (
    <FormControl>
      <FormLabel id='demo-radio-buttons-group-label'>{labelName}</FormLabel>
      <RadioGroup
        aria-labelledby='demo-radio-buttons-group-label'
        name='radio-buttons-group'
        value={values[name]}
      >
        {options.map((option) => (
          <FormControlLabel
            onChange={handleChangeRadio}
            key={option.value}
            value={option.value}
            control={<BaseRadio />}
            label={option.name}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

Radio.propTypes = {
  labelName: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
};
