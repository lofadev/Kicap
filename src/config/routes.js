const routes = {
  home: '/',
  cart: '/cart',
  introduce: '/gioi-thieu',
  contact: '/lien-he',
  blog: '/tin-tuc',
  notfound: '/not-found',
  checkout: '/checkout',
  collections_all: '/collections/all',
  product_details: '/product/:title',
  product_category: '/:title',
  news: '/news/:title',
  policy: 'policy/:title',
  account: {
    register: '/account/register',
    login: '/account/login',
    index: '/account',
    type: '/account/:type',
  },
  search: '/search',
  admin: {
    login: '/admin/login',
    dashboard: 'admin/dashboard',
    product: {
      add: '/admin/product/add',
      update: '/admin/product/update/:id',
      view: '/admin/products',
      image: {
        add: '/admin/product/image/add',
        update: '/admin/product/image/update/:id',
      },
      variant: {
        add: '/admin/product/variant/add',
        update: '/admin/product/variant/update/:id',
      },
      attribute: {
        view: '/admin/product/attributes',
        add: '/admin/product/attribute/add',
        update: '/admin/product/attribute/update/:id',
      },
    },
    category: {
      add: '/admin/category/add',
      update: '/admin/category/update/:id',
      view: '/admin/categories',
    },
    type: {
      add: '/admin/type/add',
      view: '/admin/types',
    },
    slide: {
      add: '/admin/slide/add',
      update: '/admin/slide/update/:id',
      view: '/admin/slides',
    },
    supplier: {
      add: '/admin/supplier/add',
      update: '/admin/supplier/update/:id',
      view: '/admin/suppliers',
    },
    shipper: {
      add: '/admin/shipper/add',
      update: '/admin/shipper/update/:id',
      view: '/admin/shippers',
    },
    orders: {
      add: '/admin/order/add',
      view: '/admin/orders',
    },
    customers: {
      add: 'admin/customer/add',
      update: 'admin/customer/update/:id',
      view: 'admin/customers',
    },
  },
};

export default routes;
