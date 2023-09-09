import { FaAngleDown } from "react-icons/fa6";
import { Link } from "react-router-dom";

import { useState } from "react";
import Cart from "../../assets/imgs/add-to-basket.svg";
import Logo from "../../assets/imgs/logo.png";
import Search from "../../assets/imgs/search.svg";
import FormSearch from "../FormSearch/FormSearch";
import "./Header.scss";

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
    children: [
      { id: 1, title: "Keycap Cherry", navigator: "/keycap-cherry" },
      { id: 2, title: "Keycap xuyên led", navigator: "/keycap-xuyen-led" },
      { id: 3, title: "Keycap SA", navigator: "/keycap-sa" },
      { id: 4, title: "Keycap XDA", navigator: "/keycap-xda" },
      { id: 5, title: "Keycap OEM", navigator: "/keycap-oem" },
    ],
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
    hasMega: true,
    children: [
      {
        id: 1,
        title: "Keycap bộ",
        subtitle: ["Silent forest", "SA Harry Potter", "Keycap Polar Day"],
      },
      {
        id: 2,
        title: "Keycap lẻ",
        subtitle: ["PIKACHU ALU", "CARD VGA", "CỜ ĐẢNG BÚA LIỀM"],
      },
      {
        id: 3,
        title: "Đèn decor",
        subtitle: ["", "", ""],
      },
      {
        id: 4,
        title: "Bàn phím cơ",
        subtitle: ["Monsgeek M1W", "FL CMK75", "Finalkey V81 Plus"],
      },
      {
        id: 5,
        title: "Switch",
        subtitle: ["WS Morandi", "KTT Matcha", "Akko Cream Yellow Pro"],
      },
      {
        id: 6,
        title: "Phụ kiện",
        subtitle: ["Túi đựng bàn phím", "Dụng cụ thay keycap", "Chổi quét phím"],
      },
    ],
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
    children: [
      { id: 1, title: "Giới thiệu", navigator: "/gioi-thieu" },
      { id: 2, title: "Liên hệ", navigator: "/lien-he" },
      { id: 3, title: "Chính sách bảo hành", navigator: "/chinh-sach-bao-hanh" },
      { id: 4, title: "Chính sách đổi trả", navigator: "/chinh-sach-doi-tra-hang-hoan-tien" },
    ],
  },
];

const Header = () => {
  const [isActive, setIsActive] = useState(1);
  const [searchActive, setSearchActive] = useState(false);

  const handleClickMenuItem = (id) => {
    setIsActive(id);
  };
  const handleToggleInSearch = (prev) => {
    setSearchActive(!prev);
  };
  return (
    <header className="header">
      <div className={`overlay ${searchActive ? "search-active" : ""}`} onClick={handleToggleInSearch}></div>
      <FormSearch onClick={handleToggleInSearch} searchActive={searchActive} />
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

              <li className="top_header-search" onClick={() => handleToggleInSearch()}>
                <img src={Search} alt="" />
              </li>
            </ul>
          </div>
        </div>

        <nav className="nav">
          <ul className="nav-menu">
            {menu.map((item) => (
              <li key={item.id} className={`nav-items ${item.hasChild && !item.hasMega ? "has-childs" : ""}`}>
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
                {item.hasChild && !item.hasMega ? (
                  <ul className="dropdown-menu">
                    {item.children.map((itemChild, index) => (
                      <li key={index} className="dropdown-items">
                        <Link to={itemChild.navigator}>{itemChild.title}</Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  ""
                )}
                {item.hasChild && item.hasMega ? (
                  <div className="mega-menu">
                    {item.children.map((item) => (
                      <div key={item.id} className="mega-items">
                        <Link to="/" className="mega-title">
                          {item.title}
                        </Link>
                        <ul>
                          {item.subtitle.map((subItem, index) => (
                            <li key={index}>
                              <Link to="/">{subItem}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  ""
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
