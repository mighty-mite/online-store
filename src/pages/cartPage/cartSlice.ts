import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CartProduct } from '../../service/types';

export interface InitialState {
  items: PushedItem[];
}

export interface PushedItem {
  cartProduct: CartProduct;
  amount: number;
}

const initialState: InitialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // addItem: (state, action: PayloadAction<CartProduct>) => {
    //   state.items.push(action.payload);
    // },
    addItem: {
      reducer: (state, action: PayloadAction<PushedItem>) => {
        state.items.push(action.payload);
      },
      prepare: (cartProduct: CartProduct) => {
        const amount = 1;
        return { payload: { amount, cartProduct } };
      },
    },
  },
});

const { actions, reducer } = cartSlice;
export default reducer;
export const { addItem } = actions;
