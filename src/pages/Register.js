import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {useForm} from "react-hook-form";
import {login, register_user} from "../actions/API/auth.action";
import {wait} from "../components/utils/Utils";

const Register = () => {

    const dispatch = useDispatch();
    const history = useHistory()
    const { register, handleSubmit , getValues, formState,errors } = useForm();
    const [response, setResponse]  = useState("");

    const onSubmit = data => {
        console.log(data)
        dispatch(register_user(data));
        wait(2000).then( r => {
            history.push({
                pathname:"/login"
            })
        })
    }

    return (
        <div className="view--auth">
            <div className="right-part-auth">
                <img className="right-img-auth" src="/assets/img/signUp.svg" alt="register"/>
            </div>
            <div className="left-part-auth">
                <div className="title-auth-left">Register</div>
                <form action="" className="auth-from">
                    <input {...register("lastName")} type="text" placeholder="Lastname" className="form-input"/>
                    <input {...register("firstName")} type="text" placeholder="firstname" className="form-input"/>
                    <input {...register("pseudo")} type="text" placeholder="pseudo" className="form-input"/>
                    <input {...register("password")} type="password" placeholder="password" className="form-input"/>
                    <input {...register("email")} type="text" placeholder="email" className="form-input"/>
                    <input {...register("tel")} type="text" placeholder="tel" className="form-input"/>
                </form>
                <div onClick={handleSubmit(onSubmit)} className="button-send">register</div>
            </div>

        </div>
    );
};

export default Register;