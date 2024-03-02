import { FaArrowAltCircleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './DashboardBox.scss';

const DashboardBox = ({ icon, name, quantity, to, color }) => {
  const Icon = icon;
  return (
    <div className='dashboard-box' style={{ backgroundColor: color }}>
      <div className='dashboard-top'>
        <div className='dashboard-icon'>{<Icon />}</div>
        <div className='dashboard-content'>
          <span className='dashboard-quantity'>{quantity}</span>
          <span className='dashboard-name'>{name}</span>
        </div>
      </div>
      <div className='dashboard-bottom' style={{ color: color }}>
        <Link to={to}>
          <span>Xem chi tiết</span>
          <FaArrowAltCircleRight />
        </Link>
      </div>
    </div>
  );
};

export default DashboardBox;
