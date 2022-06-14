import axios from "axios";
import AuthService from "../../components/Auth/AuthService";

export const API_URL = "http://localhost:8080";
export const GET_ROLE = "GET_ROLE";
export const GET_ROLE_BY_ID = "GET_ROLE_BY_ID";
export const GET_ROLE_BY_NAME = "GET_ROLE_BY_NAME";
export const ADD_ROLE = "ADD_ROLE";
export const UPDATE_ROLE_NAME = "UPDATE_ROLE_NAME";
export const DELETE_ROLE = "DELETE_ROLE";

export const getRoles = () => {
    return (dispatch) => {
        return axios
            .get(`${API_URL}/role/`, { headers: AuthService.authHeader() })
            .then((res) => {
                dispatch({ type: GET_ROLE, payload: res.data });

            })
            .catch((err) => console.log(err));
    };
};

export const getRoleById = (ROLEId) => {
    return (dispatch) => {
        return axios
            .get(`${API_URL}/role/${ROLEId}`,{ headers:  AuthService.authHeader() })
            .then((res) => {
                dispatch({ type: GET_ROLE_BY_ID, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};

export const addRole = (data) => {
    return (dispatch) => {
        return axios
            .post(`${API_URL}/role/create`, data, { headers:  AuthService.authHeader() })
            .then(() => {
                dispatch({ type: ADD_ROLE, payload: data });
            })
            .catch((err) => console.log(err));
    };
};



export const changeRoleName = (roleId,data) => {
    return (dispatch) => {
        return axios
            .patch(`${API_URL}/role/${roleId}`, data, { headers:  AuthService.authHeader() })
            .then(() => {
                dispatch({ type: UPDATE_ROLE_NAME, payload: data });
            })
            .catch((err) => console.log(err));
    };
};


export const getRoleByName = (name) => {
    return (dispatch) => {
        return axios
            .get(`${API_URL}/role/${name}`,{ headers:  AuthService.authHeader() })
            .then((res) => {
                dispatch({ type: GET_ROLE_BY_NAME, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};

export const deleteRole = (roleId) => {
    return (dispatch) => {
        return axios
            .delete(`${API_URL}/role/${roleId}`,{ headers:  AuthService.authHeader() })
            .then(() => {
                dispatch({ type: DELETE_ROLE, payload: { roleId } });
            })
            .catch((err) => console.log(err));
    };
};
