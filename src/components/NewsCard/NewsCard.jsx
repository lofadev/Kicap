import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import unidecode from 'unidecode';
import './NewsCard.scss';

const NewsCard = ({ newItem, height = 182 }) => {
  const titleParam = unidecode(newItem.title.toLowerCase()).split(' ').join('-');
  let desc = '';
  newItem.paragraph.forEach((item, index) => {
    if (index < 2) {
      item.forEach((subItem) => {
        desc = desc.concat(subItem.data);
      });
    }
    desc += ' ';
  });
  return (
    <div className='news-card'>
      <Link to={`/news/${titleParam}`}>
        <div className='news-card-img' style={{ height: height }}>
          <img src={newItem.image} alt='' />
        </div>
        <div className='news-card-main'>
          <h3 className='news-card-title'>{newItem.title}</h3>
          <p className='news-card-desc'>{desc}</p>
        </div>
      </Link>
    </div>
  );
};

NewsCard.propTypes = {
  newItem: PropTypes.object.isRequired,
};

export default NewsCard;
