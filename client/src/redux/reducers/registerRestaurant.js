import { createSlice } from '@reduxjs/toolkit'

export const registerRestaurantSlice = createSlice({
  name: 'addClaimRestaurant',
  initialState: {
    registerRestaurant: {},
  },
  reducers: {
    setAddRestaurant: (state, action) => {
        state.registerRestaurant = action.payload
    }
  },
});

export const { setAddRestaurant } = registerRestaurantSlice.actions;

export default registerRestaurantSlice.reducer;
