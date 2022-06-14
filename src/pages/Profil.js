import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import AuthService from "../components/Auth/AuthService";
import {Redirect, useHistory} from "react-router-dom";
import { updateUserEmail, updateUserFirstName, updateUserLastName, updateUserPassword, updateUserPseudo } from "../actions/API/user.action";
import {useDispatch} from "react-redux";
import {isEmpty, wait} from "../components/utils/Utils";

const Profil = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    /*if(AuthService.getCurrentUser() === null){
        history.push("/login");
    }*/
    let user = AuthService.getUserInfo();
    console.log(user);

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [firstName,setFirstName] = useState(AuthService.getCurrentUser() == null ? "firstname" : AuthService.getCurrentUser().firstname)
    const [lastName,setLastName] = useState(AuthService.getCurrentUser() == null ? "lastname" : AuthService.getCurrentUser().lastName)
    const [pseudo,setPseudo] = useState(AuthService.getCurrentUser() == null ? "pseudo" : AuthService.getCurrentUser().pseudo)
    const [mdp,setMdp] = useState(AuthService.getCurrentUser() == null ? "password" : AuthService.getCurrentUser().password)
    const [tel,setTel] = useState("0622901123")
    const [mail,setMail] = useState(AuthService.getCurrentUser() == null ? "email" : AuthService.getCurrentUser().email)

    const onSubmit = data => {
        console.log(data);

        if(data.firstName !== AuthService.getCurrentUser().firstName){
            dispatch(updateUserFirstName(/*userId a mettre*//*AuthService.getCurrentUser().id,*/ data));
        }

        if(data.lastName !== AuthService.getCurrentUser().lastName){
            dispatch(updateUserLastName(/*userId a mettre*//*AuthService.getCurrentUser().id,*/ data));
        }

        if(data.email !== AuthService.getCurrentUser().email){
            dispatch(updateUserEmail(/*userId a mettre*//*AuthService.getCurrentUser().id,*/ data));
        }

        if(data.pseudo !== AuthService.getCurrentUser().pseudo){
            dispatch(updateUserPseudo(/*userId a mettre*//*AuthService.getCurrentUser().id,*/ data));
        }

        if(data.password !== AuthService.getCurrentUser().password){
            dispatch(updateUserPassword(/*userId a mettre*//*AuthService.getCurrentUser().id,*/ data));
        }

        wait(2000).then( r => {
            history.push({
                pathname:"/profil"
            })
        })
    }



    return (
        <div className="view--profile">
            <div className="header-profile">
                <img className="overlay-profile" src="" alt=""/>
                <div className="profile-data">
                    <div className="title-name">{pseudo}</div>
                    <div className="image-profile">
                        <img src="/assets/logo/profil_header.png" alt="profile"/>
                    </div>
                </div>
            </div>
            <div className="body-profile">
                <div className="social-profile">
                    <div className="social-follow margin">
                        <div className="number-social-follow">0</div>
                        <div className="title-social-follow">followers</div>
                    </div>
                    <div className="social-follow">
                        <div className="number-social-follow">0</div>
                        <div className="title-social-follow">following</div>
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="form-profile">
                    <div className="container-profile">
                        <div className="social-profile-input">
                            <div className="title-input">Nom</div>
                            <input type="text"  {...register("lastName")} className="input-profile" defaultValue={lastName}/>
                        </div>
                        <div className="social-profile-input">
                            <div className="title-input">Prenom</div>
                            <input type="text"  {...register("firstName")} className="input-profile" defaultValue={firstName}/>
                        </div>
                    </div>
                    <div className="container-profile">
                        <div className="social-profile-input">
                            <div className="title-input">Pseudo</div>
                            <input type="text"  {...register("pseudo")} className="input-profile" defaultValue={pseudo}/>
                        </div>
                        <div className="social-profile-input">
                            <div className="title-input">MDP</div>
                            <input type="password"  {...register("mdp")} className="input-profile" defaultValue={mdp}/>
                        </div>
                    </div>
                    <div className="container-profile">
                        <div className="social-profile-input">
                            <div className="title-input">Tel</div>
                            <input type="tel"  {...register("tel")} className="input-profile" defaultValue={tel}/>
                        </div>
                        <div className="social-profile-input">
                            <div className="title-input">Email</div>
                            <input type="text"  {...register("mail")} className="input-profile" defaultValue={mail}/>
                        </div>
                    </div>
                    <button className="button-profile">enregistrer</button>
                </form>
            </div>
        </div>
    );
};

export default Profil;