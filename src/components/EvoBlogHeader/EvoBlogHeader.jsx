import Proptypes from 'prop-types';
import { useEffect } from 'react';
import './EvoBlogHeader.scss';

const EvoBlogHeader = ({ title }) => {
  useEffect(() => {
    document.title = title + ' | Kicap';
  }, [title]);
  return (
    <div className='evo-blog-header'>
      <div className='container'>
        <div className='evo-blog-header-content'>
          <h1>{title}</h1>
        </div>
      </div>
    </div>
  );
};

EvoBlogHeader.propTypes = {
  title: Proptypes.string.isRequired,
};

export default EvoBlogHeader;
