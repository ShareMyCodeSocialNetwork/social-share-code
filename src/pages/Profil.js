import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import AuthService from "../components/Auth/AuthService";
import {useHistory, useParams} from "react-router-dom";
import {
    getOneUserById,
    updateUserEmail,
    updateUserFirstName,
    updateUserLastName,
    updateUserPassword,
    updateUserPseudo
} from "../actions/API/user.action";
import {useDispatch, useSelector} from "react-redux";
import {isEmpty, wait} from "../components/utils/Utils";
import {getFollowed, getFollowers} from "../actions/API/follower.action";
import {getProjectByOwner} from "../actions/API/project.action";
import ProjectView from "../components/pages/ProjectView";
import {getPostByUserId} from "../actions/API/post.action";
import PostView from "./PostView";
import CardSearchCode from "../components/pages/CardSearchCode";

const Profil = () => {
    const {id} = useParams();

    const dispatch = useDispatch();
    const history = useHistory();

    if (AuthService.getCurrentUser() === null || AuthService.isExpiredToken()) {
        //todo fix date, show AuthService.isExpiredToken todo
        //if(AuthService.getCurrentUser() !== null && AuthService.isExpiredToken()){
          //  AuthService.logout();
        //}
        //history.push("/login");
    }

    const user_id = localStorage.getItem("user_id");
    useEffect(() => {
        dispatch(getOneUserById(id));
        dispatch(getFollowed(id));
        dispatch(getFollowers(id));
        dispatch(getProjectByOwner(id));
        dispatch(getPostByUserId(id))
    }, []);
    const user = useSelector(state => state.userReducer);
    const [dataUser,setDataUser] = useState();

    const followed = useSelector((state) => state.followerReducer);
    const [dataFollowed, setDataFollowed] = useState([]);

    const followers = useSelector((state) => state.followerReducer);
    const [dataFollowers, setDataFollowers] = useState([]);

    const posts = useSelector((state) => state.postReducer);
    const [dataPosts, setDataPosts] = useState([]);

    const projectProfile = useSelector( (state) => state.projectReducer);
    const [dataProjectProfile, setDataProjectProfile] = useState([]);

    const {register, handleSubmit, watch, formState: {errors}} = useForm({ shouldUseNativeValidation: true });

    const [followersInput, setFollowersInput] = useState(0);
    const [followedInput, setFollowedInput] = useState(0);

    const [firstname, setFirstname] = useState("Loading...");
    const [lastname, setLastname] = useState("Loading...");
    const [pseudo, setPseudo] = useState("Loading...");
    const [password, setPassword] = useState("Loading...");
    const [tel, setTel] = useState("Loading...");
    const [email, setMail] = useState("Loading...");


    const loadData = async () => {
        let userData = await user;
        let followedData = await followed;
        let followersData = await followers;
        let projectProfileDate = await projectProfile;
        let dbPosts = await posts;
        setDataUser(userData);
        setDataFollowed(followedData);
        setDataFollowers(followersData);

        setPseudo(dataUser.pseudo);
        setFirstname(dataUser.firstname);
        setLastname(dataUser.lastname);
        setPassword(dataUser.password);
        setMail(dataUser.email);

        if(!isEmpty(dataFollowers)){
            setFollowersInput(dataFollowers["length"]);
        }

        if(!isEmpty(dataFollowed)){
            setFollowedInput(dataFollowed["length"]);
        }

        setDataProjectProfile(projectProfileDate);

        setDataPosts(dbPosts);
        console.log(dataPosts);
    }

    loadData().then()


    const onSubmit = data => {
        if (data["firstname"] !== dataUser["firstname"]) {
            dispatch(updateUserFirstName(user_id, data));
        }
        if (data["lastname"] !== dataUser["lastname"]) {
            dispatch(updateUserLastName(user_id, data));
        }
        if (data.email !== AuthService.getCurrentUser().email) {
            dispatch(updateUserEmail(user_id, data));
        }
        if (data["pseudo"] !==  dataUser["pseudo"]) {
            dispatch(updateUserPseudo(user_id, data));
        }
        if (data["password"] !== dataUser["password"]) {
            dispatch(updateUserPassword(user_id, data));
        }
        wait(2000).then(() => {
            history.push({
                pathname: "/profil"
            })
        })

    }
    if (isEmpty(dataUser))
        return (<div>User Not Found</div>)
if (user_id === id){

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
                            <input type="text"  {...register("lastname",{ required: "Please enter your last name valid." })} className="input-profile"
                                   value={lastname}/>
                        </div>
                        <div className="social-profile-input">
                            <div className="title-input">Prenom</div>
                            <input type="text"  {...register("firstname", { required: "Please enter your first name valid." })} className="input-profile"
                                   value={firstname}/>
                        </div>
                    </div>
                    <div className="container-profile">
                        <div className="social-profile-input">
                            <div className="title-input">Pseudo</div>
                            <input type="text"  {...register("pseudo", { required: "Please enter your pseudo valid." })} className="input-profile"
                                   value={pseudo}/>
                        </div>
                        <div className="social-profile-input">
                            <div className="title-input">Mot de passe</div>
                            <input type="password"  {...register("password", { required: "Please enter your password valid." })} className="input-profile" value={password}/>
                        </div>
                    </div>
                    <div className="container-profile">
                        <div className="social-profile-input">
                            <div className="title-input">Tel</div>
                            <input type="tel"  {...register("tel", { required: "Please enter your password valid." })} className="input-profile" value={tel}/>
                        </div>
                        <div className="social-profile-input">
                            <div className="title-input">Email</div>
                            <input type="text"  {...register("email", { required: "Please enter your password valid." })} className="input-profile" value={email}/>
                        </div>
                    </div>
                    <button className="button-profile">enregistrer</button>
                </form>
            </div>
        </div>
    );

}else{

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
                            <input type="text" readOnly {...register("lastname",{ required: "Please enter your last name valid." })} className="input-profile"
                                   value={lastname}/>
                        </div>
                        <div className="social-profile-input">
                            <div className="title-input">Prenom</div>
                            <input type="text" readOnly {...register("firstname", { required: "Please enter your first name valid." })} className="input-profile"
                                   value={firstname}/>
                        </div>
                    </div>
                    <div className="container-profile">
                    </div>
                    <div className="container-profile">
                        <div className="social-profile-input">
                            <div className="title-input">Tel</div>
                            <input type="tel"readOnly  {...register("tel", { required: "Please enter your password valid." })} className="input-profile" value={tel}/>
                        </div>
                        <div className="social-profile-input">
                            <div className="title-input">Email</div>
                            <input type="text" readOnly {...register("email", { required: "Please enter your password valid." })} className="input-profile" value={email}/>
                        </div>
                    </div>
                </form>

                <form>
                    <button type={"submit"}> follow this beautiful guys</button>
                </form>
            </div>
            {
                !isEmpty(dataProjectProfile) &&
                dataProjectProfile.map( (item, index) => (
                    <div key={index} className="view--project">
                        <div className="container-project">
                            <div className="post-code">
                            <ProjectView  userPseudo={item.user.pseudo} name={item.name} description={item.description} projectId={item.id} userId={item.user.id}></ProjectView>
                        </div>
                        </div>
                    </div>
                ))

            }
            <div className="view--project">
                <div className="container-project">
                    code :
                </div>
            </div>
            <div className="view--project">
                <div className="container-project">
                    group :
                </div>
            </div>
            {
                !isEmpty(dataPosts) &&
                dataPosts.map(
                    (item, index) => (
                        <div className="view--project" key={index}>
                            <div className="container-project">
                                <PostView postData={item}></PostView>
                            </div>
                        </div>
                    )
                )
            }
        </div>
    )
}

};

export default Profil;
