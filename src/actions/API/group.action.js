import axios from "axios";
import AuthService from "../../components/Auth/AuthService";
import {API_URL} from "../global";




export const GET_GROUP = "GET_GROUP";
export const GET_GROUP_BY_ID = "GET_GROUP_BY_ID";
export const GET_GROUP_BY_NAME = "GET_GROUP_BY_NAME";
export const ADD_GROUP = "ADD_GROUP";
export const UPDATE_GROUP = "UPDATE_GROUP";
export const UPDATE_GROUP_NAME = "UPDATE_GROUP_NAME";
export const UPDATE_GROUP_DESCRIPTION = "UPDATE_GROUP_DESCRIPTION";
export const DELETE_GROUP = "DELETE_GROUP";

export const getGroups = () => {
    return (dispatch) => {
        return axios
            .get(`${API_URL}/group/`, { headers: AuthService.authHeader() })
            .then((res) => {
                dispatch({ type: GET_GROUP, payload: res.data });

            })
            .catch((err) => console.log(err));
    };
};

export const getOneGroupById = (groupId) => {
    return (dispatch) => {
        return axios
            .get(`${API_URL}/group/${groupId}`,{ headers:  AuthService.authHeader() })
            .then((res) => {
                dispatch({ type: GET_GROUP_BY_ID, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};

export const addGroup = (data) => {
    return (dispatch) => {
        return axios
            .post(`${API_URL}/group/create`, data, { headers:  AuthService.authHeader() })
            .then(() => {
                dispatch({ type: ADD_GROUP, payload: data });
            })
            .catch((err) => console.log(err));
    };
};



export const updateGroup = (groupId,data) => {
    return (dispatch) => {
        return axios
            .put(`${API_URL}/group/update/${groupId}`, data, { headers:  AuthService.authHeader() })
            .then(() => {
                dispatch({ type: UPDATE_GROUP, payload: data });
            })
            .catch((err) => console.log(err));
    };
};

export const changeGroupName = (groupId,data) => {
    return (dispatch) => {
        return axios
            .put(`${API_URL}/group/update/name/${groupId}`, data, { headers:  AuthService.authHeader() })
            .then(() => {
                dispatch({ type: UPDATE_GROUP_NAME, payload: data });
            })
            .catch((err) => console.log(err));
    };
};


export const changeGroupDescription = (groupId,data) => {
    return (dispatch) => {
        return axios
            .put(`${API_URL}/group/update/description/${groupId}`, data, { headers:  AuthService.authHeader() })
            .then(() => {
                dispatch({ type: UPDATE_GROUP_DESCRIPTION, payload: data });
            })
            .catch((err) => console.log(err));
    };
};

export const getGroupsByName = (name) => {
    return (dispatch) => {
        return axios
            .get(`${API_URL}/group/name/${name}`,{ headers:  AuthService.authHeader() })
            .then((res) => {
                dispatch({ type: GET_GROUP_BY_NAME, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};


export const deleteGroup = (groupId) => {
    return (dispatch) => {
        return axios({
            method: "delete",
            url: `${API_URL}/group/delete/${groupId}`,
            headers:  AuthService.authHeader()

        })
            .then(() => {
                dispatch({ type: DELETE_GROUP, payload: { groupId } });
            })
            .catch((err) => console.log(err));
    };
};
