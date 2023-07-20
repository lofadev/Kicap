import Img1 from "./src/assets/imgs/img1.png";
import Img1_1 from "./src/assets/imgs/img1_1.png";
import Img2 from "./src/assets/imgs/img2.jpg";
import Img2_1 from "./src/assets/imgs/img2_1.jpg";
import Img3 from "./src/assets/imgs/img3.png";
import Img3_1 from "./src/assets/imgs/img3_1.png";
import Img4 from "./src/assets/imgs/img4.png";
import Img4_1 from "./src/assets/imgs/img4_1.png";

const products = [
  {
    id: 1,
    image1: Img1,
    image2: Img1_1,
    title: "Bộ keycap cherry doraemon",
    price: "525.000",
    salePrice: "399.000",
    brand: "Stooges",
    type: "Keycap bộ",
    isHovered: false,
  },
  {
    id: 2,
    image1: Img2,
    image2: Img2_1,
    title: "Túi đựng bàn phím, chống sốc, chống xước",
    price: "80.000",
    salePrice: "69.000",
    brand: "Kelowna",
    type: "Phụ kiện bàn phím",
    isHovered: false,
  },
  {
    id: 3,
    image1: Img3,
    image2: Img3_1,
    title: "Bộ keycap silent forest",
    price: "780.000",
    salePrice: null,
    brand: "Cmk",
    type: "Keycap bộ",
    isHovered: false,
  },
  {
    id: 4,
    image1: Img4,
    image2: Img4_1,
    title: "Bàn phím cơ cmk75 | fl-esports",
    price: "2.550.000",
    salePrice: "2.199.000",
    brand: "Fl - esports",
    type: "Bàn phím cơ",
    isHovered: false,
  },
];

export default products;
