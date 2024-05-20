import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orderItems: [],
  shippingAddress: {},
  paymentMethod: '',
  shippingPrice: 0,
  totalPrice: 0,
};

const getItemOrderBySku = (state, sku) => {
  const itemOrder = state.orderItems?.find((item) => item.sku === sku);
  return itemOrder;
};

const calcTotalPrice = (state) => {
  const totalPrice = state.orderItems.reduce((acc, item) => {
    return acc + item.quantity * item.price;
  }, 0);
  return totalPrice;
};

const calcShippingPrice = (state) => {
  return state.totalPrice < 800000 ? 30000 : 0;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addOrderProduct(state, action) {
      const orderItem = action.payload;
      const itemOrder = getItemOrderBySku(state, orderItem.sku);
      if (itemOrder) {
        itemOrder.quantity += orderItem.quantity;
      } else {
        state.orderItems.push(orderItem);
      }
      state.totalPrice = calcTotalPrice(state);
      state.shippingPrice = calcShippingPrice(state);
    },
    increaseAmount(state, action) {
      const sku = action.payload;
      const itemOrder = getItemOrderBySku(state, sku);
      itemOrder.quantity++;
      state.totalPrice = calcTotalPrice(state);
      state.shippingPrice = calcShippingPrice(state);
    },
    decreaseAmount(state, action) {
      const sku = action.payload;
      const itemOrder = getItemOrderBySku(state, sku);
      if (itemOrder.quantity > 1) itemOrder.quantity--;
      state.totalPrice = calcTotalPrice(state);
      state.shippingPrice = calcShippingPrice(state);
    },
    removeOrderProduct(state, action) {
      const sku = action.payload;
      const newItemOrders = state.orderItems.filter((item) => item.sku !== sku);
      state.orderItems = newItemOrders;
      state.totalPrice = calcTotalPrice(state);
      state.shippingPrice = calcShippingPrice(state);
    },
    setAmount(state, action) {
      const { sku, quantity } = action.payload;
      const itemOrder = getItemOrderBySku(state, sku);
      itemOrder.quantity = quantity;
      state.totalPrice = calcTotalPrice(state);
      state.shippingPrice = calcShippingPrice(state);
    },
    resetCart(state) {
      state.orderItems = [];
    },
  },
});

export const {
  addOrderProduct,
  increaseAmount,
  decreaseAmount,
  removeOrderProduct,
  setAmount,
  resetCart,
} = cartSlice.actions;
export default cartSlice.reducer;
