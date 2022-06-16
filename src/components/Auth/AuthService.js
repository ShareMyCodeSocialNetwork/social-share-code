import React from 'react';
import jwt from 'jwt-decode';


class  AuthService {

    logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("refresh_user");
        localStorage.removeItem("user_id");
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
        const decoded = jwt(JSON.parse(localStorage.getItem('user')));
        //console.log(decoded);
        let expToken = new Date(decoded["exp"]);
        let now = new Date();
        /*console.log("now.valueOf() " + now.valueOf())
        console.log("now " + now)
        console.log("expToken.valueOf() "+expToken.valueOf())
        cosole.log("expToken " + expToken)*/
        return expToken.valueOf() > now.valueOf();
    }

    getCurrentUserEmail = () => {
        return jwt(JSON.parse(localStorage.getItem('user')))["sub"];
    }

}

export default new AuthService();
