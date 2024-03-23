/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Service from '../../service/Service';

interface InitialState {
  allProducts: [];
  productsFiltered: [];
  cardsOnPage: [];
  sortMode: string;
  loading: boolean;
  offset: number;
}

const initialState: InitialState = {
  allProducts: [],
  productsFiltered: [],
  cardsOnPage: [],
  sortMode: '',
  loading: true,
  offset: 0,
};

export const fetchProducts = createAsyncThunk(
  'allProducts/fetchProducts',
  () => {
    const service = new Service();
    return service.getProducts();
  }
);

const goodsSlice = createSlice({
  name: 'goodsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.allProducts = action.payload;
    });
  },
});

const { actions, reducer } = goodsSlice;
export default reducer;
