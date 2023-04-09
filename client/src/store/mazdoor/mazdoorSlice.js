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
      // if(state.user.role==='LABOR'){
      //   if(state.user.status==='unverified' || !state.user.phone || !state.user.country || !state.user.city || !state.user.area || !state.user.province || !state.user.image  || !state.user.CNIC || !state.user.name){
      //     state.user.profileCompleted=false;
      //   }else{
      //     state.user.profileCompleted=true;
      //   }
      // }
      state.loading = false;
    },
    redirectToLogin(state, action) {
      state.user = null;
      state.loading = false;
      localStorage.removeItem("token");
      state.popup = {
        status: true,
        type: "login",
        message: ""
      };
    }

  }
});

const {
  toggleLoading,
  updatePopup,
  laborReceived,
  teamReceived,
  userReceived,
  redirectToLogin
} = mazdoorSlice.actions;
export default mazdoorSlice.reducer;
export { toggleLoading, updatePopup, laborReceived, teamReceived, userReceived, redirectToLogin };

//api to server


export const loadTeam = () => apiCallBegan({
  url: `${apiURL}users/getUserByRole/?role=ADMIN`,
  headers,
  method: "get",
  onSuccess: teamReceived.type
});
export const loadLabors = () => apiCallBegan({
  url: `${apiURL}users/getUserByRole/?role=LABOR`,
  headers,
  method: "get",
  onSuccess: laborReceived.type
});

export const loadUser = () => apiCallBegan({
  url: `${apiURL}users/getByToken`,
  headers,
  method: "get",
  onSuccess: userReceived.type,
  onError: redirectToLogin.type
});




