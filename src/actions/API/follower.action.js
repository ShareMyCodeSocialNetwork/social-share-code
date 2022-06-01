import axios from "axios";
import AuthService from "../../components/Auth/AuthService";



export const API_URL = "https://localhost:8080"
export const GET_FOLLOWER = "GET_FOLLOWER";
export const GET_FOLLOWER_BY_ID = "GET_FOLLOWER_BY_ID";
export const ADD_FOLLOWER = "ADD_FOLLOWER";
export const UPDATE_FOLLOWER = "UPDATE_FOLLOWER";
export const DELETE_FOLLOWER = "DELETE_FOLLOWER";

export const getFollowers = () => {
    return (dispatch) => {
        return axios
            .get(`${API_URL}/follower`, { headers: AuthService.authHeader() })
            .then((res) => {
                dispatch({ type: GET_FOLLOWER, payload: res.data });

            })
            .catch((err) => console.log(err));
    };
};

export const getOneFollowerById = (followerId) => {
    return (dispatch) => {
        return axios
            .get(`${API_URL}/follower/${followerId}`,{ headers:  AuthService.authHeader() })
            .then((res) => {
                dispatch({ type: GET_FOLLOWER_BY_ID, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};

export const getOneFollowedById = (followedId) => {
    return (dispatch) => {
        return axios
            .get(`${API_URL}/followed/${followedId}`,{ headers:  AuthService.authHeader() })
            .then((res) => {
                dispatch({ type: GET_FOLLOWER_BY_ID, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};

//TODO :  avoir tout les followers d'une personne


export const addFollower = (data) => {
    return (dispatch) => {
        return axios
            .post(`${API_URL}/follower/create`, data, { headers:  AuthService.authHeader() })
            .then(() => {
                dispatch({ type: ADD_FOLLOWER, payload: data });
            })
            .catch((err) => console.log(err));
    };
};



export const updateFollower = (followerId,data) => {
    return (dispatch) => {
        return axios
            .post(`${API_URL}/follower/update/${followerId}`, data, { headers:  AuthService.authHeader() })
            .then(() => {
                dispatch({ type: UPDATE_FOLLOWER, payload: data });
            })
            .catch((err) => console.log(err));
    };
};



export const deleteFollower = (followerId) => {
    return (dispatch) => {
        return axios({
            method: "delete",
            url: `${API_URL}/follower/delete/${followerId}`,
            headers:  AuthService.authHeader()

        })
            .then(() => {
                dispatch({ type: DELETE_FOLLOWER, payload: { followerId } });
            })
            .catch((err) => console.log(err));
    };
};