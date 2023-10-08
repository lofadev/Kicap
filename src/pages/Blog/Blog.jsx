import { useState } from 'react';
import { news } from '~/../data';
import EvoBlogHeader from '~/components/EvoBlogHeader/EvoBlogHeader';
import NewsCard from '~/components/NewsCard/NewsCard';
import Pagination from '~/components/Pagination/Pagination';
import './Blog.scss';

const Blog = () => {
  const [pageCount] = useState(() => Math.ceil(news.length / 6));

  return (
    <div className='blog'>
      <EvoBlogHeader
        title='Tin tức'
        desc='Nơi chúng tôi chia sẻ những bài viết thú vị dựa trên những kinh nghiệm sau nhiều năm sử dụng và làm việc...'
        image={
          'https://bizweb.dktcdn.net/100/436/596/themes/834446/assets/evo-blog-banner.jpg?1689998079606'
        }
        height={360}
        color='white'
      />

      <div className='blog-main'>
        <div className='container'>
          <div className='blog-container'>
            {news.map((item) => (
              <NewsCard key={item.id} newItem={item} height={247} />
            ))}
          </div>
          <Pagination pageCount={pageCount == 1 ? 0 : pageCount} />
        </div>
      </div>
    </div>
  );
};

export default Blog;
