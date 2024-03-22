import { TbArrowBack } from 'react-icons/tb';
import Button from '~/components/Button/Button';
import ButtonSave from '../ButtonSave/ButtonSave';
import './ButtonAction.scss';

const ButtonAction = ({ to, handleSave }) => {
  return (
    <div className='button-actions'>
      <Button type='a' secondary className='button-back' to={to}>
        <TbArrowBack /> Quay lại
      </Button>
      <ButtonSave handleSave={handleSave} />
    </div>
  );
};

export default ButtonAction;
