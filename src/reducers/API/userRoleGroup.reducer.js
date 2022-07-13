import {
    GET_USER_ROLE_GROUP,
    GET_USER_ROLE_GROUP_BY_ID,
    GET_USER_ROLE_GROUP_BY_GROUP,
    GET_USER_ROLE_GROUP_BY_USER,
    GET_USER_ROLE_GROUP_BY_USER_AND_GROUP,
    ADD_USER_ROLE_GROUP,
    DELETE_USER_ROLE_GROUP
} from "../../actions/API/userRoleGroup.action";

const initialState = {};

export default function userRoleGroupReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_ROLE_GROUP:
            return action.payload;
        case GET_USER_ROLE_GROUP_BY_ID:
            return action.payload;
        case GET_USER_ROLE_GROUP_BY_USER:
            return action.payload;
        case GET_USER_ROLE_GROUP_BY_USER_AND_GROUP:
            return action.payload;
        case GET_USER_ROLE_GROUP_BY_GROUP:
            return action.payload;
        case ADD_USER_ROLE_GROUP:
            return [action.payload, ...state];
        case DELETE_USER_ROLE_GROUP:
            return state.filter((USER_ROLE_GROUP) => USER_ROLE_GROUP.id !== action.payload.UserRoleGroupId);
        default:
            return state;
    }
}
