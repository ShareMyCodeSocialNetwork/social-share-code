import axios from "axios";
import AuthService from "../../components/Auth/AuthService";
import {API_URL} from "../global";


export const GET_USER_ROLE_GROUP = "GET_USER_ROLE_GROUP";
export const GET_USER_ROLE_GROUP_BY_ID = "GET_USER_ROLE_GROUP_BY_ID";
export const GET_USER_ROLE_GROUP_BY_USER = "GET_USER_ROLE_GROUP_BY_USER";
export const GET_USER_ROLE_GROUP_BY_GROUP = "GET_USER_ROLE_GROUP_BY_GROUP";
export const GET_FULL_USER_ROLE_GROUP = "GET_FULL_USER_ROLE_GROUP";
export const GET_USER_ROLE_GROUP_BY_USER_AND_GROUP = "GET_USER_ROLE_GROUP_BY_USER_AND_GROUP";
export const ADD_USER_ROLE_GROUP = "ADD_USER_ROLE_GROUP";
export const DELETE_USER_ROLE_GROUP = "DELETE_USER_ROLE_GROUP";

export const getUserRoleGroups = () => {
    return (dispatch) => {
        return axios
            .get(`${API_URL}/user_role_group`, { headers: AuthService.authHeader() })
            .then((res) => {
                dispatch({ type: GET_USER_ROLE_GROUP, payload: res.data });

            })
            .catch((err) => console.log(err));
    };
};

export const getOneUserRoleGroupsById = (UserRoleGroupId) => {
    return (dispatch) => {
        return axios
            .get(`${API_URL}/user_role_group/${UserRoleGroupId}`,{ headers:  AuthService.authHeader() })
            .then((res) => {
                dispatch({ type: GET_USER_ROLE_GROUP_BY_ID, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};

export const getUserRoleGroupsByGroup= (groupId) => {
    return (dispatch) => {
        return axios
            .get(`${API_URL}/user_role_group/group/${groupId}`,{ headers:  AuthService.authHeader() })
            .then((res) => {
                dispatch({ type: GET_USER_ROLE_GROUP_BY_GROUP, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};

export const getFullUserRoleGroups= (groupId, userId) => {
    return (dispatch) => {
        return axios
            .get(`${API_URL}/user_role_group/full/group/${groupId}/user/${userId}`,{ headers:  AuthService.authHeader() })
            .then((res) => {
                dispatch({ type: GET_FULL_USER_ROLE_GROUP, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};


export const getUserRoleGroupByUser = (userId) => {
    return (dispatch) => {
        return axios
            .get(`${API_URL}/user_role_group/user/${userId}`,{ headers:  AuthService.authHeader() })
            .then((res) => {
                dispatch({ type: GET_USER_ROLE_GROUP_BY_USER, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};

export const addUserRoleGroup = (data) => {
    return (dispatch) => {
        return axios
            .post(`${API_URL}/user_role_group/create`, data, { headers:  AuthService.authHeader() })
            .then(() => {
                dispatch({ type: ADD_USER_ROLE_GROUP, payload: data });
            })
            .catch((err) => console.log(err));
    };
};





export const deleteUserRoleGroup = (UserRoleGroupId) => {
    return (dispatch) => {
        return axios({
            method: "delete",
            url: `${API_URL}/user_role_group/delete/${UserRoleGroupId}`,
            headers:  AuthService.authHeader()

        })
            .then(() => {
                dispatch({ type: DELETE_USER_ROLE_GROUP, payload: { UserRoleGroupId } });
            })
            .catch((err) => console.log(err));
    };
};

export const getUserRoleGroupByUserAndGroup = (userId, groupId) => {
    return (dispatch) => {
        return axios
            .get(`${API_URL}/user_role_group/group/${groupId}/user/${userId}`,{ headers:  AuthService.authHeader() })
            .then((res) => {
                dispatch({ type: GET_USER_ROLE_GROUP_BY_USER_AND_GROUP, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};
