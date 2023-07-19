import "./SectionProduct.scss";
import products from "../../../data.js";
import { useEffect } from "react";

const SectionProduct = () => {
  useEffect(() => {
    console.log(products);
  }, []);
  return (
    <section className="section_product">
      <div className="container">
        <h2 className="title_blog">
          <a href="" title="Sản phẩm mới">
            Sản phẩm <strong>mới</strong>
          </a>
        </h2>
        <div className="product_block">abs</div>
      </div>
    </section>
  );
};

export default SectionProduct;
