import PropTypes from 'prop-types';
import { FaAngleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './SectionBreadCrumb.scss';
import { convertToSlug } from '~/utils';

const SectionBreadCrumb = ({ parent, child, navigate }) => {
  const slug = convertToSlug(parent);
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
            <Link to={`/${navigate ?? slug}`} state={{ type: parent }}>
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
