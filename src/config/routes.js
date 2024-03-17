const routes = {
  home: '/',
  cart: '/cart',
  introduce: '/gioi-thieu',
  contact: '/lien-he',
  blog: '/tin-tuc',
  notfound: '/not-found',
  collections_all: '/collections/all',
  product_details: '/product/:title',
  product_category: '/:title',
  news: '/news/:title',
  policy: 'policy/:title',
  account: '/account/:type',
  admin: {
    login: '/admin/login',
    logout: '/admin/logout',
    dashboard: 'admin/dashboard',
    product: {
      add: '/admin/product/add',
      view: '/admin/products',
    },
    category: {
      add: '/admin/category/add',
      view: '/admin/categorys',
    },
    type: {
      add: '/admin/type/add',
      view: '/admin/types',
    },
    slide: {
      add: '/admin/slide/add',
      view: '/admin/slides',
    },
    customers: 'admin/customers',
    orders: 'admin/orders',
  },
};

export default routes;
