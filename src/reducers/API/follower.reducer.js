import {
    GET_FOLLOWER,
    GET_FOLLOWER_BY_ID,
    ADD_FOLLOWER,
    DELETE_FOLLOWER,
    GET_ALL,
    GET_FOLLOWED,
    GET_BY_FOLLOWED_AND_FOLLOWER,
    GET_FULL_FOLLOW

} from "../../actions/API/follower.action";

const initialState = {};

export default function followerReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL:
            return action.payload;
        case GET_FULL_FOLLOW:
            return action.payload;
        case GET_FOLLOWER_BY_ID:
            return action.payload;
        case GET_BY_FOLLOWED_AND_FOLLOWER:
            return action.payload;
        case ADD_FOLLOWER:
            return [action.payload, ...state];
        case GET_FOLLOWER :
            return action.payload;
        case GET_FOLLOWED :
            return action.payload;
        case DELETE_FOLLOWER:
            return state.filter((FOLLOWER) => FOLLOWER.id !== action.payload.followerId);
        default:
            return state;
    }
}
