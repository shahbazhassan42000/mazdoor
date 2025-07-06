// slices/userSlice.ts
import { Labor as LaborInterface, Admin } from "@/models/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Labor {
  team: Admin[];
  labors: LaborInterface[];
  selectedLabor?: LaborInterface;
  laborTypes: string[];
  isLoading: boolean;
  error: string | null;
}

const initialState: Labor = {
  team: [],
  labors: [],
  selectedLabor: undefined,
  laborTypes: [],
  isLoading: false,
  error: null,
};

const laborSlice = createSlice({
  name: "laborSlice",
  initialState,
  reducers: {
    setSelectedLabor: (
      state,
      action: PayloadAction<LaborInterface | undefined>
    ) => {
      state.selectedLabor = action.payload;
    },
    setLabors: (state, action: PayloadAction<LaborInterface[]>) => {
      state.labors = action.payload;
    },
    setTeam: (state, action: PayloadAction<Admin[]>) => {
      state.team = action.payload;
    },
    setLaborTypes: (state, action: PayloadAction<string[]>) => {
      state.laborTypes = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetAll: () => initialState,
  },
});

export const laborActions = laborSlice.actions;
export default laborSlice.reducer;
