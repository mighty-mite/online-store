/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Service from '../../service/Service';

interface InitialState {
  categories: string[];
  brands: string[];
  searchQuery: string;
  minPrice: number;
  maxPrice: number;
}

const initialState: InitialState = {
  categories: [],
  brands: [],
  searchQuery: '',
  minPrice: 1,
  maxPrice: 1,
};

export const fetchPrices = createAsyncThunk(
  'searchSettings/fetchPrices',
  () => {
    const service = new Service();
    return service.getMinMaxPrices();
  }
);

const shopPageSlice = createSlice({
  name: 'searchSettings',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<string>) => {
      state.categories.push(action.payload);
    },
    removeCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter(
        (item) => item !== action.payload
      );
    },
    addBrand: (state, action: PayloadAction<string>) => {
      state.brands.push(action.payload);
    },
    removeBrand: (state, action: PayloadAction<string>) => {
      state.brands = state.brands.filter((item) => item !== action.payload);
    },
    addSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setMinPrice: (state, action: PayloadAction<number>) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action: PayloadAction<number>) => {
      state.maxPrice = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPrices.fulfilled, (state, action) => {
      const [minPrice, maxPrice] = action.payload;
      state.minPrice = minPrice;
      state.maxPrice = maxPrice;
    });
  },
});

const { actions, reducer } = shopPageSlice;
export default reducer;
export const {
  addCategory,
  removeCategory,
  addBrand,
  removeBrand,
  addSearchQuery,
  setMinPrice,
  setMaxPrice,
} = actions;
