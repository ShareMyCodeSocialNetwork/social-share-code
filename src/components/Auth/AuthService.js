import React from 'react';
import jwt from 'jwt-decode';
import {getUserByEmail} from "../../actions/API/user.action";
import {useDispatch} from "react-redux";
import {wait} from "../utils/Utils";


class  AuthService {

    logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("refresh_user");
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

    getCurrentUserEmail = () => {
        return jwt(JSON.parse(localStorage.getItem('user')))["sub"];
    }

    getUserInfo = () => {
        const dispatch = useDispatch();
        return dispatch(
            getUserByEmail(
                this.getCurrentUserEmail()
            )
        );
    }

};

export default new AuthService();