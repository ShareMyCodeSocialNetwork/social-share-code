import axios from "axios";
import AuthService from "../../components/Auth/AuthService";




export const API_URL = "http://localhost:8080"
export const GET_SNIPPET = "GET_SNIPPET";
export const GET_SNIPPET_BY_ID = "GET_SNIPPET_BY_ID";
export const GET_SNIPPET_BY_USER_ID = "GET_SNIPPET_BY_USER_ID";
export const ADD_SNIPPET = "ADD_SNIPPET";
export const UPDATE_SNIPPET = "UPDATE_SNIPPET";
export const DELETE_SNIPPET = "DELETE_SNIPPET";

export const getSnippet = () => {
    return (dispatch) => {
        return axios
            .get(`${API_URL}/snippet/`, { headers: AuthService.authHeader() })
            .then((res) => {
                dispatch({ type: GET_SNIPPET, payload: res.data });

            })
            .catch((err) => console.log(err));
    };
};

export const getOneSnippetById = (snippetId) => {
    return (dispatch) => {
        return axios
            .get(`${API_URL}/snippet/${snippetId}`,{ headers:  AuthService.authHeader() })
            .then((res) => {
                dispatch({ type: GET_SNIPPET_BY_ID, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};


export const getOneSnippetByUserId = (userId) => {
    return (dispatch) => {
        return axios
            .get(`${API_URL}/snippet/user/${userId}`,{ headers:  AuthService.authHeader() })
            .then((res) => {
                dispatch({ type: GET_SNIPPET_BY_USER_ID, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};



export const updateSnippet = (snippetId,data) => {
    return (dispatch) => {
        return axios
            .put(`${API_URL}/snippet/update/${snippetId}`, data, { headers:  AuthService.authHeader() })
            .then(() => {
                dispatch({ type: UPDATE_SNIPPET, payload: data });
            })
            .catch((err) => console.log(err));
    };
};



export const addSnippet = (data) => {
    return (dispatch) => {
        return axios
            .post(`${API_URL}/snippet/create`, data, { headers:  AuthService.authHeader() })
            .then(() => {
                dispatch({ type: ADD_SNIPPET, payload: data });
            })
            .catch((err) => console.log(err));
    };
};




export const deleteSnippet = (snippetId) => {
    return (dispatch) => {
        return axios({
            method: "delete",
            url: `${API_URL}/snippet/delete/${snippetId}`,
            headers:  AuthService.authHeader()

        })
            .then(() => {
                dispatch({ type: DELETE_SNIPPET, payload: { snippetId } });
            })
            .catch((err) => console.log(err));
    };
};
