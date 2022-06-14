import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import AuthService from "../components/Auth/AuthService";
import {useHistory} from "react-router-dom";
import {
    getUserByEmail,
    updateUserEmail,
    updateUserFirstName,
    updateUserLastName,
    updateUserPassword,
    updateUserPseudo
} from "../actions/API/user.action";
import {useDispatch, useSelector} from "react-redux";
import {wait} from "../components/utils/Utils";
//import {getFollowed, getFollowers} from "../actions/API/follower.action";

const Profil = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    if (AuthService.getCurrentUser() === null) {
        history.push("/login");
    }


    useEffect(() => {
        dispatch(getUserByEmail(AuthService.getCurrentUserEmail()));
    }, [dispatch]);

    const user = useSelector((state) => state.userReducer);

    const [dataUser, setDataUser] = useState();

    const loadUserData = async () => {
        let userData = await user;
        setDataUser(userData);
    }
    loadUserData().then(()=>console.log(dataUser));


/*
    useEffect(() => {
        dispatch(getFollowed(dataUser["id"]));
    }, [dataUser, dispatch]);
    const followed = useSelector((state) => state.userReducer);

    const [dataFollowed, setDataFollowed] = useState();

    const loadFollowedData = async () => {
        let followedData = await followed;
        setDataFollowed(followedData);
    }
    loadFollowedData().then(()=>console.log(dataFollowed));

    useEffect(() => {
        dispatch(getFollowers(dataUser["id"]));
    }, [dataUser, dispatch]);
    const followers = useSelector((state) => state.userReducer);

    const [dataFollowers, setDataFollowers] = useState();

    const loadFollowersData = async () => {
        let followersData = await followers;
        setDataFollowers(followersData);
    }
    loadFollowersData().then(()=>console.log(dataFollowers));*/




    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const [firstName, setFirstName] = useState(
            dataUser === undefined ?
            "firstname" :
            dataUser["firstname"]
)
    ;
    const [lastName, setLastName] = useState(
        dataUser === undefined ?
            "lastname" :
            dataUser["lastname"]
    );
    const [pseudo, setPseudo] = useState(
        dataUser === undefined ?
            "pseudo" :
            dataUser["pseudo"]
    );
    const [mdp, setMdp] = useState(
        dataUser === undefined ?
            "password" :
            dataUser["password"]
    );
    const [tel, setTel] = useState("0622901123");
    const [mail, setMail] = useState(
        AuthService.getCurrentUser() == null ?
            "email" :
            AuthService.getCurrentUserEmail
    );


    const onSubmit = data => {
        console.log(data["firstname"]);

        if (data["firstname"] !== dataUser["firstname"]) {
            dispatch(updateUserFirstName(dataUser["id"], data));
        }

        if (data["lastname"] !== dataUser["lastname"]) {
            dispatch(updateUserLastName(dataUser["id"], data));
        }

        if (data.email !== AuthService.getCurrentUser().email) {
            dispatch(updateUserEmail(dataUser["id"], data));
        }

        if (data["pseudo"] !==  dataUser["pseudo"]) {
            dispatch(updateUserPseudo(dataUser["id"], data));
        }

        if (data["password"] !== dataUser["password"]) {
            dispatch(updateUserPassword(dataUser["id"], data));
        }

        wait(2000).then(r => {
            history.push({
                pathname: "/profil"
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
                            <input type="text"  {...register("lastName")} className="input-profile"
                                   defaultValue={lastName}/>
                        </div>
                        <div className="social-profile-input">
                            <div className="title-input">Prenom</div>
                            <input type="text"  {...register("firstName")} className="input-profile"
                                   defaultValue={firstName}/>
                        </div>
                    </div>
                    <div className="container-profile">
                        <div className="social-profile-input">
                            <div className="title-input">Pseudo</div>
                            <input type="text"  {...register("pseudo")} className="input-profile"
                                   defaultValue={pseudo}/>
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