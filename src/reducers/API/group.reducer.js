import {
    GET_GROUP,
    GET_GROUP_BY_ID,
    ADD_GROUP,
    UPDATE_GROUP,
    DELETE_GROUP
} from "../../actions/API/group.action";

const initialState = {};

export default function groupReducer(state = initialState, action) {
    switch (action.type) {
        case GET_GROUP:
            return action.payload;
        case GET_GROUP_BY_ID:
            return action.payload;
        case ADD_GROUP:
            return [action.payload, ...state];
        case UPDATE_GROUP:
            return state.map((team) => {
                if (team.id === action.payload.id) {
                    return {
                        ...team,
                        content: action.payload.content,
                    };
                } else return team;
            });
        case DELETE_GROUP:
            return state.filter((GROUP) => GROUP.id !== action.payload.groupId);
        default:
            return state;
    }
}