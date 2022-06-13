import axios from "axios";
import AuthService from "../../components/Auth/AuthService";



export const API_URL = "https://localhost:8080"
export const GET_CODE = "GET_CODE";
export const GET_CODE_BY_ID = "GET_CODE_BY_ID";
export const ADD_CODE = "ADD_CODE";
export const UPDATE_CODE = "UPDATE_CODE";
export const DELETE_CODE = "DELETE_CODE";

export const getCodes = () => {
    return (dispatch) => {
        return axios
            .get(`${API_URL}/code`, { headers: AuthService.authHeader() })
            .then((res) => {
                dispatch({ type: GET_CODE, payload: res.data });

            })
            .catch((err) => console.log(err));
    };
};

export const getOneCodeById = (codeId) => {
    return (dispatch) => {
        return axios
            .get(`${API_URL}/code/${codeId}`,{ headers:  AuthService.authHeader() })
            .then((res) => {
                dispatch({ type: GET_CODE_BY_ID, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};




export const addCode = (data) => {
    return (dispatch) => {
        return axios
            .post(`${API_URL}/code/create`, data, { headers:  AuthService.authHeader() })
            .then(() => {
                dispatch({ type: ADD_CODE, payload: data });
            })
            .catch((err) => console.log(err));
    };
};



export const updateCode = (codeId,data) => {
    return (dispatch) => {
        return axios
            .put(`${API_URL}/code/update/${codeId}`, data, { headers:  AuthService.authHeader() })
            .then(() => {
                dispatch({ type: UPDATE_CODE, payload: data });
            })
            .catch((err) => console.log(err));
    };
};



export const deleteCode = (codeId) => {
    return (dispatch) => {
        return axios({
            method: "delete",
            url: `${API_URL}/code/delete/${codeId}`,
            headers:  AuthService.authHeader()

        })
            .then(() => {
                dispatch({ type: DELETE_CODE, payload: { codeId } });
            })
            .catch((err) => console.log(err));
    };
};