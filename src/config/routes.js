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
      show: '/admin/product/view',
    },
    category: {
      add: '/admin/category/add',
      show: '/admin/category/view',
    },
    type: {
      add: '/admin/type/add',
      show: '/admin/type/view',
    },
    slide: {
      add: '/admin/slide/add',
      show: '/admin/slide/view',
    },
    customers: 'admin/customers/view',
    orders: 'admin/orders/view',
  },
};

export default routes;
