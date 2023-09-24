import Proptypes from 'prop-types';
import Slider from 'react-slick';
import Button from '../Button/Button';
import NewsCard from '../NewsCard/NewsCard';
import './SectionNews.scss';

const SectionNews = ({ news, title, strongTitle, dots = false, arrows = false, max = 4 }) => {
  const settings = {
    arrows: arrows,
    dots: dots,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };
  const maxLen = parseInt(max);

  const txtButton = 'Xem tất cả';

  return (
    <section className='section-news'>
      <div className='container'>
        <h2 className='news-title'>
          <a href=''>
            {title} <strong>{strongTitle}</strong>
          </a>
        </h2>
        <div className='news-block'>
          <Slider {...settings}>
            {news.map((item, index) => {
              if (index < maxLen) {
                return <NewsCard key={item.id} newItem={item}></NewsCard>;
              }
            })}
          </Slider>
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
  dots: Proptypes.bool,
  arrows: Proptypes.bool,
  max: Proptypes.string,
};

export default SectionNews;
