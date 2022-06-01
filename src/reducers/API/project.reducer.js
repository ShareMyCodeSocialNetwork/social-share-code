import {
    GET_PROJECT,
    GET_PROJECT_BY_ID,
    GET_PROJECT_BY_NAME,
    GET_PROJECT_BY_OWNER,
    GET_PROJECT_BY_GROUP,
    UPDATE_OWNER_PROJECT,
    UPDATE_GROUP_PROJECT,
    ADD_PROJECT,
    UPDATE_PROJECT,
    DELETE_PROJECT
} from "../../actions/API/project.action";

const initialState = {};

export default function projectReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PROJECT:
            return action.payload;
        case GET_PROJECT_BY_ID:
            return action.payload;
        case GET_PROJECT_BY_NAME:
            return action.payload;
        case GET_PROJECT_BY_OWNER:
            return action.payload;
        case GET_PROJECT_BY_GROUP:
            return action.payload;
        case ADD_PROJECT:
            return [action.payload, ...state];
        case UPDATE_PROJECT:
            return state.map((team) => {
                if (team.id === action.payload.id) {
                    return {
                        ...team,
                        content: action.payload.content,
                    };
                } else return team;
            });
        case UPDATE_OWNER_PROJECT:
            return state.map((team) => {
                if (team.id === action.payload.id) {
                    return {
                        ...team,
                        content: action.payload.content,
                    };
                } else return team;
            });

        case UPDATE_GROUP_PROJECT:
            return state.map((team) => {
                if (team.id === action.payload.id) {
                    return {
                        ...team,
                        content: action.payload.content,
                    };
                } else return team;
            });
        case DELETE_PROJECT:
            return state.filter((PROJECT) => PROJECT.id !== action.payload.projectId);
        default:
            return state;
    }
}