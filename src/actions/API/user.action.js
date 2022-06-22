import axios from "axios";
import AuthService from "../../components/Auth/AuthService";




export const API_URL = "http://localhost:8080"
export const GET_USER = "GET_USER";
export const GET_USER_BY_ID = "GET_USER_BY_ID";
export const GET_USER_BY_USER_ID = "GET_USER_BY_USER_ID";
export const GET_USER_BY_PSEUDO = "GET_USER_BY_PSEUDO";
export const GET_USER_BY_EMAIL = "GET_USER_BY_EMAIL";
export const ADD_USER = "ADD_USER";
export const UPDATE_USER_EMAIL = "UPDATE_USER_EMAIL";
export const UPDATE_USER_PSEUDO = "UPDATE_USER_PSEUDO";
export const UPDATE_USER_PASSWORD = "UPDATE_USER_PASSWORD";
export const UPDATE_USER_LAST_NAME = "UPDATE_USER_LAST_NAME";
export const UPDATE_USER_FIRST_NAME = "UPDATE_USER_FIRST_NAME";
export const UPDATE_USER = "UPDATE_USER";
export const DELETE_USER = "DELETE_USER";

export const getUser = () => {
    return (dispatch) => {
        return axios
            .get(`${API_URL}/user/`, { headers: AuthService.authHeader() })
            .then((res) => {
                dispatch({ type: GET_USER, payload: res.data });

            })
            .catch((err) => console.log(err));
    };
};

export const getOneUserById = (userId) => {
    return (dispatch) => {
        return axios
            .get(`${API_URL}/user/${userId}`,{ headers:  AuthService.authHeader() })
            .then((res) => {
                dispatch({ type: GET_USER_BY_ID, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};


export const getOneUserByPseudo = (pseudo) => {
    return (dispatch) => {
        return axios
            .get(`${API_URL}/user/pseudo/${pseudo}`,{ headers:  AuthService.authHeader() })
            .then((res) => {
                dispatch({ type: GET_USER_BY_PSEUDO, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};

export const getUserByEmail = (email) => {
    return (dispatch) => {
        return axios
            .get(`${API_URL}/user/email/${email}`,{ headers:  AuthService.authHeader() })
            .then((res) => {
                dispatch({ type: GET_USER_BY_EMAIL, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};

export const getOneUserByUserId = (userId) => {
    return (dispatch) => {
        return axios
            .get(`${API_URL}/user/${userId}`,{ headers:  AuthService.authHeader() })
            .then((res) => {
                dispatch({ type: GET_USER_BY_USER_ID, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};



export const updateUserPassword = (userId,data) => {
    return (dispatch) => {
        return axios
            .patch(`${API_URL}/user/update/password/${userId}`, data, { headers:  AuthService.authHeader() })
            .then(() => {
                dispatch({ type: UPDATE_USER_PASSWORD, payload: data });
            })
            .catch((err) => console.log(err));
    };
};

export const updateUserFirstName = (userId,data) => {
    return (dispatch) => {
        return axios
            .patch(`${API_URL}/user/update/firstname/${userId}`, data, { headers:  AuthService.authHeader() })
            .then(() => {
                dispatch({ type: UPDATE_USER_FIRST_NAME, payload: data });
            })
            .catch((err) => console.log(err));
    };
};

export const updateUserLastName = (userId,data) => {
    return (dispatch) => {
        return axios
            .patch(`${API_URL}/user/update/lastname/${userId}`, data, { headers:  AuthService.authHeader() })
            .then(() => {
                dispatch({ type: UPDATE_USER_LAST_NAME, payload: data });
            })
            .catch((err) => console.log(err));
    };
};


export const updateUserEmail = (userId,data) => {
    return (dispatch) => {
        return axios
            .patch(`${API_URL}/user/update/email/${userId}`, data, { headers:  AuthService.authHeader() })
            .then(() => {
                dispatch({ type: UPDATE_USER_EMAIL, payload: data });
            })
            .catch((err) => console.log(err));
    };
};


export const updateUserPseudo = (userId,data) => {
    return (dispatch) => {
        return axios
            .patch(`${API_URL}/user/update/pseudo/${userId}`, data, { headers:  AuthService.authHeader() })
            .then(() => {
                dispatch({ type: UPDATE_USER_PSEUDO, payload: data });
            })
            .catch((err) => console.log(err));
    };
};


export const addUser = (data) => {
    return (dispatch) => {
        return axios
            .post(`${API_URL}/user/create`, data, { headers:  AuthService.authHeader() })
            .then(() => {
                dispatch({ type: ADD_USER, payload: data });
            })
            .catch((err) => console.log(err));
    };
};




export const deleteUser = (userId) => {
    return (dispatch) => {
        return axios({
            method: "delete",
            url: `${API_URL}/user/delete/${userId}`,
            headers:  AuthService.authHeader()

        })
            .then(() => {
                dispatch({ type: DELETE_USER, payload: { userId } });
            })
            .catch((err) => console.log(err));
    };
};
