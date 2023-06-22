import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../actions";
import { apiURL, headers, projectsURL, token } from "../../utils/constants";

const mazdoorSlice = createSlice({
  name: "mazdoors",
  initialState: {
    user: token,
    users: {},
    loading: true,
    profileCompleted: { status: false, percent: 10 },
    labors: [],
    team: [],
    gigs: [],
    conversations: [],
    projects: [],
    laborTypes: [],
    popup: {
      status: false,
      type: "",
      message: ""
    }
  },
  reducers: {
    laborTypesReceived(state, action) {
      state.laborTypes = [...action.payload, "Others"];
    },
    updateProfileCompleted(state, action) {
      if (action.payload.status) {
        state.profileCompleted.status = action.payload.status;
      }
      if (action.payload.percent) {
        state.profileCompleted.percent = action.payload.percent;
      }
    },
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
    gigsReceived(state, action) {
      state.gigs = action.payload;
    },
    usersReceived(state, action) {
      // mapped users on user role as key and user itself as value
      state.users = action.payload.reduce((acc, user) => {
        if (acc[user.role]) {
          acc[user.role].push(user);
        } else {
          acc[user.role] = [user];
        }
        return acc;
      }
        , {});
    },
    conversationsReceived(state, action) {
      const conversations = action.payload;
      state.conversations = conversations.map((conversation) => {
        return {
          _id: conversation._id,
          lastMessage: conversation.lastMessage,
          LastSeenUser1: conversation.LastSeenUser1,
          LastSeenUser2: conversation.LastSeenUser2,
          receiver: conversation.user1._id === state.user._id ? conversation.user2 : conversation.user1
        };
      });

    },
    projectsReceived(state, action) {
      const projects = action.payload;
      // mapped projects on project status as key and project itself as value
      state.projects = projects.reduce((acc, project) => {
        if (acc[project.status]) {
          acc[project.status].push(project);
        } else {
          acc[project.status] = [project];
        }
        return acc;
      }
        , {});
    },
    userReceived(state, action) {
      state.user = action.payload.user;
      if (state.user) {
        if (state.user.profileCompleted) {
          state.profileCompleted = { status: true, percent: 100 };
        }
        //updating profile completed percent
        else if (state.user.role === "LABOR") {
          if (state.user.CNIC && state.user.phone && state.user.startingWage && state.user.type && state.user.area && state.user.state && state.user.city) state.profileCompleted.percent = 70;
          else if (state.user.CNIC && state.user.area && state.user.state && state.user.city) state.profileCompleted.percent = 50;
          else if (state.user.area && state.user.state && state.user.city) state.profileCompleted.percent = 30;
          else state.profileCompleted.percent = 10;
        } else if (state.user.role !== "ADMIN") {
          if (state.user.CNIC && state.user.phone && state.user.area && state.user.state && state.user.city) state.profileCompleted.percent = 70;
          else if (state.user.CNIC && state.user.area && state.user.state && state.user.city) state.profileCompleted.percent = 50;
          else if (state.user.area && state.user.state && state.user.city) state.profileCompleted.percent = 30;
          else state.profileCompleted.percent = 10;
        }
      }
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
  updateProfileCompleted,
  updatePopup,
  laborReceived,
  teamReceived,
  gigsReceived,
  conversationsReceived,
  projectsReceived,
  userReceived,
  usersReceived,
  redirectToLogin,
  laborTypesReceived
} = mazdoorSlice.actions;


export default mazdoorSlice.reducer;
export {
  toggleLoading,
  updatePopup,
  laborReceived,
  teamReceived,
  userReceived,
  usersReceived,
  gigsReceived,
  conversationsReceived,
  projectsReceived,
  redirectToLogin,
  updateProfileCompleted
};

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

export const loadLaborsTypes = () => apiCallBegan({
  url: `${apiURL}laborsType`,
  headers,
  method: "get",
  onSuccess: laborTypesReceived.type
});


export const loadGigs = () => apiCallBegan({
  url: `${apiURL}gigs`,
  headers,
  method: "get",
  onSuccess: gigsReceived.type
});

export const loadConversations = (_id) => apiCallBegan({

  url: `${apiURL}conversations/userID/${_id}`,
  headers,
  method: "get",
  onSuccess: conversationsReceived.type
});

export const loadProjects = (_id) => apiCallBegan({
  url: `${apiURL}${projectsURL}user/${_id}`,
  headers,
  method: "get",
  onSuccess: projectsReceived.type
});

export const loadAllProjects = () => apiCallBegan({
  url: `${apiURL}${projectsURL}`,
  headers,
  method: "get",
  onSuccess: projectsReceived.type
});


export const loadAllUsers = () => apiCallBegan({
  url: `${apiURL}users`,
  headers,
  method: "get",
  onSuccess: usersReceived.type
});




