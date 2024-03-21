import { FaSave } from 'react-icons/fa';
import Button from '~/components/Button/Button';
import './ButtonSave.scss';

const ButtonSave = () => {
  return (
    <Button type='button' className='button-save'>
      <FaSave /> Lưu dữ liệu
    </Button>
  );
};

export default ButtonSave;
