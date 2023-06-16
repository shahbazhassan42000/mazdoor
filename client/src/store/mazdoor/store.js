import { configureStore } from "@reduxjs/toolkit";
import mazdoorSlice, { loadGigs, loadLabors, loadLaborsTypes, loadTeam, loadUser, toggleLoading } from "./mazdoorSlice";
import api from "../middleware/api";
import { ENV, token } from "../../utils/constants";


export const store = configureStore({
  reducer: {
    mazdoorStore: mazdoorSlice
  },
  devTools: ENV !== 'production',
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), api]
});

export default store;

if (token) store.dispatch(loadUser());
else store.dispatch(toggleLoading());
store.dispatch(loadLabors());
store.dispatch(loadTeam());
if (token) {
  store.dispatch(loadLaborsTypes());
  store.dispatch(loadGigs());
}








