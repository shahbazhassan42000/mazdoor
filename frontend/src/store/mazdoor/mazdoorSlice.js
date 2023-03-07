import {createSlice} from "@reduxjs/toolkit";
import mazdoors from '../../assets/data/mazdoors.json'
import team from '../../assets/data/team.json'

const mazdoorSlice = createSlice({
    name: "mazdoors",
    initialState: {loading: true, mazdoors: [],team: []},
    reducers: {
        loadingToggle(state) {
            console.log("LOADING TOGGLE");
            state.loading = !state.loading;
        },
        loadMazdoors(state, action) {
            console.log("LOAD USERS");
            state.mazdoors=mazdoors;
        },
        loadTeam(state, action) {
            console.log("LOAD TEAM");
            state.team=team;
        },
    }
});

const {
    loadingToggle,
    loadMazdoors,
    loadTeam
} = mazdoorSlice.actions;
export default mazdoorSlice.reducer;
export {loadingToggle, loadMazdoors,loadTeam};



