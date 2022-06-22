import { combineReducers } from "redux";
import authReducer from "./API/auth.reducer";
import codeReducer from "./API/code.reducer";
import commentReducer from "./API/comment.reducer";
import execodeReducer from "./API/execode.reducer";
import followerReducer from "./API/follower.reducer";
import groupReducer from "./API/group.reducer";
import likeReducer from "./API/like.reducer";
import languageReducer from "./API/language.reducer";
import postReducer from "./API/post.reducer";
import projectReducer from "./API/project.reducer";
import snippetsReducer from "./API/snippets.reducer";
import userReducer from "./API/user.reducer";
import userRoleGroupReducer from "./API/userRoleGroup.reducer";


export default combineReducers({
    authReducer,
    codeReducer,
    commentReducer,
    execodeReducer,
    followerReducer,
    groupReducer,
    languageReducer,
    likeReducer,
    postReducer,
    projectReducer,
    snippetsReducer,
    userReducer,
    userRoleGroupReducer
});
