import {
    GET_FOLLOWER,
    GET_FOLLOWER_BY_ID,
    ADD_FOLLOWER,
    UPDATE_FOLLOWER,
    DELETE_FOLLOWER
} from "../../actions/API/follower.action";

const initialState = {};

export default function followerReducer(state = initialState, action) {
    switch (action.type) {
        case GET_FOLLOWER:
            return action.payload;
        case GET_FOLLOWER_BY_ID:
            return action.payload;
        case ADD_FOLLOWER:
            return [action.payload, ...state];
        case UPDATE_FOLLOWER:
            return state.map((team) => {
                if (team.id === action.payload.id) {
                    return {
                        ...team,
                        content: action.payload.content,
                    };
                } else return team;
            });
        case DELETE_FOLLOWER:
            return state.filter((FOLLOWER) => FOLLOWER.id !== action.payload.followerId);
        default:
            return state;
    }
}