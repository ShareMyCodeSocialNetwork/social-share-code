import {
    GET_LANGUAGE,
    GET_LANGUAGE_BY_ID,
    ADD_LANGUAGE,
    UPDATE_LANGUAGE,
    DELETE_LANGUAGE
} from "../../actions/API/language.action";

const initialState = {};

export default function languageReducer(state = initialState, action) {
    switch (action.type) {
        case GET_LANGUAGE:
            return action.payload;
        case GET_LANGUAGE_BY_ID:
            return action.payload;
        case ADD_LANGUAGE:
            return [action.payload, ...state];
        case UPDATE_LANGUAGE:
            return state.map((team) => {
                if (team.id === action.payload.id) {
                    return {
                        ...team,
                        content: action.payload.content,
                    };
                } else return team;
            });
        case DELETE_LANGUAGE:
            return state.filter((LANGUAGE) => LANGUAGE.id !== action.payload.languageId);
        default:
            return state;
    }
}