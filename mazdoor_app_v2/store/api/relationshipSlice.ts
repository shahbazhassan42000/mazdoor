import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RelationshipsTabStates {
  reloadRelationshipsTab: boolean;
}

const initialState: RelationshipsTabStates = {
  reloadRelationshipsTab: true,
};

export const relationshipsTabSlice = createSlice({
  name: "relationshipsTabSlice",
  initialState,
  reducers: {
    setReloadRelationshipsTab: (state, action: PayloadAction<boolean>) => {
      state.reloadRelationshipsTab = action.payload;
    },
    resetAll: (state) => initialState,
  },
});

export default relationshipsTabSlice.reducer;
export const relationshipsTabActions = relationshipsTabSlice.actions;
