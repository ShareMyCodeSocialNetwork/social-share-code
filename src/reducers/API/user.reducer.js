import {
    GET_USER,
    GET_USER_BY_ID,
    GET_USER_BY_USER_ID,
    GET_USER_BY_PSEUDO,
    UPDATE_USER_EMAIL,
    UPDATE_USER_PSEUDO,
    UPDATE_USER_PASSWORD,
    UPDATE_USER_LAST_NAME,
    UPDATE_USER_FIRST_NAME,
    ADD_USER,
    UPDATE_USER,
    DELETE_USER
} from "../../actions/API/user.action";

const initialState = {};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            return action.payload;
        case GET_USER_BY_ID:
            return action.payload;
        case GET_USER_BY_USER_ID:
            return action.payload;
        case GET_USER_BY_PSEUDO:
            return action.payload;
        case ADD_USER:
            return [action.payload, ...state];
        case UPDATE_USER:
            return state.map((team) => {
                if (team.id === action.payload.id) {
                    return {
                        ...team,
                        content: action.payload.content,
                    };
                } else return team;
            });
        case UPDATE_USER_EMAIL:
            return state.map((team) => {
                if (team.id === action.payload.id) {
                    return {
                        ...team,
                        content: action.payload.content,
                    };
                } else return team;
            });

        case UPDATE_USER_PSEUDO:
            return state.map((team) => {
                if (team.id === action.payload.id) {
                    return {
                        ...team,
                        content: action.payload.content,
                    };
                } else return team;
            });
        case UPDATE_USER_PASSWORD:
            return state.map((team) => {
                if (team.id === action.payload.id) {
                    return {
                        ...team,
                        content: action.payload.content,
                    };
                } else return team;
            });

        case UPDATE_USER_LAST_NAME:
            return state.map((team) => {
                if (team.id === action.payload.id) {
                    return {
                        ...team,
                        content: action.payload.content,
                    };
                } else return team;
            });
        case UPDATE_USER_FIRST_NAME:
            return state.map((team) => {
                if (team.id === action.payload.id) {
                    return {
                        ...team,
                        content: action.payload.content,
                    };
                } else return team;
            });
        case DELETE_USER:
            return state.filter((USER) => USER.id !== action.payload.userId);
        default:
            return state;
    }
}