import { createSlice } from '@reduxjs/toolkit'

export const addClaimRestaurantSlice = createSlice({
  name: 'addClaimRestaurant',
  initialState: {
    addClaimRestaurant: {}
  },
  reducers: {
    setClaimRestaurant: (state, action) => {
        state.addClaimRestaurant = action.payload
    },
  },
});

export const { setClaimRestaurant } = addClaimRestaurantSlice.actions;

export default addClaimRestaurantSlice.reducer;
