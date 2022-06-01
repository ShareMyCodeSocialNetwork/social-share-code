import {
    GET_LIKE,
    GET_LIKE_BY_ID,
    ADD_LIKE,
    UPDATE_LIKE,
    DELETE_LIKE
} from "../../actions/API/like.action";

const initialState = {};

export default function likeReducer(state = initialState, action) {
    switch (action.type) {
        case GET_LIKE:
            return action.payload;
        case GET_LIKE_BY_ID:
            return action.payload;
        case ADD_LIKE:
            return [action.payload, ...state];
        case UPDATE_LIKE:
            return state.map((team) => {
                if (team.id === action.payload.id) {
                    return {
                        ...team,
                        content: action.payload.content,
                    };
                } else return team;
            });
        case DELETE_LIKE:
            return state.filter((LIKE) => LIKE.id !== action.payload.likeId);
        default:
            return state;
    }
}