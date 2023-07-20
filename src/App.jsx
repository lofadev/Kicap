import products from "../data";
import Header from "./components/Header/Header";
import HeroSlider from "./components/HeroSlider/HeroSlider";
import SectionProduct from "./components/SectionProduct/SectionProduct";

function App() {
  return (
    <div className="wrapper">
      <Header></Header>
      <HeroSlider></HeroSlider>
      <SectionProduct products={products}></SectionProduct>
    </div>
  );
}

export default App;
