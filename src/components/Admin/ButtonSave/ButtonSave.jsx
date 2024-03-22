import { FaSave } from 'react-icons/fa';
import './ButtonSave.scss';

const ButtonSave = ({ handleSave }) => {
  return (
    <button type='' className='button-save' onClick={handleSave}>
      <FaSave /> Lưu dữ liệu
    </button>
  );
};

export default ButtonSave;
