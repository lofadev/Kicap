import Button from '~/components/Button/Button';
import ButtonSave from '../ButtonSave/ButtonSave';
import './ButtonAction.scss';
import { TbArrowBack } from 'react-icons/tb';

const ButtonAction = ({ to }) => {
  return (
    <div className='button-actions'>
      <Button type='a' secondary className='button-back' to={to}>
        <TbArrowBack /> Quay lại
      </Button>
      <ButtonSave />
    </div>
  );
};

export default ButtonAction;
