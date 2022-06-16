import axios from "axios";
import qs from 'querystring';
import AuthService from "../../components/Auth/AuthService";
export const API_URL = "http://localhost:8080"
export const LOGIN_USER = "LOGIN_USER";
export const CURRENT_USER_INFO = "CURRENT_USER_INFO";
export const REGISTER_USER = "REGISTER_USER";
export const REFRESH_TOKEN = "REFRESH_TOKEN";



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
            if (response.data["access_token"]) {
                dispatch({ type: LOGIN_USER, payload: response.data["access_token"] });
                localStorage.setItem("user", JSON.stringify(response.data["access_token"]));
                localStorage.setItem("refresh_user", JSON.stringify(response.data["refresh_token"]));

                const init = {
                    method: 'GET',
                    headers: { 'Authorization': 'Bearer ' + response.data["access_token"] },
                    url: API_URL + '/user/email/' + AuthService.getCurrentUserEmail(),
                };
                axios(init)
                    .then((response)=>{
                        dispatch({ type: CURRENT_USER_INFO, payload: response.data });
                        localStorage.setItem("user_id", response.data["id"]);
                })

            }
            return response.data;
        });
    };
}


export const register_user = (data) => {
    return (dispatch) => {
        return axios
            .post(API_URL + "/user/create", data)
            .then((res) => {
                dispatch({ type: REGISTER_USER, payload: res.statusText });
            })
            .catch((err) => console.log(err));
    };
}

export const refresh_token = () => {
    return (dispatch) => {
        return axios
            .get(API_URL + "/token/refresh")
            .then((res) => {
                dispatch({ type: REFRESH_TOKEN, payload: res.statusText });
            })
            .catch((err) => console.log(err));
    };
}



