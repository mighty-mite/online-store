import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CartProduct } from '../../service/types';

export interface InitialState {
  items: PushedItem[];
}

export interface PushedItem {
  cartProduct: CartProduct;
  amount: number;
  id: number;
}

const initialState: InitialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: {
      reducer: (state, action: PayloadAction<PushedItem>) => {
        state.items.push(action.payload);
      },
      prepare: (cartProduct: CartProduct) => {
        const amount = 1;
        const { id } = cartProduct;
        return { payload: { amount, id, cartProduct } };
      },
    },
    increase: (state, action: PayloadAction<number>) => {
      state.items.forEach((item) => {
        if (item.id === action.payload) {
          // eslint-disable-next-line no-param-reassign
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
          // eslint-disable-next-line no-param-reassign
          item.amount -= 1;
        }
      });
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      state.items.splice(index, 1);
    },
  },
});

const { actions, reducer } = cartSlice;
export default reducer;
export const { addItem, increase, decrease, deleteItem } = actions;
