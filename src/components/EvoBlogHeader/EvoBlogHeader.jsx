import PropTypes from 'prop-types';
import { useEffect } from 'react';
import './EvoBlogHeader.scss';

const EvoBlogHeader = ({ title, desc, height = 250, image, color }) => {
  useEffect(() => {
    document.title = title + ' | Kicap';
  }, [title]);

  const styleBlogHeader = {
    color: color,
    height: `${height}px`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: `url(${image})`,
  };

  return (
    <div className='evo-blog-header' style={styleBlogHeader}>
      <div className='container'>
        <div className='evo-blog-content'>
          <h1>{title}</h1>
          {desc && <p className='evo-blog-desc'>{desc}</p>}
        </div>
      </div>
    </div>
  );
};

EvoBlogHeader.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string,
};

export default EvoBlogHeader;
