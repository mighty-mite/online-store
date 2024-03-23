/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product } from '../../service/types';

export interface InitialState {
  items: PushedItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
}

export interface PushedItem {
  cartProduct: Product;
  amount: number;
  id: number;
  sum: number;
}

const initialState: InitialState = {
  items: [],
  subtotal: 0,
  shippingFee: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: {
      reducer: (state, action: PayloadAction<PushedItem>) => {
        state.items.push(action.payload);
      },
      prepare: (cartProduct: Product) => {
        const amount = 1;
        const { id } = cartProduct;
        const sum = cartProduct.price;
        return { payload: { amount, id, sum, cartProduct } };
      },
    },
    increase: (state, action: PayloadAction<number>) => {
      state.items.forEach((item) => {
        if (item.id === action.payload) {
          item.amount += 1;
        }
      });
    },
    decrease: (state, action: PayloadAction<number>) => {
      state.items.forEach((item) => {
        if (item.id === action.payload) {
          if (item.amount === 1) {
            return;
          }
          item.amount -= 1;
        }
      });
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      state.items.splice(index, 1);
    },
    clearCart: (state) => {
      state.items.splice(0, state.items.length);
    },
    changeSum: (state, action: PayloadAction<number>) => {
      state.items.forEach((item) => {
        if (item.id === action.payload) {
          item.sum = item.amount * item.cartProduct.price;
        }
      });
    },
    getTotalSum: (state) => {
      let res = 0;
      if (state.items.length === 0) {
        state.subtotal = 0;
      } else {
        state.items.forEach((item) => {
          res += item.sum;
          state.subtotal = res;
        });
      }

      state.shippingFee = Math.round(0.05 * state.subtotal);
      state.total = state.shippingFee + state.subtotal;
    },

    clearTotalSum: (state) => {
      state.subtotal = 0;
      state.shippingFee = 0;
      state.total = 0;
    },
  },
});

const { actions, reducer } = cartSlice;
export default reducer;
export const {
  addItem,
  increase,
  decrease,
  deleteItem,
  clearCart,
  changeSum,
  getTotalSum,
  clearTotalSum,
} = actions;
