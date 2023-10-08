import { FaCertificate, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { policys } from '~/../data';
import Facebook from '~/assets/imgs/facebook-icon.png';
import Logo from '~/assets/imgs/logo.png';
import LogoBCT from '~/assets/imgs/logo_bct.png';
import PaymentMasterCard from '~/assets/imgs/payment_mastercard.svg';
import PaymentPaypal from '~/assets/imgs/payment_paypal.svg';
import PaymentVisa from '~/assets/imgs/payment_visa.svg';
import Shopee from '~/assets/imgs/shopee-icon.png';
import Youtube from '~/assets/imgs/youtube-icon.png';
import Button from '../Button/Button';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='container'>
        <div className='footer-main'>
          <div className='footer-col'>
            <div className='footer-logo'>
              <Link to='/'>
                <img src={Logo} alt='' />
              </Link>
            </div>

            <span className='footer-span'>Hộ Kinh Doanh Kicap</span>

            <ul className='footer-menu'>
              <li>
                <FaCertificate></FaCertificate> Chứng nhận ĐKKD số: 01B8021375 do phòng TC-KH UBND
                quận Tây Hồ cấp ngày 13/07/2022
              </li>
              <li>
                <FaMapMarkerAlt></FaMapMarkerAlt> 38, ngõ 575 Kim Mã, Ba Đình, Hà Nội
              </li>
              <li>
                <FaPhoneAlt></FaPhoneAlt>{' '}
                <a className='text-hover-primary' href='tel:0369161095'>
                  0369161095
                </a>
              </li>
              <li>
                <FaEnvelope></FaEnvelope>{' '}
                <a className='text-hover-primary' href='mailto:kicap.vn@gmail.com'>
                  kicap.vn@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <div className='footer-col'>
            <h3 className='footer-title'>Chính sách khách hàng</h3>

            <ul className='footer-menu had-click'>
              {policys.map((policy) => {
                return (
                  <li key={policy.id}>
                    <Link className='text-hover-primary' to={`/policy/${policy.navigate}`}>
                      {policy.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className='footer-col'>
            <h3 className='footer-title'>Đăng ký nhận tin</h3>
            <p className='footer-text'>
              Mua bàn phím cơ, keycap bộ, keycap lẻ, keycap resin. Bảo hành chính hãng. Ưu đãi khi
              mua online. Dịch vụ mods phím cơ uy tín, chất lượng.
            </p>
            <form id='footer-form' action='/subcrible'>
              <input
                type='text'
                placeholder='Email của bạn'
                className='footer-subcrible'
                name='email'
              />
              <Button type='button' primary className='footer-btn'>
                Đăng ký
              </Button>
            </form>

            <div className='footer-payment'>
              <div>
                <img src={PaymentVisa} alt='' />
              </div>
              <div>
                <img src={PaymentMasterCard} alt='' />
              </div>
              <div>
                <img src={PaymentPaypal} alt='' />
              </div>
            </div>
          </div>
          <div className='footer-col'>
            <h3 className='footer-title'>Liên kết mạng xã hội</h3>
            <ul className='footer-social'>
              <li>
                <a href='https://www.facebook.com/Kicap.vn' target='_blank' rel='noreferrer'>
                  <img src={Facebook} alt='' />
                </a>
              </li>
              <li>
                <a href='https://www.youtube.com/@kicap' target='_blank' rel='noreferrer'>
                  <img src={Youtube} alt='' />
                </a>
              </li>
              <li>
                <a href='https://shopee.vn/kicap.vn' target='_blank' rel='noreferrer'>
                  <img src={Shopee} alt='' />
                </a>
              </li>
            </ul>

            <div className='footer-logo-bct'>
              <a href='http://online.gov.vn/Home/WebDetails/99557' target='_blank' rel='noreferrer'>
                <img src={LogoBCT} alt='' />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className='footer-copyright'>
        <div className='container'>
          <h3>© Copyright 2021 | Kicap | All Rights Reserved</h3>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
