import {
    GET_SNIPPET,
    GET_SNIPPET_BY_ID,
    GET_SNIPPET_BY_USER_ID,
    ADD_SNIPPET,
    UPDATE_SNIPPET,
    DELETE_SNIPPET
} from "../../actions/API/snippets.action";

const initialState = {};

export default function snippetsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_SNIPPET:
            return action.payload;
        case GET_SNIPPET_BY_ID:
            return action.payload;
        case GET_SNIPPET_BY_USER_ID:
            return action.payload;
        case ADD_SNIPPET:
            return [action.payload, ...state];
        case UPDATE_SNIPPET:
            return state.map((team) => {
                if (team.id === action.payload.id) {
                    return {
                        ...team,
                        content: action.payload.content,
                    };
                } else return team;
            });
        case DELETE_SNIPPET:
            return state.filter((SNIPPET) => SNIPPET.id !== action.payload.snippetId);
        default:
            return state;
    }
}