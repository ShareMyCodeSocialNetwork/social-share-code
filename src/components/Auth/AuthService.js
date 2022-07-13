import React from 'react';
import jwt from 'jwt-decode';
import {useHistory} from "react-router-dom";

class  AuthService {

    logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("refresh_user");
        localStorage.removeItem("user_id");
        localStorage.removeItem("access_expire");
    }

    getUserId = () => {
        return localStorage.getItem('user_id')
    }

    getCurrentUser = () => {
          return JSON.parse(localStorage.getItem('user'));
    }

    authHeader = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        //console.log(user)
        if (user) {
            return {
                Authorization: 'Bearer ' + user,
            };
        } else {
            return {};
        }
    }

    isExpiredToken = () => {
        let expToken = new Date(localStorage.getItem("access_expire"));
        let now = new Date();

        return expToken.getFullYear() <= now.getFullYear()
            && expToken.getDate() <= now.getDate()
            && expToken.getMonth() <= now.getMonth();
    }

    getCurrentUserEmail = () => {
        return jwt(JSON.parse(localStorage.getItem('user')))["sub"];
    }



    isAuth = () => {
        const history = useHistory();
        if (this.getCurrentUser() === null || this.isExpiredToken()) {
            if(this.getCurrentUser() !== null && this.isExpiredToken()){
                this.logout();
                alert('Session expired, please login again')
            }
            history.push("/login");
        }
    }

}

export default new AuthService();
