import React from 'react';
import jwt from 'jwt-decode';

class  AuthService {

    logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("refresh_user");
        localStorage.removeItem("user_id");
        localStorage.removeItem("access_expire");
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
        console.log(expToken);
        console.log(now);
        console.log(expToken.valueOf());
        console.log(now.valueOf());
        //todo a voir le format de date dans l'api
        //  1655848800000 // api manque une partie de la date (les 0). cest coter js front ou java api
        //  1655849843889 // now
        return expToken.valueOf() <= now.valueOf();
    }

    getCurrentUserEmail = () => {
        return jwt(JSON.parse(localStorage.getItem('user')))["sub"];
    }

}

export default new AuthService();
