import Proptypes from 'prop-types';
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

        <Button type='a' primary className='btn-more'>
          {txtButton}
        </Button>
      </div>
    </section>
  );
};

SectionNews.propTypes = {
  news: Proptypes.array.isRequired,
  title: Proptypes.string,
  strongTitle: Proptypes.string,
  txtButton: Proptypes.node,
  max: Proptypes.string,
};

export default SectionNews;
