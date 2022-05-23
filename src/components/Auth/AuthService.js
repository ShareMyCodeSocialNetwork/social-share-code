import React from 'react';


class  AuthService {

    logout = () => {
        localStorage.removeItem("user");
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

};

export default new AuthService();