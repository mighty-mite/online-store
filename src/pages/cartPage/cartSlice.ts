import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product } from '../../service/types';

interface InitialState {
  items: Product[];
}

const initialState: InitialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
    },
  },
});

const { actions, reducer } = cartSlice;
export default reducer;
export const { addItem } = actions;
