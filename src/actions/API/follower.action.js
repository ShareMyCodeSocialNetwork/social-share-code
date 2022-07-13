import axios from "axios";
import AuthService from "../../components/Auth/AuthService";
import {API_URL} from "../global";


export const GET_ALL = "GET_ALL";
export const GET_FOLLOWER_BY_ID = "GET_FOLLOWER_BY_ID";
export const GET_FOLLOWED = "GET_FOLLOWED";
export const GET_FOLLOWER = "GET_FOLLOWER";
export const ADD_FOLLOWER = "ADD_FOLLOWER";
export const DELETE_FOLLOWER = "DELETE_FOLLOWER";
export const GET_BY_FOLLOWED_AND_FOLLOWER = "GET_BY_FOLLOWED_AND_FOLLOWER";


export const getAll = () => {
    return (dispatch) => {
        return axios
            .get(`${API_URL}/follow`, { headers: AuthService.authHeader() })
            .then((res) => {
                dispatch({ type: GET_ALL, payload: res.data });

            })
            .catch((err) => console.log(err));
    };
};

export const getOneFollowById = (followId) => {
    return (dispatch) => {
        return axios
            .get(`${API_URL}/follow/${followId}`,{ headers:  AuthService.authHeader() })
            .then((res) => {
                dispatch({ type: GET_FOLLOWER_BY_ID, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};


export const getByFollowedAndFollower = (followedId, followerId) => {
    let data = {};
    data.followedUserId = followedId;
    data.followerUserId = followerId;
    return (dispatch) => {
        return axios
            .post(`${API_URL}/follow/followed/and/follower`, data,{ headers:  AuthService.authHeader()})
            .then((res) => {
                dispatch({ type: GET_BY_FOLLOWED_AND_FOLLOWER, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};

export const addFollower = (data) => {
    return (dispatch) => {
        return axios
            .post(`${API_URL}/follow/create`, data, { headers:  AuthService.authHeader() })
            .then(() => {
                dispatch({ type: ADD_FOLLOWER, payload: data });
            })
            .catch((err) => console.log(err));
    };
};


export const getFollowers = (followedId) => {
    return (dispatch) => {
        return axios
            .get(`${API_URL}/follow/followed/${followedId}`,{ headers:  AuthService.authHeader() })
            .then((res) => {
                dispatch({ type: GET_FOLLOWER, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};

export const getFollowed = (userId) => {
    return (dispatch) => {
        return axios
            .get(`${API_URL}/follow/follower/${userId}`,{ headers:  AuthService.authHeader() })
            .then((res) => {
                dispatch({ type: GET_FOLLOWED, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};

export const deleteFollower = (followerId) => {
    return (dispatch) => {
        return axios({
            method: "delete",
            url: `${API_URL}/follow/delete/${followerId}`,
            headers:  AuthService.authHeader()

        })
            .then(() => {
                //dispatch({ type: DELETE_FOLLOWER, payload: { followerId } });
            })
            .catch((err) => console.log(err));
    };
};
