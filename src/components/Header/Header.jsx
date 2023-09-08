import { FaAngleDown } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";

import { useEffect, useState } from "react";
import Cart from "../../assets/imgs/add-to-basket.svg";
import Logo from "../../assets/imgs/logo.png";
import Search from "../../assets/imgs/search.svg";
import "./Header.scss";

const menu = [
  {
    id: 1,
    name: "Trang chủ",
    hasChild: false,
    navigate: "/",
  },
  {
    id: 2,
    name: "Keycap bộ",
    hasChild: true,
    navigate: "/keycap-bo",
    children: [
      { id: 1, title: "Keycap Cherry", navigate: "/keycap-cherry" },
      { id: 2, title: "Keycap xuyên led", navigate: "/keycap-xuyen-led" },
      { id: 3, title: "Keycap SA", navigate: "/keycap-sa" },
      { id: 4, title: "Keycap XDA", navigate: "/keycap-xda" },
      { id: 5, title: "Keycap OEM", navigate: "/keycap-oem" },
    ],
  },
  {
    id: 3,
    name: "Mods phím",
    hasChild: false,
    navigate: "/mods-ban-phim-co",
  },
  {
    id: 4,
    name: "Pre-order",
    hasChild: false,
    navigate: "/pre-order",
  },
  {
    id: 5,
    name: "Decor",
    hasChild: false,
    navigate: "/den-decor",
  },
  {
    id: 6,
    name: "Sản phẩm",
    hasChild: true,
    navigate: "/collections/all",
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
    navigate: "/tin-tuc",
  },
  {
    id: 8,
    name: "Về kicap",
    hasChild: true,
    navigate: "/gioi-thieu",
    children: [
      { id: 1, title: "Giới thiệu", navigate: "/gioi-thieu" },
      { id: 2, title: "Liên hệ", navigate: "/lien-he" },
      { id: 3, title: "Chính sách bảo hành", navigate: "/policy/chinh-sach-bao-hanh" },
      { id: 4, title: "Chính sách đổi trả", navigate: "/policy/chinh-sach-doi-tra-hang-hoan-tien" },
    ],
  },
];

const Header = () => {
  const [isActive, setIsActive] = useState(1);

  const location = useLocation();

  const handleClickMenuItem = (id) => {
    setIsActive(id);
  };

  useEffect(() => {
    const isActiveMenu = menu.some((item) => {
      return item.navigate === location.pathname;
    });
    if (!isActiveMenu) setIsActive(0);
  }, [location]);

  return (
    <header className="header">
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
              <li key={item.id} className={`nav-items ${item.hasChild && !item.hasMega ? "has-childs" : ""}`}>
                <Link
                  onClick={() => handleClickMenuItem(item.id)}
                  className={`nav-link ${item.id === isActive ? "active" : ""}`}
                  to={item.navigate}
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
                        <Link to={itemChild.navigate}>{itemChild.title}</Link>
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
