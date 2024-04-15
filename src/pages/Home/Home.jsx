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
        ProductService.getProducts({ limit: 6, type: 'Bàn phím cơ' }, dispatch),
        ProductService.getProducts({ limit: 4, type: 'Keycap bộ' }, dispatch),
        ProductService.getProducts({ limit: 4, type: 'Switch' }, dispatch),
        ProductService.getProducts({ limit: 4, type: 'Phụ kiện' }, dispatch),
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
        navigate='san-pham-moi'
      ></SectionProduct>
      <SectionProduct
        products={keyboardCustoms}
        title='Bàn phím cơ'
        strongTitle='custom'
        navigate='ban-phim-co'
      ></SectionProduct>
      <SectionProduct
        products={keycaps}
        title='Bộ sưu tập keycap'
        strongTitle='Cherry'
        navigate='keycap-cherry'
      ></SectionProduct>
      <FeatureProductBlock></FeatureProductBlock>
      <SectionProduct
        products={switchs}
        title='Switch'
        strongTitle='Cho bàn phím cơ'
        navigate='switch'
      ></SectionProduct>
      <SectionProduct
        products={accessorys}
        title='Phụ kiện cho'
        strongTitle='Bàn phím cơ'
        navigate='phu-kien'
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
