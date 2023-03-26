import { createSlice } from "@reduxjs/toolkit";
import mazdoors from "../../assets/data/mazdoors.json";
import team from "../../assets/data/team.json";

const mazdoorSlice = createSlice({
  name: "mazdoors",
  initialState: {
    loading: true, mazdoors: [], team: [],
    popup: {
      status: false,
      type: "",
      message: ""
    }
  },
  reducers: {
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    updatePopup(state, action) {
      state.popup = action.payload;
    },
    loadMazdoors(state, action) {
      state.mazdoors = mazdoors;
    },
    loadTeam(state, action) {
      state.team = team;
    }
  }
});

const {
  toggleLoading,
  updatePopup,
  loadMazdoors,
  loadTeam
} = mazdoorSlice.actions;
export default mazdoorSlice.reducer;
export { toggleLoading, loadMazdoors, loadTeam, updatePopup };



