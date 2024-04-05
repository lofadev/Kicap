import config from '~/config/index.js';
import AdminLayout from '~/layouts/AdminLayout/AdminLayout';
import Account from '~/pages/Account/Account';
import Blog from '~/pages/Blog/Blog';
import Cart from '~/pages/Cart/Cart.jsx';
import Contact from '~/pages/Contact/Contact.jsx';
import Home from '~/pages/Home/Home.jsx';
import Introduce from '~/pages/Introduce/Introduce.jsx';
import News from '~/pages/News/News.jsx';
import NotFound from '~/pages/NotFound/NotFound';
import Policy from '~/pages/Policy/Policy.jsx';
import ProductCategory from '~/pages/ProductCategory/ProductCategory.jsx';
import ProductDetails from '~/pages/ProductDetails/ProductDetails.jsx';
import AddCategory from '~/pages/admin/Category/AddCategory/AddCategory';
import ShowCategory from '~/pages/admin/Category/ShowCategory/ShowCategory';
import UpdateCategory from '~/pages/admin/Category/UpdateCategory/UpdateCategory';
import AddCustomer from '~/pages/admin/Customer/AddCustomer/AddCustomer';
import ShowCustomer from '~/pages/admin/Customer/ShowCustomer/ShowCustomer';
import UpdateCustomer from '~/pages/admin/Customer/UpdateCustomer/UpdateCustomer';
import Dashboard from '~/pages/admin/Dashboard/Dashboard';
import Login from '~/pages/admin/Login/Login';
import AddOrder from '~/pages/admin/Order/AddOrder/AddOrder';
import ShowOrder from '~/pages/admin/Order/ShowOrder/ShowOrder';
import AddProduct from '~/pages/admin/Product/AddProduct/AddProduct';
import AddShipper from '~/pages/admin/Shipper/AddShipper/AddShipper';
import ShowShipper from '~/pages/admin/Shipper/ShowShipper/ShowShipper';
import UpdateShipper from '~/pages/admin/Shipper/UpdateShipper/UpdateShipper';
import ShowProduct from '~/pages/admin/Product/ShowProduct/ShowProduct';
import AddSlideBanner from '~/pages/admin/SlideBanner/AddSlideBanner/AddSlideBanner';
import ShowSlideBanner from '~/pages/admin/SlideBanner/ShowSlideBanner/ShowSlideBanner';
import AddSupplier from '~/pages/admin/Supplier/AddSupplier/AddSupplier';
import ShowSupplier from '~/pages/admin/Supplier/ShowSupplier/ShowSupplier';
import UpdateSupplier from '~/pages/admin/Supplier/UpdateSupplier/UpdateSupplier';
import AddProductImage from '~/pages/admin/ProductImage/AddProductImage/AddProductImage';
import UpdateProductImage from '~/pages/admin/ProductImage/UpdateProductImage/UpdateProductImage';

const publicRoutes = [
  {
    path: config.routes.home,
    component: Home,
  },
  {
    path: config.routes.product_details,
    component: ProductDetails,
  },
  {
    path: config.routes.news,
    component: News,
  },
  {
    path: config.routes.introduce,
    component: Introduce,
  },
  {
    path: config.routes.contact,
    component: Contact,
  },
  {
    path: config.routes.policy,
    component: Policy,
  },
  {
    path: config.routes.product_category,
    component: ProductCategory,
  },
  {
    path: config.routes.collections_all,
    component: ProductCategory,
  },
  {
    path: config.routes.blog,
    component: Blog,
  },
  {
    path: config.routes.account,
    component: Account,
  },
  {
    path: config.routes.cart,
    component: Cart,
  },
  {
    path: config.routes.notfound,
    component: NotFound,
  },
  {
    path: config.routes.admin.login,
    component: Login,
    layout: null,
  },
];

const privateRoutes = [
  {
    path: config.routes.admin.dashboard,
    component: Dashboard,
    layout: AdminLayout,
  },
  {
    path: config.routes.admin.product.add,
    component: AddProduct,
    layout: AdminLayout,
  },
  {
    path: config.routes.admin.product.view,
    component: ShowProduct,
    layout: AdminLayout,
  },
  {
    path: config.routes.admin.category.add,
    component: AddCategory,
    layout: AdminLayout,
  },
  {
    path: config.routes.admin.category.update,
    component: UpdateCategory,
    layout: AdminLayout,
  },
  {
    path: config.routes.admin.category.view,
    component: ShowCategory,
    layout: AdminLayout,
  },
  {
    path: config.routes.admin.slide.add,
    component: AddSlideBanner,
    layout: AdminLayout,
  },
  {
    path: config.routes.admin.slide.view,
    component: ShowSlideBanner,
    layout: AdminLayout,
  },
  {
    path: config.routes.admin.supplier.add,
    component: AddSupplier,
    layout: AdminLayout,
  },
  {
    path: config.routes.admin.supplier.update,
    component: UpdateSupplier,
    layout: AdminLayout,
  },
  {
    path: config.routes.admin.supplier.view,
    component: ShowSupplier,
    layout: AdminLayout,
  },
  {
    path: config.routes.admin.shipper.add,
    component: AddShipper,
    layout: AdminLayout,
  },
  {
    path: config.routes.admin.shipper.update,
    component: UpdateShipper,
    layout: AdminLayout,
  },
  {
    path: config.routes.admin.shipper.view,
    component: ShowShipper,
    layout: AdminLayout,
  },
  {
    path: config.routes.admin.customers.view,
    component: ShowCustomer,
    layout: AdminLayout,
  },
  {
    path: config.routes.admin.customers.add,
    component: AddCustomer,
    layout: AdminLayout,
  },
  {
    path: config.routes.admin.customers.update,
    component: UpdateCustomer,
    layout: AdminLayout,
  },
  {
    path: config.routes.admin.orders.add,
    component: AddOrder,
    layout: AdminLayout,
  },
  {
    path: config.routes.admin.orders.view,
    component: ShowOrder,
    layout: AdminLayout,
  },
  {
    path: config.routes.admin.product.image.add,
    component: AddProductImage,
    layout: AdminLayout,
  },
  {
    path: config.routes.admin.product.image.update,
    component: UpdateProductImage,
    layout: AdminLayout,
  },
];

export { privateRoutes, publicRoutes };
