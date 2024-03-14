import { IoClose } from 'react-icons/io5';
import { FaCheck } from 'react-icons/fa6';
import { IoWarningOutline, IoInformation } from 'react-icons/io5';
import './ToastMessage.scss';

const ToastMessage = ({ status, title, message, handleClose }) => {
  return (
    <div className={`toast ${status}`}>
      <div className='toast-icon'>
        {status === 'success' && <FaCheck />}
        {status === 'failure' && <IoWarningOutline />}
        {status === 'info' && <IoInformation />}
        {status === 'warning' && <FaCheck />}
      </div>
      <div className='toast-body'>
        <h3 className='toast-title'>{title}</h3>
        <p className='toast-message'>{message}</p>
      </div>
      <div className='toast-close' onClick={handleClose}>
        <IoClose />
      </div>
    </div>
  );
};

export default ToastMessage;
