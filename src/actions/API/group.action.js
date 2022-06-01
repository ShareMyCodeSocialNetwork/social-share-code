import axios from "axios";
import AuthService from "../../components/Auth/AuthService";



export const API_URL = "https://localhost:8080"
export const GET_GROUP = "GET_GROUP";
export const GET_GROUP_BY_ID = "GET_GROUP_BY_ID";
export const ADD_GROUP = "ADD_GROUP";
export const UPDATE_GROUP = "UPDATE_GROUP";
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



//TODO :  avoir tout les GROUPs d'une personne


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
            .post(`${API_URL}/group/update/${groupId}`, data, { headers:  AuthService.authHeader() })
            .then(() => {
                dispatch({ type: UPDATE_GROUP, payload: data });
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