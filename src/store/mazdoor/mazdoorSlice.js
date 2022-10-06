import {createSlice} from "@reduxjs/toolkit";
import mazdoors from '../../assets/data/mazdoors.json'

const mazdoorSlice = createSlice({
    name: "mazdoors",
    initialState: {loading: true, mazdoors: []},
    reducers: {
        loadingToggle(state) {
            console.log("LOADING TOGGLE");
            state.loading = !state.loading;
        },
        loadMazdoors(state, action) {
            console.log("LOAD USERS");
            state.mazdoors=mazdoors;
        },
        // usersReceived(state, action) {
        //     console.log("USERS RECEIVED");
        //     state.mazdoors = action.payload;
        // },
        // boardsReceived(state, action) {
        //     console.log("BOARDS RECEIVED");
        //     state.boards = action.payload;
        //     state.loading = false;
        // }, boardUpdated(state, action) {
        //     console.log("BOARD UPDATED");
        //     const board = action.payload;
        //     forEach(state.boards, (brd, index) => {
        //         if (brd._id === board.id) state.boards[index] = board;
        //     })
        // },
        // boardDeleted(state, action) {
        //     console.log("BOARD DELETED");
        //     const deletedBoardID = action.payload;
        //     forEach(state.boards, (board, index) => {
        //         if (board._id === deletedBoardID) state.boards.splice(index, 1);
        //     })
        // },
        // cardsReceived(state, action) {
        //     console.log("CARDS RECEIVED");
        //     const cards = action.payload;
        //     cards.forEach((card) => {
        //         state.cards[card._id] = {
        //             id: card._id,
        //             "description": card.description,
        //             "dueDate": card.dueDate,
        //             "checked": card.checked,
        //             "status": card.status,
        //             "assignees": card.assignees,
        //             "title": card.title,
        //             "list": card.list,
        //             "assigner": card.assigner
        //         }
        //         updateCard(state.cards[card._id]);
        //     })
        // },
        // cardAdded(state, action) {
        //     console.log("CARD ADDED");
        //     const card = action.payload.card;
        //     state.cards[card._id] = {
        //         id: card._id,
        //         "description": card.description,
        //         "dueDate": card.dueDate,
        //         "checked": card.checked,
        //         "status": card.status,
        //         "assignees": card.assignees,
        //         "title": card.title,
        //         "list": card.list,
        //         "assigner": card.assigner
        //     }
        //     console.log(card);
        // },
        // cardDeleted(state, action) {
        //     console.log("CARD DELETED");
        //     delete state.cards[action.payload];
        // },
        // cardToggle(state, action) {
        //     console.log("CARD TOGGLE");
        //     state.card.show = !state.card.show;
        //     if (state.card.show)
        //         state.card.id = action.payload;
        // },
        // cardUpdated(state, action) {
        //     console.log("CARD UPDATED");
        //     const card = action.payload;
        //     state.cards[card.id] = card;
        // }
    }
});

const {
    loadingToggle,
    loadMazdoors
} = mazdoorSlice.actions;
export default mazdoorSlice.reducer;
export {loadingToggle, loadMazdoors};

//api data
// export const headers = {
//     "Content-type": "application/json;charset=UTF-8",
//     "authorization": `Bearer ${user && user.token}`
// };
//endpoints
const cardURL = "/card";
const userURL = "/user";
const boardURL = "/board";

//action creators
// export const loadUsers = () => apiCallBegan({
//     url: "src/assets/data/mazdoors.json",
//     headers,
//     onSuccess: usersReceived.type
// })
//
//
// export const loadBoards = ({id}) => apiCallBegan({
//     url: boardURL + "/adminBoards/" + id,
//     headers,
//     onSuccess: boardsReceived.type
// });
// export const updateBoard = ({_id, bg, members, title}) => apiCallBegan({
//     url: boardURL,
//     headers,
//     method: 'put',
//     data: {board: {id: _id, bg, members, title}},
//     onSuccess: boardUpdated.type
// })
// export const deleteBoard = ({_id}) => apiCallBegan({
//     url: boardURL + "/" + _id,
//     headers,
//     method: 'delete',
//     onSuccess: boardDeleted.type
// })
//
// export const loadCards = (id) => apiCallBegan({
//     url: cardURL + "/all/" + id,
//     headers,
//     onSuccess: cardsReceived.type
// });
// export const addCard = (data) => apiCallBegan({
//     url: cardURL,
//     method: 'post',
//     data,
//     headers,
//     onSuccess: cardAdded.type
// })
// export const deleteCard = (id) => apiCallBegan({
//     url: cardURL + "/" + id,
//     method: 'delete',
//     headers,
//     onSuccess: cardDeleted.type
// })
// export const updateCard = (card) => {
//     if (card.checked) card.status = "completed";
//     else {
//         const currentDate = DateTime.fromFormat(dateToStr(new Date()), "dd/LL/yyyy");
//         const dueDate = DateTime.fromFormat(card.dueDate, "dd/LL/yyyy");
//         let diff = Interval.fromDateTimes(dueDate, currentDate).length('hours') || Interval.fromDateTimes(currentDate, dueDate).length('hours');
//         if (diff === 0) card.status = "due soon";
//         else {
//             diff = Interval.fromDateTimes(dueDate, currentDate).length('hours');
//             if (isNaN(diff)) {
//                 //tomorrow
//                 card.status = "";
//             } else {
//                 //yesterday
//                 card.status = "overdue";
//             }
//         }
//     }
//     return apiCallBegan({
//         url: cardURL,
//         headers,
//         method: 'put',
//         data: {card},
//         onSuccess: cardUpdated.type
//     })
// }
//
