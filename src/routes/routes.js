import config from "../config/index.js";
import Home from "../pages/Home/Home.jsx";
import News from "../pages/News/News.jsx";
import ProductDetails from "../pages/ProductDetails/ProductDetails.jsx";
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
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
