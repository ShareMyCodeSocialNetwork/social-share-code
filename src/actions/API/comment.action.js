import axios from "axios";
import AuthService from "../../components/Auth/AuthService";



export const API_URL = "http://localhost:8080"
export const GET_COMMENT = "GET_COMMENT";
export const GET_COMMENT_BY_ID = "GET_COMMENT_BY_ID";
export const GET_COMMENTS_BY_USER = "GET_COMMENTS_BY_USER";
export const GET_COMMENTS_BY_POST = "GET_COMMENTS_BY_POST";
export const ADD_COMMENT = "ADD_COMMENT";
export const UPDATE_COMMENT = "UPDATE_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

export const getComments = () => {
    return (dispatch) => {
        return axios
            .get(`${API_URL}/comment`, { headers: AuthService.authHeader() })
            .then((res) => {
                dispatch({ type: GET_COMMENT, payload: res.data });

            })
            .catch((err) => console.log(err));
    };
};

export const getOneCommentById = (commentId) => {
    return (dispatch) => {
        return axios
            .get(`${API_URL}/comment/${commentId}`,{ headers:  AuthService.authHeader() })
            .then((res) => {
                dispatch({ type: GET_COMMENT_BY_ID, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};




export const addComment = (data) => {
    return (dispatch) => {
        return axios
            .post(`${API_URL}/comment/create`, data, { headers:  AuthService.authHeader() })
            .then(() => {
                dispatch({ type: ADD_COMMENT, payload: data });
            })
            .catch((err) => console.log(err));
    };
};



export const updateComment = (commentId,data) => {
    return (dispatch) => {
        return axios
            .patch(`${API_URL}/comment/update/${commentId}`, data, { headers:  AuthService.authHeader() })
            .then(() => {
                dispatch({ type: UPDATE_COMMENT, payload: data });
            })
            .catch((err) => console.log(err));
    };
};



export const deleteComment = (commentId) => {
    return (dispatch) => {
        return axios({
            method: "delete",
            url: `${API_URL}/comment/delete/${commentId}`,
            headers:  AuthService.authHeader()

        })
            .then(() => {
                dispatch({ type: DELETE_COMMENT, payload: { commentId } });
            })
            .catch((err) => console.log(err));
    };
};

export const getCommentsByUser = (userId) => {
    return (dispatch) => {
        return axios
            .get(`${API_URL}/comment/user/${userId}`,{ headers:  AuthService.authHeader() })
            .then((res) => {
                dispatch({ type: GET_COMMENTS_BY_USER, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};

export const getCommentsByPost = (postId) => {
    return (dispatch) => {
        return axios
            .get(`${API_URL}/comment/post/${postId}`,{ headers:  AuthService.authHeader() })
            .then((res) => {
                dispatch({ type: GET_COMMENTS_BY_POST, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};
