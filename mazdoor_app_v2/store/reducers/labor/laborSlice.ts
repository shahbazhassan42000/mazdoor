// slices/userSlice.ts
import { INTERFACES } from "@/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Labor {
  labors: INTERFACES.Labor[];
}

const initialState: Labor = {
  labors: [],
};

const laborSlice = createSlice({
  name: "laborSlice",
  initialState,
  reducers: {
    setLabors: (state, action: PayloadAction<INTERFACES.Labor[]>) => {
      state.labors = action.payload;
    },
    resetAll: () => initialState,
  },
});

export const laborActions = laborSlice.actions;
export default laborSlice.reducer;
