import {
    GET_POST,
    GET_POST_BY_ID,
    GET_POST_BY_USER_ID,
    ADD_POST,
    UPDATE_POST,
    DELETE_POST
} from "../../actions/API/post.action";

const initialState = {};

export default function postReducer(state = initialState, action) {
    switch (action.type) {
        case GET_POST:
            return action.payload;
        case GET_POST_BY_ID:
            return action.payload;
        case GET_POST_BY_USER_ID:
            return action.payload;
        case ADD_POST:
            return [action.payload, ...state];
        case UPDATE_POST:
            return state.map((team) => {
                if (team.id === action.payload.id) {
                    return {
                        ...team,
                        content: action.payload.content,
                    };
                } else return team;
            });
        case DELETE_POST:
            return state.filter((POST) => POST.id !== action.payload.postId);
        default:
            return state;
    }
}