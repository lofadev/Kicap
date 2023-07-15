import Logo from "../../assets/imgs/logo.png";
import Cart from "../../assets/imgs/add-to-basket.svg";
import "./Header.scss";

const Header = () => {
  return (
    <div className="container">
      <div className="top_header">
        <div className="top_header-text">
          <span>Hotline tư vấn: </span>
          <a href="tel:0369161095">0369161095</a>
        </div>

        <div className="top_header-logo">
          <img src={Logo} alt="" />
        </div>

        <div className="top_header-features">
          <ul>
            <li>
              <a href="#">Tài khoản</a>
            </li>

            <li>
              <a href="">
                Giỏ hàng
                <img src={Cart} alt="" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
