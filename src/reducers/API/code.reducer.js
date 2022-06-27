import {
    GET_CODE,
    GET_CODE_BY_ID,
    ADD_CODE,
    UPDATE_CODE,
    DELETE_CODE,
    GET_CODE_BY_PROJECT
} from "../../actions/API/code.action";

const initialState = {};

export default function codeReducer(state = initialState, action) {
    switch (action.type) {
        case GET_CODE:
            return action.payload;
        case GET_CODE_BY_ID:
            return action.payload;
        case GET_CODE_BY_PROJECT:
            return action.payload;
        case ADD_CODE:
            return [action.payload, ...state];
        case UPDATE_CODE:
            return state.map((team) => {
                if (team.id === action.payload.id) {
                    return {
                        ...team,
                        content: action.payload.content,
                    };
                } else return team;
            });
        case DELETE_CODE:
            return state.filter((CODE) => CODE.id !== action.payload.codeId);
        default:
            return state;
    }
}