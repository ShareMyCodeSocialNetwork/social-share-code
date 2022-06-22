import {
    GET_TAB,
    SET_TAB,
} from "../actions/tools..action";

const initialState = {};

export default function toolReducer(state = initialState, action) {
    switch (action.type) {
        case GET_TAB:
            return action.payload;
        case SET_TAB:
            return [action.payload, ...state];
        default:
            return state;
    }
}