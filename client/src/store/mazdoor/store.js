import { configureStore } from "@reduxjs/toolkit";
import mazdoorSlice, { loadLabors, loadTeam, loadUser, toggleLoading } from "./mazdoorSlice";
import api from "../middleware/api";
import { token } from "../../utils/constants";


export const store = configureStore({
  reducer: {
    mazdoorStore: mazdoorSlice
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), api]
});

export default store;

if(token) store.dispatch(loadUser());
else store.dispatch(toggleLoading());
store.dispatch(loadLabors());
store.dispatch(loadTeam());






