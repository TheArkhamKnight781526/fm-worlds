import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookies';

export const theme = createSlice({
  name: 'theme',
  initialState: {
    value: Cookies.getItem('theme') !== null ? Cookies.getItem('theme') : 'dark',
  },
  reducers: {
    swap: (state) => {
        let newTheme = state.value === 'dark' ? 'light' : 'dark';
        state.value = newTheme;
        Cookies.setItem('theme', newTheme);
        
    },
  },
})

// Action creators are generated for each case reducer function
export const { swap } = theme.actions

export default theme.reducer;