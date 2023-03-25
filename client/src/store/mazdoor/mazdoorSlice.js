import {createSlice} from "@reduxjs/toolkit";
import mazdoors from '../../assets/data/mazdoors.json'
import team from '../../assets/data/team.json'

const mazdoorSlice = createSlice({
    name: "mazdoors",
    initialState: {loading: true, mazdoors: [],team: [],popup: false},
    reducers: {
        toggleLoading(state) {
            state.loading = !state.loading;
        },
        togglePopup(state) {
            state.popup = !state.popup;
        },
        loadMazdoors(state, action) {
            state.mazdoors=mazdoors;
        },
        loadTeam(state, action) {
            state.team=team;
        },
    }
});

const {
    toggleLoading,
    togglePopup,
    loadMazdoors,
    loadTeam
} = mazdoorSlice.actions;
export default mazdoorSlice.reducer;
export {toggleLoading, loadMazdoors,loadTeam,togglePopup};



