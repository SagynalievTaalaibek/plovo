import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiDish, Dish } from '../../types';
import { createDish, deleteDish, fetchDishes, fetchOneDish, updateDish } from './dishesThunks';
import { RootState } from '../../app/store';

interface DishesState {
  items: Dish[];
  dish: ApiDish | null;
  fetchLoading: boolean;
  fetchOneLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: false | string;  /*Именно у той копки на которую мы нажали show Spinner and сдедать disabled*/
}

const initialState: DishesState = {
  items: [],
  dish: null,
  fetchLoading: false,
  fetchOneLoading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
};

export const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDishes.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchDishes.fulfilled, (state, { payload: items }) => {
      state.fetchLoading = false;
      state.items = items;
    });
    builder.addCase(fetchDishes.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(deleteDish.pending, (state, { meta }) => {
      state.deleteLoading = meta.arg; /*через meta мы получали id*/
    });
    builder.addCase(deleteDish.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteDish.rejected, (state) => {
      state.deleteLoading = false;
      state.fetchLoading = false;
    });

    builder.addCase(createDish.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createDish.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createDish.rejected, (state) => {
      state.createLoading = false;
    });

    builder.addCase(fetchOneDish.pending, (state) => {
      state.fetchOneLoading = true;
    });
    builder.addCase(fetchOneDish.fulfilled, (state, { payload: dish }: PayloadAction<ApiDish>) => {
      state.fetchOneLoading = false;
      state.dish = dish;
    });
    builder.addCase(fetchOneDish.rejected, (state) => {
      state.fetchOneLoading = false;
    });

    builder.addCase(updateDish.pending, (state) => {
      state.updateLoading = true;
    });
    builder.addCase(updateDish.fulfilled, (state) => {
      state.updateLoading = false;
    });
    builder.addCase(updateDish.rejected, (state) => {
      state.updateLoading = false;
    });
  },
});

export const dishesReducer = dishesSlice.reducer;

export const selectDishes = (state: RootState) => state.dishes.items;
export const selectDish = (state: RootState) => state.dishes.dish;

export const selectFetchDishLoading = (state: RootState) => state.dishes.fetchLoading;
export const selectDeleteDishLoading = (state: RootState) => state.dishes.deleteLoading;
export const selectCreateDishLoading = (state: RootState) => state.dishes.createLoading;
export const selectFetchOneDishLoading = (state: RootState) => state.dishes.fetchOneLoading;
export const selectUpdateDishLoading = (state: RootState) => state.dishes.updateLoading;
