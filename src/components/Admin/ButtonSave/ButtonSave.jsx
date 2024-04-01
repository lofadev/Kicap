import { FaSave } from 'react-icons/fa';
import './ButtonSave.scss';

const ButtonSave = ({ handleSave, disabled }) => {
  return (
    <button type='submit' className='button-save' onClick={handleSave} disabled={disabled}>
      <FaSave /> Lưu dữ liệu
    </button>
  );
};

export default ButtonSave;
