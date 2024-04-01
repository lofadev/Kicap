import { TbArrowBack } from 'react-icons/tb';
import Button from '~/components/Button/Button';
import ButtonSave from '../ButtonSave/ButtonSave';
import './ButtonAction.scss';

const ButtonAction = ({ to, handleSave, isSubmitting }) => {
  return (
    <div className='button-actions'>
      <Button secondary className='button-back' to={to}>
        <TbArrowBack /> Quay lại
      </Button>
      <ButtonSave handleSave={handleSave} disabled={isSubmitting} />
    </div>
  );
};

export default ButtonAction;
