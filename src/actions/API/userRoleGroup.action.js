import axios from "axios";
import AuthService from "../../components/Auth/AuthService";



export const API_URL = "https://localhost:8080"
export const GET_USER_ROLE_GROUP = "GET_USER_ROLE_GROUP";
export const GET_USER_ROLE_GROUP_BY_ID = "GET_USER_ROLE_GROUP_BY_ID";
export const GET_USER_ROLE_GROUP_BY_NAME = "GET_USER_ROLE_GROUP_BY_USER";
export const GET_USER_ROLE_GROUP_BY_GROUP = "GET_USER_ROLE_GROUP_BY_GROUP";
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

export const getOneUserRoleGroupsByGroup= (UserRoleGroupId) => {
    return (dispatch) => {
        return axios
            .get(`${API_URL}/USER_ROLE_GROUP/user/${UserRoleGroupId}`,{ headers:  AuthService.authHeader() })
            .then((res) => {
                dispatch({ type: GET_USER_ROLE_GROUP_BY_NAME, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};


export const getUserRoleGroupByUser = (groupId) => {
    return (dispatch) => {
        return axios
            .get(`${API_URL}/user_role_group/group/${groupId}`,{ headers:  AuthService.authHeader() })
            .then((res) => {
                dispatch({ type: GET_USER_ROLE_GROUP_BY_GROUP, payload: res.data });
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