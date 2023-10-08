/* eslint-disable react/no-unescaped-entities */
import IntroduceImg1 from '~/assets/imgs/introduce_img1.jpg';
import IntroduceImg2 from '~/assets/imgs/introduce_img2.jpg';
import EvoBlogHeader from '~/components/EvoBlogHeader/EvoBlogHeader';
import './Introduce.scss';

const Introduce = () => {
  return (
    <section className='introduce'>
      <EvoBlogHeader
        title='Giới thiệu'
        image={
          'https://bizweb.dktcdn.net/100/436/596/themes/834446/assets/evo-page-banner.jpg?1689998079606'
        }
        color='black'
      ></EvoBlogHeader>
      <div className='container'>
        <div className='introduce-top'>
          <h1 className='introduce-head'>KICAP - MORE INSPIRATIONAL!</h1>
          <p className='introduce-desc'>/ki - cáp/!</p>
          <p className='introduce-desc'>
            Chúng tôi ra đời với sứ mệnh mang đến không gian làm việc độc đáo và sáng tạo cho mọi
            người.
          </p>

          <p className='introduce-img'>
            <img src={IntroduceImg1} alt='' />
            <img src={IntroduceImg2} alt='' />
          </p>
        </div>

        <section className='introduce-more'>
          <p>CẢM HỨNG HƠN?</p>
          <p>Đó luôn là mục tiêc chúng tôi hướng đến.</p>
          <p>Và cũng là tinh thần "More inspirational" chúng tôi khát khao truyền tải.</p>
          <p>
            Với những sản phẩm được lựa chọn một cách tỉ mỉ và cẩn thận trong khâu đánh giá chất
            lượng. Chắc chắn, điều này sẽ giúp các bạn có một trải nghiệm hoàn hảo khi sử dụng sản
            phẩm của chúng tôi. Chúc các bạn luôn vui vẻ, sáng tạo và tràn đầy năng lượng mỗi khi
            bắt đầu làm việc. Thanks!
          </p>
        </section>
      </div>
    </section>
  );
};

export default Introduce;
