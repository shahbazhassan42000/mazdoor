// slices/userSlice.ts
import { Labor as LaborInterface, Admin } from "@/models/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LaborCategory {
  name: string;
  nameKey: string;
  description: string;
  descriptionKey: string;
  icon: string;
  color: string;
  laborCount: number;
}

interface Laborer {
  id: string;
  name: string;
  category: string;
  image: string;
  age: number;
  cnic: string;
  area: string;
  phone: string;
  rating: number;
  experience: string;
  hourlyRate: number;
  isAvailable: boolean;
  skills: string[];
}

interface Labor {
  team: Admin[];
  labors: LaborInterface[];
  laborTypes: string[];
  laborCategories: LaborCategory[];
  transformedLaborers: Laborer[];
  isLoading: boolean;
  error: string | null;
}

const initialState: Labor = {
  team: [],
  labors: [],
  laborTypes: [],
  laborCategories: [],
  transformedLaborers: [],
  isLoading: false,
  error: null,
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
    setLaborTypes: (state, action: PayloadAction<string[]>) => {
      state.laborTypes = action.payload;
    },
    setLaborCategories: (state, action: PayloadAction<LaborCategory[]>) => {
      state.laborCategories = action.payload;
    },
    setTransformedLaborers: (state, action: PayloadAction<Laborer[]>) => {
      state.transformedLaborers = action.payload;
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
