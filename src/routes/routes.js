import SideBar from '~/components/Admin/SideBar/SideBar';
import config from '~/config/index.js';
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
import Login from '~/pages/admin/Login/Login';

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
    component: SideBar,
    layout: null,
  },
];

export { privateRoutes, publicRoutes };
