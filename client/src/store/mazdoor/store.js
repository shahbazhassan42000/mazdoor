import { configureStore } from "@reduxjs/toolkit";
import mazdoorSlice, { loadMazdoors, loadTeam, loadUser } from "./mazdoorSlice";
import api from "../middleware/api";
import { token } from "../../utils/constants";


export const store = configureStore({
  reducer: {
    mazdoorStore: mazdoorSlice
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), api]
});

export default store;

store.dispatch(loadMazdoors());
store.dispatch(loadTeam());
if(token) store.dispatch(loadUser());





