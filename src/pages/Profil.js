import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import AuthService from "../components/Auth/AuthService";
import {useHistory} from "react-router-dom";
import {
    getOneUserById,
    getUserByEmail,
    updateUserEmail,
    updateUserFirstName,
    updateUserLastName,
    updateUserPassword,
    updateUserPseudo
} from "../actions/API/user.action";
import {useDispatch, useSelector} from "react-redux";
import {wait} from "../components/utils/Utils";
import {getFollowed, getFollowers} from "../actions/API/follower.action";

const Profil = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    if (AuthService.getCurrentUser() === null || AuthService.isExpiredToken()) {
        history.push("/login");
    }

    const user_id = localStorage.getItem("user_id");
    useEffect(() => {
        dispatch(getOneUserById(user_id));
    }, [dispatch, user_id]);
    const user = useSelector(state => state.userReducer);
    const [dataUser,setDataUser] = useState();

    useEffect(() => {
        dispatch(getFollowed(user_id));
    }, [dispatch, user_id]);
    const followed = useSelector((state) => state.followerReducer);
    const [dataFollowed, setDataFollowed] = useState();

    useEffect(() => {
        dispatch(getFollowers(user_id));
    }, [dispatch, user_id]);
    const followers = useSelector((state) => state.followerReducer);
    const [dataFollowers, setDataFollowers] = useState();

    const loadData = async () => {
        let userData = await user;
        setDataUser(userData);
        let followedData = await followed;
        setDataFollowed(followedData);
        let followersData = await followers;
        setDataFollowers(followersData);

        setPseudo(userData['pseudo']);
        setFirstname(userData["firstname"]);
        setLastname(userData["lastname"]);
        setPassword(userData["password"]);
        setMail(userData["email"]);
        console.log(dataUser);
        setFollowersInput(dataFollowers["length"]);
        console.log(dataFollowers);
        setFollowedInput(dataFollowed["length"]);
        console.log(dataFollowed);
    }
    loadData().then()

    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const [firstname, setFirstname] = useState("Loading...");
    const [lastname, setLastname] = useState("Loading...");
    const [pseudo, setPseudo] = useState("Loading...");
    const [password, setPassword] = useState("Loading...");
    const [tel, setTel] = useState("Loading...");
    const [email, setMail] = useState("Loading...");
    const [followersInput, setFollowersInput] = useState(0);
    const [followedInput, setFollowedInput] = useState(0);


    const onSubmit = data => {
        console.log(data);
        console.log("data before this line");

        if (data["firstname"] !== user_id["firstname"]) {
            dispatch(updateUserFirstName(user_id["id"], data));
        }

        if (data["lastname"] !== user_id["lastname"]) {
            dispatch(updateUserLastName(user_id["id"], data));
        }

        if (data.email !== AuthService.getCurrentUser().email) {
            dispatch(updateUserEmail(user_id["id"], data));
        }

        if (data["pseudo"] !==  user_id["pseudo"]) {
            dispatch(updateUserPseudo(user_id["id"], data));
        }

        if (data["password"] !== user_id["password"]) {
            dispatch(updateUserPassword(user_id["id"], data));
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
                        <div className="number-social-follow">{followersInput}</div>
                        <div className="title-social-follow">followers</div>
                    </div>
                    <div className="social-follow">
                        <div className="number-social-follow">{followedInput}</div>
                        <div className="title-social-follow">following</div>
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="form-profile">
                    <div className="container-profile">
                        <div className="social-profile-input">
                            <div className="title-input">Nom</div>
                            <input type="text"  {...register("lastname")} className="input-profile"
                                   value={lastname}/>
                        </div>
                        <div className="social-profile-input">
                            <div className="title-input">Prenom</div>
                            <input type="text"  {...register("firstname")} className="input-profile"
                                   value={firstname}/>
                        </div>
                    </div>
                    <div className="container-profile">
                        <div className="social-profile-input">
                            <div className="title-input">Pseudo</div>
                            <input type="text"  {...register("pseudo")} className="input-profile"
                                   value={pseudo}/>
                        </div>
                        <div className="social-profile-input">
                            <div className="title-input">Mot de passe</div>
                            <input type="password"  {...register("password")} className="input-profile" value={password}/>
                        </div>
                    </div>
                    <div className="container-profile">
                        <div className="social-profile-input">
                            <div className="title-input">Tel</div>
                            <input type="tel"  {...register("tel")} className="input-profile" value={tel}/>
                        </div>
                        <div className="social-profile-input">
                            <div className="title-input">Email</div>
                            <input type="text"  {...register("email")} className="input-profile" value={email}/>
                        </div>
                    </div>
                    <button className="button-profile">enregistrer</button>
                </form>
            </div>
        </div>
    );
};

export default Profil;
