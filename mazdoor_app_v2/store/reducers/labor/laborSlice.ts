// slices/userSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface Labor {
  labors: string[];
}

const initialState: Labor = {
  labors: ["one", "two", "three"],
};

const laborSlice = createSlice({
  name: "laborSlice",
  initialState,
  reducers: {
    setLabors: (state, action) => {
      state.labors = action.payload;
    },
    resetAll: () => initialState,
  },
});

export const laborActions = laborSlice.actions;
export default laborSlice.reducer;
