import { configureStore } from "@reduxjs/toolkit";
import theme from './redux/theme';
import countries from "./redux/countries";

export default configureStore({
    reducer: {
        theme: theme,
        countries: countries,
    }
})