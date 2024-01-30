/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Service from '../../service/Service';

interface InitialState {
  searchSettings: {
    category: string[];
    brand: string[];
    searchQuery: string;
    minPrice: number;
    maxPrice: number;
  };
}

const initialState: InitialState = {
  searchSettings: {
    category: [],
    brand: [],
    searchQuery: '',
    minPrice: 1,
    maxPrice: 1,
  },
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
      state.searchSettings.category.push(action.payload);
    },
    removeCategory: (state, action: PayloadAction<string>) => {
      state.searchSettings.category = state.searchSettings.category.filter(
        (item) => item !== action.payload
      );
    },
    addBrand: (state, action: PayloadAction<string>) => {
      state.searchSettings.brand.push(action.payload);
    },
    removeBrand: (state, action: PayloadAction<string>) => {
      state.searchSettings.brand = state.searchSettings.brand.filter(
        (item) => item !== action.payload
      );
    },
    addSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchSettings.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPrices.fulfilled, (state, action) => {
      const [minPrice, maxPrice] = action.payload;
      state.searchSettings.minPrice = minPrice;
      state.searchSettings.maxPrice = maxPrice;
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
} = actions;
