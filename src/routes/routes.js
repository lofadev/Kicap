import config from "../config/index.js";
import Contact from "../pages/Contact/Contact.jsx";
import Home from "../pages/Home/Home.jsx";
import Introduce from "../pages/Introduce/Introduce.jsx";
import News from "../pages/News/News.jsx";
import ProductDetails from "../pages/ProductDetails/ProductDetails.jsx";
import ReturnPolicy from "../pages/ReturnPolicy/ReturnPolicy.jsx";
import WarrantyPolicy from "../pages/WarrantyPolicy/WarrantyPolicy.jsx";

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
    path: config.routes.warranty_policy,
    component: WarrantyPolicy,
  },
  {
    path: config.routes.return_policy,
    component: ReturnPolicy,
  },
];

const privateRoutes = [];

export { privateRoutes, publicRoutes };
