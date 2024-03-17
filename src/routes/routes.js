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
import AddCategory from '~/pages/admin/AddCategory/AddCategory';
import AddProduct from '~/pages/admin/AddProduct/AddProduct';
import AddSlideBanner from '~/pages/admin/AddSlideBanner/AddSlideBanner';
import AddType from '~/pages/admin/AddType/AddType';
import Customer from '~/pages/admin/Customer/Customer';
import Dashboard from '~/pages/admin/Dashboard/Dashboard';
import Login from '~/pages/admin/Login/Login';
import Order from '~/pages/admin/Order/Order';
import ShowCategory from '~/pages/admin/ShowCategory/ShowCategory';
import ShowProduct from '~/pages/admin/ShowProduct/ShowProduct';
import ShowSlideBanner from '~/pages/admin/ShowSlideBanner/ShowSlideBanner';
import ShowType from '~/pages/admin/ShowType/ShowType';

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
];

const privateRoutes = [
  {
    path: config.routes.admin.login,
    component: Login,
    layout: null,
  },
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
    path: config.routes.admin.type.add,
    component: AddType,
    layout: AdminLayout,
  },
  {
    path: config.routes.admin.type.view,
    component: ShowType,
    layout: AdminLayout,
  },
  {
    path: config.routes.admin.customers,
    component: Customer,
    layout: AdminLayout,
  },
  {
    path: config.routes.admin.orders,
    component: Order,
    layout: AdminLayout,
  },
];

export { privateRoutes, publicRoutes };
