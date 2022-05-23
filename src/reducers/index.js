import { combineReducers } from "redux";
import demandReducer from "./API/demand.reducer";
import folder_exportReducer from "./API/folder_export.reducer";
import authReducer from "./API/auth.reducer";
import documentsReducer from "./API/documents.reducer";
import notificationReducer from "./API/notification.reducer";
import projectReducer from "./API/project.reducer";
import radarReducer from "./API/radar.reducer";
import roleReducer from "./API/role.reducer";
import role_teamReducer from "./API/role_team.reducer";
import taskReducer from "./API/task.reducer";
import teamReducer from "./API/team.reducer";
import type_radarReducer from "./API/type_radar.reducer";
import questionReducer from "./API/Question/question.reducer";
import responseReducer from "./API/Question/response.reducer";

export default combineReducers({
    demandReducer,
    folder_exportReducer,
    authReducer,
    documentsReducer,
    notificationReducer,
    projectReducer,
    radarReducer,
    roleReducer,
    role_teamReducer,
    taskReducer,
    teamReducer,
    type_radarReducer,
    questionReducer,
    responseReducer
});
