import { createSlice } from '@reduxjs/toolkit'

export const addClaimRestaurantSlice = createSlice({
  name: 'addClaimRestaurant',
  initialState: {
    addClaimRestaurant: {}
  },
  reducers: {
    setAddRestaurant: (state, action) => {
        state.addClaimRestaurant = action.payload
    },
    setClaimRestaurant: (state, action) => {
        state.addClaimRestaurant = action.payload
    },
  },
});

export const { setAddRestaurant, setClaimRestaurant } = addClaimRestaurantSlice.actions;

export default addClaimRestaurantSlice.reducer;
