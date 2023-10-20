import PropTypes from 'prop-types';
import { FaAngleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import unidecode from 'unidecode';
import './SectionBreadCrumb.scss';

const SectionBreadCrumb = ({ parent = null, child = null }) => {
  const parentParam =
    parent &&
    unidecode(parent.toLowerCase())
      .split(' ')
      .map((word) => word.replace(/[^\w\s-]/g, ''))
      .filter((word) => word !== '-')
      .join('-');

  return (
    <div className='bread-crumb'>
      <div className='container'>
        <h3>
          <Link to={'/'}>
            <span className='bread-crumb-group text-hover-primary'>Trang chủ</span>
          </Link>
          <span className='arrow-right'>
            <FaAngleRight />
          </span>
          {parent && (
            <Link to={`/${parentParam}`}>
              <span className='bread-crumb-group text-hover-primary'>{parent}</span>
              {child && (
                <span className='arrow-right'>
                  <FaAngleRight />
                </span>
              )}
            </Link>
          )}
          {child && <span className='current-active'>{child}</span>}
        </h3>
      </div>
    </div>
  );
};

SectionBreadCrumb.propTypes = {
  parent: PropTypes.string,
  child: PropTypes.string.isRequired,
};

export default SectionBreadCrumb;
