import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {login} from "../actions/API/auth.action";
import {isEmpty, wait} from "../components/utils/Utils";
import AuthService from "../components/Auth/AuthService";
import {Redirect, useHistory} from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory()

    if(!AuthService.isExpiredToken() && AuthService.getCurrentUser() !== null){
        history.push("/");
    }

    const { register, handleSubmit , getValues, formState,errors } = useForm();


    const onSubmit = data => {
        dispatch(login(data))
        wait(4000).then(r => {
            componentDidMount()
        })
    }
    const componentDidMount = () => {
        const user = AuthService.getCurrentUser();
        console.log(user)
        if (user) {
            history.push({
                pathname:"/"
            })
        }else {
            window.confirm("invalid credentials");
        }
    }

    return (
        <div className="view--auth">
            <div className="right-part-auth">
                <img className="right-img-auth" src="/assets/img/login.svg" alt="login"/>
            </div>
            <div className="left-part-auth">
                <div className="title-auth-left">Login</div>
                <form  className="auth-from">
                    <input  {...register("email")} type="text" placeholder="email" className="form-input"/>
                    <input {...register("password")} type="password" placeholder="password" className="form-input"/>
                </form>
                <div onClick={handleSubmit(onSubmit)} className="button-send">Login</div>
            </div>
        </div>
    );
};

export default Login;