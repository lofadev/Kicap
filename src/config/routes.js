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
      add: '/admin/products/add',
      view: '/admin/products',
    },
    category: {
      add: '/admin/categorys/add',
      update: '/admin/categorys/update/:id',
      view: '/admin/categorys',
    },
    type: {
      add: '/admin/types/add',
      view: '/admin/types',
    },
    slide: {
      add: '/admin/slides/add',
      view: '/admin/slides',
    },
    supplier: {
      add: '/admin/suppliers/add',
      update: '/admin/suppliers/update/:id',
      view: '/admin/suppliers',
    },
    shipper: {
      add: '/admin/shippers/add',
      update: '/admin/shippers/update/:id',
      view: '/admin/shippers',
    },
    employee: {
      add: '/admin/employees/add',
      view: '/admin/employees',
    },
    orders: {
      add: '/admin/orders/add',
      view: '/admin/orders',
    },
    customers: 'admin/customers',
  },
};

export default routes;
