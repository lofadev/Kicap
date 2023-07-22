import { useEffect, useState } from "react";
import products from "../data";
import Header from "./components/Header/Header";
import HeroSlider from "./components/HeroSlider/HeroSlider";
import SectionProduct from "./components/SectionProduct/SectionProduct";

function App() {
  const [productState, setProductState] = useState(products);
  const [keyboardCustom, setKeyboardCustom] = useState(products);

  useEffect(() => {
    const newProduct = productState.filter((item) => item.id <= 4);

    setProductState(newProduct);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="wrapper">
      <Header></Header>
      <HeroSlider></HeroSlider>
      <SectionProduct
        products={productState}
        title="Sản phẩm"
        strongTitle="mới"
        txtButton="Xem tất cả . Sản phẩm mới"
      ></SectionProduct>
      <SectionProduct
        products={keyboardCustom}
        title="Bàn phím cơ"
        strongTitle="custom"
        txtButton="Xem tất cả . Bàn phím cơ custom"
        arrows
      ></SectionProduct>
      <SectionProduct
        products={productState}
        title="Bộ sưu tạp keycap"
        strongTitle="Cherry"
        txtButton="Xem tất cả . Bộ sưu tập keycap cherry"
      ></SectionProduct>
    </div>
  );
}

export default App;
