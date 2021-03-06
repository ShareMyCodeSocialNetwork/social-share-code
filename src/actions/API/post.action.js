import axios from "axios";
import AuthService from "../../components/Auth/AuthService";
import {API_URL} from "../global";


export const GET_POST = "GET_POST";
export const GET_POST_BY_ID = "GET_POST_BY_ID";
export const GET_POST_BY_USER_ID = "GET_POST_BY_USER_ID";
export const GET_FULL_POST = "GET_FULL_POST";
export const GET_FULL_POST_BY_ID = "GET_FULL_POST_BY_ID";
export const GET_FULL_POST_BY_USER_ID = "GET_FULL_POST_BY_USER_ID";
export const GET_FULL_USER_POST_FOLLOWED_BY_USER_FOLLOWER = "GET_FULL_USER_POST_FOLLOWED_BY_USER_FOLLOWER";
export const SEARCH_POST = "SEARCH_POST";
export const ADD_POST = "ADD_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";

export const getPosts = () => {
    return (dispatch) => {
        return axios
            .get(`${API_URL}/post/`, { headers: AuthService.authHeader() })
            .then((res) => {
                dispatch({ type: GET_POST, payload: res.data });

            })
            .catch((err) => console.log(err));
    };
};

export const getOnePostById = (postId) => {
    return (dispatch) => {
        return axios
            .get(`${API_URL}/post/${postId}`,{ headers:  AuthService.authHeader() })
            .then((res) => {
                dispatch({ type: GET_POST_BY_ID, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};

export const searchPostL = (value) => {
    return (dispatch) => {
        return axios
            .get(`${API_URL}/post/search/levenshtein/${value}`,{ headers:  AuthService.authHeader() })
            .then((res) => {
                dispatch({ type: SEARCH_POST, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};

export const getFullPostFollowedUserByFollowerUser = (userId) => {
    return (dispatch) => {
        return axios
            .get(`${API_URL}/post/full/follower/${userId}`,{ headers:  AuthService.authHeader() })
            .then((res) => {
                dispatch({ type: GET_FULL_USER_POST_FOLLOWED_BY_USER_FOLLOWER, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};



export const getFullPostById = (postId) => {
    return (dispatch) => {
        return axios
            .get(`${API_URL}/post/full/${postId}`,{ headers:  AuthService.authHeader() })
            .then((res) => {
                dispatch({ type: GET_FULL_POST_BY_ID, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};

export const getFullPostByUser = (userId) => {
    return (dispatch) => {
        return axios
            .get(`${API_URL}/post/user/${userId}/full/`,{ headers:  AuthService.authHeader() })
            .then((res) => {
                dispatch({ type: GET_FULL_POST_BY_USER_ID, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};

export const getFullPosts = () => {
    return (dispatch) => {
        return axios
            .get(`${API_URL}/post/full/`,{ headers:  AuthService.authHeader() })
            .then((res) => {
                dispatch({ type: GET_FULL_POST, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};

export const getPostByUserId = (userId) => {
    return (dispatch) => {
        return axios
            .get(`${API_URL}/post/user/${userId}`,{ headers:  AuthService.authHeader() })
            .then((res) => {
                dispatch({ type: GET_POST_BY_USER_ID, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};



export const updatePost = (postId,data) => {
    return (dispatch) => {
        return axios
            .patch(`${API_URL}/post/update/${postId}`, data, { headers:  AuthService.authHeader() })
            .then(() => {
                dispatch({ type: UPDATE_POST, payload: data });
            })
            .catch((err) => console.log(err));
    };
};



export const addPost = (data) => {
    return (dispatch) => {
        return axios
            .post(`${API_URL}/post/create`, data, { headers:  AuthService.authHeader() })
            .then(() => {
                dispatch({ type: ADD_POST, payload: data });
            })
            .catch((err) => console.log(err));
    };
};




export const deletePost = (postId) => {
    return (dispatch) => {
        return axios({
            method: "delete",
            url: `${API_URL}/post/${postId}`,
            headers:  AuthService.authHeader()

        })
            .then(() => {
                dispatch({ type: DELETE_POST, payload: { postId } });
            })
            .catch((err) => console.log(err));
    };
};
