import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orderItems: [],
  shippingAddress: {},
  outOfStock: false,
  paymentMethod: '',
  shippingPrice: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addOrderProduct(state, action) {
      const orderItem = action.payload;
      const itemOrder = state.orderItems?.find(
        (item) => item.title === orderItem.title && item.variant === orderItem.variant
      );
      if (itemOrder) {
        if (itemOrder.quantity < itemOrder.stock) {
          itemOrder.quantity += orderItem.quantity;
          state.outOfStock = false;
        } else state.outOfStock = true;
      } else {
        state.outOfStock = false;
        state.orderItems.push(orderItem);
      }
    },
  },
});

export const { addOrderProduct } = cartSlice.actions;
export default cartSlice.reducer;
