import config from "../config/index.js";
import Home from "../pages/Home/Home.jsx";
const publicRoutes = [
  {
    path: config.routes.home,
    component: Home,
  },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
