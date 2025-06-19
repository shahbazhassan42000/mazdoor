// 3rd Party Imports
import {
  Reducer,
  AnyAction,
  configureStore,
  combineReducers,
} from "@reduxjs/toolkit";
// Alias Imports
import { NODE_ENV } from "@/constants/constants";
import { LaborReducer } from "@/store/reducers/index";

// Add your reducer slices here.
const combinedReducer = combineReducers({
  laborSlice: LaborReducer,
});

export type RootState = ReturnType<typeof combinedReducer>;

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === "auth/logout") {
    // clear complete redux on logout
    state = {} as RootState;
  }

  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  devTools: NODE_ENV === "development",
});

export default store;

// Inferred type: {auth: AuthState, ...}
export type AppDispatch = typeof store.dispatch;
