// slices/userSlice.ts
import { Labor as LaborInterface, Admin } from "@/models/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Labor {
  team: Admin[];
  labors: LaborInterface[];
}

const initialState: Labor = {
  team: [],
  labors: [],
};

const laborSlice = createSlice({
  name: "laborSlice",
  initialState,
  reducers: {
    setLabors: (state, action: PayloadAction<LaborInterface[]>) => {
      state.labors = action.payload;
    },
    setTeam: (state, action: PayloadAction<Admin[]>) => {
      state.team = action.payload;
    },
    resetAll: () => initialState,
  },
});

export const laborActions = laborSlice.actions;
export default laborSlice.reducer;
