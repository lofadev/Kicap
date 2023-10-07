import './ProductCategory.scss';

const ProductCategory = () => {
  const productCategoryHeaderStyle = {
    height: '360px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage:
      'url("https://bizweb.dktcdn.net/100/436/596/collections/53820d484a9f88c1d18e.jpg?v=1658977734810")',
  };

  return (
    <div className='product-category'>
      <div className='product-category-header' style={productCategoryHeaderStyle}>
        <div className='container'>
          <div className='product-category-header-content'>
            <h1>Mods bàn phím cơ</h1>
            <p className='product-category-header-desc'>
              Kicap với đội ngũ mods chuyên nghiệp luôn mong muốn mang đến trải nghiệm mods phím
              tuyệt vời và đúng gu của khách hàng nhất có thể
            </p>
          </div>
        </div>
      </div>

      <div className='container'>
        <div className='product-category-main'>
          <aside className='product-category-sidebar'>
            <aside className='aside-item'>
              <div className='aside-title'>
                <h3>Danh mục</h3>
              </div>
              <div className='aside-content'>
                <ul className='nav nav-category'></ul>
              </div>
            </aside>
          </aside>
          <section className='product-category-content'></section>
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;
