import axios from "axios";
import AuthService from "../../components/Auth/AuthService";



export const API_URL = "https://localhost:8080"
export const GET_LIKES = "GET_LIKES";
export const GET_LIKE_BY_ID = "GET_LIKE_BY_ID";
export const GET_POST_LIKE = "GET_POST_LIKE";
export const ADD_LIKE = "ADD_LIKE";
export const DELETE_LIKE = "DELETE_LIKE";

export const getLikes = () => {
    return (dispatch) => {
        return axios
            .get(`${API_URL}/like/`, { headers: AuthService.authHeader() })
            .then((res) => {
                dispatch({ type: GET_LIKES, payload: res.data });

            })
            .catch((err) => console.log(err));
    };
};

export const getOneLikeById = (likeId) => {
    return (dispatch) => {
        return axios
            .get(`${API_URL}/like/${likeId}`,{ headers:  AuthService.authHeader() })
            .then((res) => {
                dispatch({ type: GET_LIKE_BY_ID, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};



//TODO :  avoir tout les LIKEs d'une personne


export const addLike = (data) => {
    return (dispatch) => {
        return axios
            .post(`${API_URL}/like/create`, data, { headers:  AuthService.authHeader() })
            .then(() => {
                dispatch({ type: ADD_LIKE, payload: data });
            })
            .catch((err) => console.log(err));
    };
};

export const getPostLike = (postId,data) => {
    return (dispatch) => {
        return axios
            .get(`${API_URL}/post/${postId}`, { headers:  AuthService.authHeader() })
            .then(() => {
                dispatch({ type: GET_POST_LIKE, payload: data });
            })
            .catch((err) => console.log(err));
    };
};


export const deleteLike = (likeId) => {
    return (dispatch) => {
        return axios({
            method: "delete",
            url: `${API_URL}/like/delete/${likeId}`,
            headers:  AuthService.authHeader()

        })
            .then(() => {
                dispatch({ type: DELETE_LIKE, payload: { likeId } });
            })
            .catch((err) => console.log(err));
    };
};
