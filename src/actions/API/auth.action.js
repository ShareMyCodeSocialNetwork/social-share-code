import axios from "axios";
import qs from 'querystring'
export const API_URL = "http://localhost:8080/api"
export const LOGIN_USER = "LOGIN_USER";
export const REGISTER_USER = "REGISTER_USER";



export const login = (data) => {
    return (dispatch) => {
        console.log(data)
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(data),
            url: API_URL + '/login',
        };
        axios(options).then(response => {
            if (response.data.access_token) {
                dispatch({ type: LOGIN_USER, payload: response.data.access_token });
                localStorage.setItem("user", JSON.stringify(response.data.access_token));
                localStorage.setItem("refresh_user", JSON.stringify(response.data.refresh_token));
            }
            return response.data;
        });
    };
}


export const register = (data) => {
    return (dispatch) => {
        return axios
            .post(API_URL + "/user/create", data)
            .then((res) => {
                dispatch({ type: REGISTER_USER, payload: res.statusText });
            })
            .catch((err) => console.log(err));
    };
}





