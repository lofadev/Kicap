import { useEffect, useState } from "react";
import { news, products } from "../../../data";
import FeatureProductBlock from "../../components/FeatureProductBlock/FeatureProductBlock";
import HeroSlider from "../../components/HeroSlider/HeroSlider";
import SectionNews from "../../components/SectionNews/SectionNews";
import SectionProduct from "../../components/SectionProduct/SectionProduct";

const Home = () => {
  const [productState] = useState(products);
  const [newsState] = useState(news);
  const [newProducts, setNewProducts] = useState([]);
  const [keyboardCustoms, setKeyboardCustoms] = useState([]);
  const [keycaps, setKeycaps] = useState([]);
  const [switchs, setSwitchs] = useState([]);
  const [accessorys, setAccessorys] = useState([]);

  useEffect(() => {
    document.title = "Kicap - More inspirational";
    const newProductsArr = [];
    const keyboardCustomsArr = [];
    const keycapsArr = [];
    const switchsArr = [];
    const accessorysArr = [];
    for (let i = productState.length - 1; i >= 0; i--) {
      if (
        newProductsArr.length == 4 &&
        keyboardCustomsArr.length == 4 &&
        keycapsArr.length == 4 &&
        switchsArr.length == 4
      )
        break;
      if (productState[i].type == "bàn phím cơ") {
        keyboardCustomsArr.push(productState[i]);
      } else if (productState[i].type == "keycap bộ") {
        keycapsArr.push(productState[i]);
      } else if (productState[i].type == "switch") {
        switchsArr.push(productState[i]);
      } else if (productState[i].type == "phụ kiện") {
        accessorysArr.push(productState[i]);
      }
      newProductsArr.push(productState[i]);
    }
    setNewProducts(newProductsArr);
    setKeyboardCustoms(keyboardCustomsArr);
    setKeycaps(keycapsArr);
    setSwitchs(switchsArr);
    setAccessorys(accessorysArr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <HeroSlider></HeroSlider>
      <SectionProduct max="4" products={newProducts} title="Sản phẩm" strongTitle="mới"></SectionProduct>
      <SectionProduct products={keyboardCustoms} title="Bàn phím cơ" strongTitle="custom" arrows></SectionProduct>
      <SectionProduct max="4" products={keycaps} title="Bộ sưu tập keycap" strongTitle="Cherry"></SectionProduct>
      <FeatureProductBlock></FeatureProductBlock>
      <SectionProduct max="4" products={switchs} title="Switch" strongTitle="Cho bàn phím cơ"></SectionProduct>
      <SectionProduct max="4" products={accessorys} title="Phụ kiện cho" strongTitle="Bàn phím cơ"></SectionProduct>
      <SectionNews max="4" news={newsState} title="Tin tức" strongTitle="Kicap"></SectionNews>
    </>
  );
};

export default Home;
