import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import NotFoundImg from '~/assets/imgs/404.webp';
import SectionBreadCrumb from '~/components/SectionBreadCrumb/SectionBreadCrumb';
import './NotFound.scss';

const NotFound = () => {
  useEffect(() => {
    document.title = '404 Không tìm thấy trang | Kicap';
  }, []);
  return (
    <div className='not-found'>
      <SectionBreadCrumb child='404 Không tìm thấy trang'></SectionBreadCrumb>
      <div className='container' style={{ textAlign: 'center' }}>
        <div className='image-404'>
          <img src={NotFoundImg} alt='' />
        </div>

        <h1 className='title-head'>Lỗi không tìm thấy trang</h1>
        <p className='land'>
          Có vẻ như các trang mà bạn đang cố gắng tiếp cận không tồn tại nữa hoặc có thể nó vừa di
          chuyển.
        </p>
        <Link to='/' className='btn btn-secondary btn_go-home'>
          Về trang chủ
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
