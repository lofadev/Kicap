import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import NewsCard from '../NewsCard/NewsCard';
import './SectionNews.scss';

const SectionNews = ({ news, title, strongTitle, max = 4 }) => {
  const maxLen = parseInt(max);

  const txtButton = 'Xem tất cả';

  return (
    <section className='section-news'>
      <div className='container'>
        <h2 className='section-title-head'>
          <Link to='/' className='text-hover-primary'>
            {title} <strong>{strongTitle}</strong>
          </Link>
        </h2>

        <div className='news-block'>
          {news.map((item, index) => {
            if (index < maxLen) {
              return <NewsCard key={item.id} newItem={item}></NewsCard>;
            }
          })}
        </div>

        <div style={{ textAlign: 'center' }}>
          <Button type='a' primary className='btn-more'>
            {txtButton}
          </Button>
        </div>
      </div>
    </section>
  );
};

SectionNews.propTypes = {
  news: PropTypes.array.isRequired,
  title: PropTypes.string,
  strongTitle: PropTypes.string,
  txtButton: PropTypes.node,
  max: PropTypes.string,
};

export default SectionNews;
