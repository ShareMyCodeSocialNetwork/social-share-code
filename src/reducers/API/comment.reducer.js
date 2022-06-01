import {
    GET_COMMENT,
    GET_COMMENT_BY_ID,
    ADD_COMMENT,
    UPDATE_COMMENT,
    DELETE_COMMENT
} from "../../actions/API/comment.action";

const initialState = {};

export default function commentReducer(state = initialState, action) {
    switch (action.type) {
        case GET_COMMENT:
            return action.payload;
        case GET_COMMENT_BY_ID:
            return action.payload;
        case ADD_COMMENT:
            return [action.payload, ...state];
        case UPDATE_COMMENT:
            return state.map((team) => {
                if (team.id === action.payload.id) {
                    return {
                        ...team,
                        content: action.payload.content,
                    };
                } else return team;
            });
        case DELETE_COMMENT:
            return state.filter((COMMENT) => COMMENT.id !== action.payload.commentId);
        default:
            return state;
    }
}