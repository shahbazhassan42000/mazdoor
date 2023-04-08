import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../actions";
import { apiURL, headers, token } from "../../utils/constants";

const mazdoorSlice = createSlice({
  name: "mazdoors",
  initialState: {
    user: token,
    loading: true,
    labors: [],
    team: [],
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
    laborReceived(state, action) {
      state.labors = action.payload;
    },
    teamReceived(state, action) {
      state.team = action.payload;
    },
    userReceived(state, action) {
      state.user = action.payload.user;
      state.loading=false;
    }

  }
});

const {
  toggleLoading,
  updatePopup,
  laborReceived,
  teamReceived,
  userReceived
} = mazdoorSlice.actions;
export default mazdoorSlice.reducer;
export { toggleLoading, updatePopup, laborReceived, teamReceived, userReceived};

//api to server


export const loadTeam = () => apiCallBegan({
  url: `${apiURL}users/getUserByType/?type=ADMIN`,
  headers,
  method: "get",
  onSuccess: teamReceived.type
});
export const loadLabors = () => apiCallBegan({
  url: `${apiURL}users/getUserByType/?type=LABOR`,
  headers,
  method: "get",
  onSuccess: laborReceived.type
});

export const loadUser = () => apiCallBegan({
  url: `${apiURL}users/getByToken`,
  headers,
  method: "get",
  onSuccess: userReceived.type
});




