import React from 'react';
import jwt from 'jwt-decode';

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
        console.log(user)
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
        return expToken < now;
    }

    getCurrentUserEmail = () => {
        return jwt(JSON.parse(localStorage.getItem('user')))["sub"];
    }

}

export default new AuthService();
