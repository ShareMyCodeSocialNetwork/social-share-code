import {
    LOGIN_USER,
    REGISTER_USER,
} from "../../actions/API/auth.action";

const initialState = {};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER:
            return action.payload;
        case REGISTER_USER:
            return [action.payload, ...state];
        default:
            return state;
    }
}