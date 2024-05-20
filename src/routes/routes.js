import config from '~/config/index.js';
import AdminLayout from '~/layouts/AdminLayout/AdminLayout';
import Account from '~/pages/Account/Account';
import LoginPage from '~/pages/Account/components/Login/Login';
import NewPassword from '~/pages/Account/components/NewPassword/NewPassword';
import RegisterPage from '~/pages/Account/components/Register/Register';
import ResetPassword from '~/pages/Account/components/ResetPassword/ResetPassword';
import Blog from '~/pages/Blog/Blog';
import Cart from '~/pages/Cart/Cart.jsx';
import Checkout from '~/pages/Checkout/Checkout';
import Contact from '~/pages/Contact/Contact.jsx';
import Home from '~/pages/Home/Home.jsx';
import Introduce from '~/pages/Introduce/Introduce.jsx';
import News from '~/pages/News/News.jsx';
import NotFound from '~/pages/NotFound/NotFound';
import Policy from '~/pages/Policy/Policy.jsx';
import ProductCategory from '~/pages/ProductCategory/ProductCategory.jsx';
import ProductDetails from '~/pages/ProductDetails/ProductDetails.jsx';
import Search from '~/pages/Search/Search';
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
import ShowProduct from '~/pages/admin/Product/ShowProduct/ShowProduct';
import UpdateProduct from '~/pages/admin/Product/UpdateProduct/UpdateProduct';
import AddProductImage from '~/pages/admin/ProductImage/AddProductImage/AddProductImage';
import UpdateProductImage from '~/pages/admin/ProductImage/UpdateProductImage/UpdateProductImage';
import AddProductVariant from '~/pages/admin/ProductVariant/AddProductVariant/AddProductVariant';
import UpdateProductVariant from '~/pages/admin/ProductVariant/UpdateProductVariant/UpdateProductVariant';
import AddShipper from '~/pages/admin/Shipper/AddShipper/AddShipper';
import ShowShipper from '~/pages/admin/Shipper/ShowShipper/ShowShipper';
import UpdateShipper from '~/pages/admin/Shipper/UpdateShipper/UpdateShipper';
import AddSlideBanner from '~/pages/admin/SlideBanner/AddSlideBanner/AddSlideBanner';
import ShowSlideBanner from '~/pages/admin/SlideBanner/ShowSlideBanner/ShowSlideBanner';
import UpdateSlideBanner from '~/pages/admin/SlideBanner/UpdateSlideBanner/UpdateSlideBanner';
import AddSupplier from '~/pages/admin/Supplier/AddSupplier/AddSupplier';
import ShowSupplier from '~/pages/admin/Supplier/ShowSupplier/ShowSupplier';
import UpdateSupplier from '~/pages/admin/Supplier/UpdateSupplier/UpdateSupplier';
import TransactionResult from '~/pages/transaction_result/TransactionResult';

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
    path: config.routes.account.login,
    component: LoginPage,
  },
  {
    path: config.routes.account.register,
    component: RegisterPage,
  },
  {
    path: config.routes.notfound,
    component: NotFound,
  },
  {
    path: config.routes.search,
    component: Search,
  },
  {
    path: config.routes.account.reset_password,
    component: ResetPassword,
  },
  {
    path: config.routes.account.new_password,
    component: NewPassword,
  },
];

const privateRoutes = [
  {
    path: config.routes.account.index,
    component: Account,
  },
  {
    path: config.routes.account.type,
    component: Account,
  },
  {
    path: config.routes.cart,
    component: Cart,
  },
  {
    path: config.routes.admin.login,
    component: Login,
    layout: null,
  },
  {
    path: config.routes.checkout,
    component: Checkout,
  },
  {
    path: config.routes.transaction_result,
    component: TransactionResult,
  },
];

const adminRoutes = [
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
    path: config.routes.admin.slide.update,
    component: UpdateSlideBanner,
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
  {
    path: config.routes.admin.product.variant.add,
    component: AddProductVariant,
    layout: AdminLayout,
  },
  {
    path: config.routes.admin.product.variant.update,
    component: UpdateProductVariant,
    layout: AdminLayout,
  },
  {
    path: config.routes.admin.product.update,
    component: UpdateProduct,
    layout: AdminLayout,
  },
];

export { adminRoutes, publicRoutes, privateRoutes };
