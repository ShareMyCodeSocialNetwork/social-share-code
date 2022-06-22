import {
    GET_ROLE,
    GET_ROLE_BY_ID,
    GET_ROLE_BY_NAME,
    ADD_ROLE,
    UPDATE_ROLE_NAME,
    DELETE_ROLE
} from "../../actions/API/role.action";

const initialState = {};

export default function groupReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ROLE:
            return action.payload;
        case GET_ROLE_BY_ID:
            return action.payload;
        case GET_ROLE_BY_NAME :
            return action.payload;
        case ADD_ROLE:
            return [action.payload, ...state];
        case UPDATE_ROLE_NAME:
            return state.map((team) => {
                if (team.id === action.payload.id) {
                    return {
                        ...team,
                        content: action.payload.content,
                    };
                } else return team;
            });
        case DELETE_ROLE:
            return state.filter((GROUP) => GROUP.id !== action.payload.groupId);
        default:
            return state;
    }
}
