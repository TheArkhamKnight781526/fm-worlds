import { createSlice } from "@reduxjs/toolkit";

export const countries = createSlice({
  name: 'countries',
  initialState: {
    value: null,
  },
  reducers: {
      update: (state, value) => {
        state.value = value.payload;
      }
  }
})

export const { update } = countries.actions;

export default countries.reducer;