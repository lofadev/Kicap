import { Link } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa6";

import Logo from "../../assets/imgs/logo.png";
import Cart from "../../assets/imgs/add-to-basket.svg";
import Search from "../../assets/imgs/search.svg";
import "./Header.scss";
import { useState } from "react";

const menu = [
  {
    id: 1,
    name: "Trang chủ",
    hasChild: false,
  },
  {
    id: 2,
    name: "Keycap bộ",
    hasChild: true,
  },
  {
    id: 3,
    name: "Mods phím",
    hasChild: false,
  },
  {
    id: 4,
    name: "Pre-order",
    hasChild: false,
  },
  {
    id: 5,
    name: "Decor",
    hasChild: false,
  },
  {
    id: 6,
    name: "Sản phẩm",
    hasChild: true,
  },
  {
    id: 7,
    name: "Blog",
    hasChild: false,
  },
  {
    id: 8,
    name: "Về kicap",
    hasChild: true,
  },
];

const Header = () => {
  const [isActive, setIsActive] = useState(1);

  const handleClickMenuItem = (id) => {
    setIsActive(id);
  };
  return (
    <div className="container">
      <div className="top_header">
        <div className="top_header-text">
          <span>Hotline tư vấn: </span>
          <a href="tel:0369161095">0369161095</a>
        </div>

        <div className="top_header-logo">
          <a href="">
            <img src={Logo} alt="" />
          </a>
        </div>

        <div className="top_header-right">
          <ul className="top_header-features">
            <li className="top_header-account">
              <a href="#">Tài khoản</a>
            </li>

            <li className="top_header-cart">
              <a href="">
                Giỏ hàng <img src={Cart} alt="" />
                <span className="top_header-count_item">0</span>
              </a>
            </li>

            <li className="top_header-search">
              <a href="">
                <img src={Search} alt="" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <nav className="nav">
        <ul className="nav-menu">
          {menu.map((item) => (
            <li key={item.id} className="nav-items">
              <Link
                onClick={() => handleClickMenuItem(item.id)}
                className={`nav-link ${item.id === isActive ? "active" : ""}`}
                to="/"
              >
                {item.name}
                {item.hasChild ? (
                  <span>
                    <FaAngleDown></FaAngleDown>
                  </span>
                ) : (
                  <></>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
