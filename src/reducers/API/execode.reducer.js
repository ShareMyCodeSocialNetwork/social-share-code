import {
    EXECUTE_CODE_JAVA,
    EXECUTE_CODE_JS, EXECUTE_CODE_PYTHON, EXECUTE_CODE_RUBY

} from "../../actions/API/execode.action";

const initialState = {};

export default function execodeReducer(state = initialState, action) {
    switch (action.type) {
        case EXECUTE_CODE_JS:
            return action.payload;
        case EXECUTE_CODE_PYTHON:
            return action.payload;
        case EXECUTE_CODE_RUBY:
            return [action.payload, ...state];
        case EXECUTE_CODE_JAVA:
            return [action.payload, ...state];
        default:
            return state;
    }
}