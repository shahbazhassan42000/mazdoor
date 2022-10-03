import {configureStore} from "@reduxjs/toolkit";
import mazdoorSlice from './mazdoorSlice';
import api from "../middleware/api";



export const store = configureStore({
    reducer: {
        cards: mazdoorSlice
    },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), api]
});


