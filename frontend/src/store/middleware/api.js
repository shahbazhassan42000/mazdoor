import axios from "axios";
import * as actions from "../actions"

const api = ({dispatch}) => next => action => {
    if (action.type !== actions.apiCallBegan.type) return next(action);
    next(action);
    const {url, method, data, onSuccess, onError, headers} = action.payload;
    axios.request({
        baseURL: 'http://localhost:8080/api',
        url,
        method,
        headers,
        data
    }).then((response) => {
        dispatch(actions.apiCallSuccess(response.data));
        if (onSuccess) dispatch({type: onSuccess, payload: response.data});
    }).catch((err) => {
        dispatch(actions.apiCallFailed(err.message));
        if (onError) dispatch({type: onError, payload: err.message});
    });
}

export default api;
