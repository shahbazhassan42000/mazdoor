import { createSlice } from "@reduxjs/toolkit";
import mazdoors from "../../assets/data/mazdoors.json";
import team from "../../assets/data/team.json";
import { apiCallBegan } from "../actions";
import { apiURL } from "../../utils/constants";
import header from "../../components/Header";

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
    mazdoorReceived(state, action) {
      state.mazdoors = action.payload;
    },
    teamReceived(state, action) {
      state.team = action.payload;
    }
  }
});

const {
  toggleLoading,
  updatePopup,
  mazdoorReceived,
  teamReceived
} = mazdoorSlice.actions;
export default mazdoorSlice.reducer;
export { toggleLoading, updatePopup };

//api to server


export const loadTeam = () => apiCallBegan({
  url: `${apiURL}users/getUserByType/ADMIN`,
  header,
  method: "get",
  onSuccess: teamReceived.type
});
export const loadMazdoor = () => apiCallBegan({
  url: `${apiURL}users/getUserByType/LABOR`,
  header,
  method: "get",
  onSuccess: mazdoorReceived.type
});



