import { useEffect, useState } from "react";
import products from "../data";
import Header from "./components/Header/Header";
import HeroSlider from "./components/HeroSlider/HeroSlider";
import SectionProduct from "./components/SectionProduct/SectionProduct";
import FeatureProductBlock from "./components/FeatureProductBlock/FeatureProductBlock";
import Footer from "./components/Footer/Footer";

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
      <SectionProduct products={productState} title="Sản phẩm" strongTitle="mới"></SectionProduct>
      <SectionProduct products={keyboardCustom} title="Bàn phím cơ" strongTitle="custom" arrows></SectionProduct>
      <SectionProduct products={productState} title="Bộ sưu tập keycap" strongTitle="Cherry"></SectionProduct>
      <FeatureProductBlock></FeatureProductBlock>
      <SectionProduct products={productState} title="Switch" strongTitle="Cho bàn phím cơ"></SectionProduct>
      <SectionProduct products={productState} title="Phụ kiện cho" strongTitle="Bàn phím cơ"></SectionProduct>
      <Footer></Footer>
    </div>
  );
}

export default App;
