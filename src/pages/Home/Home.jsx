import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { news } from '~/../data';
import FeatureProductBlock from '~/components/FeatureProductBlock/FeatureProductBlock';
import HeroSlider from '~/components/HeroSlider/HeroSlider';
import SectionNews from '~/components/SectionNews/SectionNews';
import SectionProduct from '~/components/SectionProduct/SectionProduct';
import ProductService from '~/services/ProductService';

const Home = () => {
  const dispatch = useDispatch();
  const [newsState] = useState(news);
  const [newProducts, setNewProducts] = useState([]);
  const [keyboardCustoms, setKeyboardCustoms] = useState([]);
  const [keycaps, setKeycaps] = useState([]);
  const [switchs, setSwitchs] = useState([]);
  const [accessorys, setAccessorys] = useState([]);

  useEffect(() => {
    document.title = 'Kicap - More inspirational';
    const fetchData = async () => {
      const [newProducts, keyboards, keycaps, switchs, accessorys] = await Promise.all([
        ProductService.getProducts({}, dispatch),
        ProductService.getProducts({ limit: 6, category: 'Bàn phím cơ' }, dispatch),
        ProductService.getProducts({ limit: 4, category: 'Keycap bộ' }, dispatch),
        ProductService.getProducts({ limit: 4, category: 'Switch' }, dispatch),
        ProductService.getProducts({ limit: 4, category: 'Phụ kiện' }, dispatch),
      ]);
      if (newProducts.status === 'OK') setNewProducts(newProducts.data);
      if (keyboards.status === 'OK') setKeyboardCustoms(keyboards.data);
      if (keycaps.status === 'OK') setKeycaps(keycaps.data);
      if (switchs.status === 'OK') setSwitchs(switchs.data);
      if (accessorys.status === 'OK') setAccessorys(accessorys.data);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <HeroSlider></HeroSlider>
      <SectionProduct
        products={newProducts}
        title='Sản phẩm'
        strongTitle='mới'
        navigate='products'
      ></SectionProduct>
      <SectionProduct
        products={keyboardCustoms}
        title='Bàn phím cơ'
        strongTitle='custom'
        navigate='products?category=Bàn phím cơ'
      ></SectionProduct>
      <SectionProduct
        products={keycaps}
        title='Bộ sưu tập'
        strongTitle='keycap bộ'
        navigate='products?category=keycap'
      ></SectionProduct>
      <FeatureProductBlock></FeatureProductBlock>
      <SectionProduct
        products={switchs}
        title='Switch'
        strongTitle='Cho bàn phím cơ'
        navigate='products?category=switch'
      ></SectionProduct>
      <SectionProduct
        products={accessorys}
        title='Phụ kiện cho'
        strongTitle='Bàn phím cơ'
        navigate='products?category=Phụ kiện'
      ></SectionProduct>
      <SectionNews
        news={newsState}
        title='Tin tức'
        strongTitle='Kicap'
        navigate='tin-tuc'
      ></SectionNews>
    </>
  );
};

export default Home;
