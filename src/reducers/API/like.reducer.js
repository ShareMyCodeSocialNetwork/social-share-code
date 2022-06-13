import {
    GET_LIKES,
    GET_LIKE_BY_ID,
    ADD_LIKE,
    DELETE_LIKE,
    GET_POST_LIKE
} from "../../actions/API/like.action";

const initialState = {};

export default function likeReducer(state = initialState, action) {
    switch (action.type) {
        case GET_LIKES:
            return action.payload;
        case GET_POST_LIKE:
            return action.payload;
        case GET_LIKE_BY_ID:
            return action.payload;
        case ADD_LIKE:
            return [action.payload, ...state];
        case DELETE_LIKE:
            return state.filter((LIKE) => LIKE.id !== action.payload.likeId);
        default:
            return state;
    }
}
