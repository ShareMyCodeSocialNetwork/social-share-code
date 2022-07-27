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
import {
    addFollower,
    deleteFollower,
    getFullFollow
} from "../actions/API/follower.action";
import {getProjectByOwner} from "../actions/API/project.action";
import ProjectView from "../components/pages/ProjectView";
import {getFullPostByUser} from "../actions/API/post.action";
import PostView from "./PostView";
import {getCodeByUser} from "../actions/API/code.action";
import MyCodeView from "../components/pages/MyCodeView";
import GroupCard from "./GroupCard";
import {getGroupsByOwner} from "../actions/API/group.action";

const Profil = () => {
    AuthService.isAuth();
    const {id} = useParams();
    const dispatch = useDispatch();
    const user_id = localStorage.getItem("user_id");

    const {register, handleSubmit, watch, formState: {errors}} = useForm({ shouldUseNativeValidation: true });
    const [firstname, setFirstname] = useState("Loading...");
    const [lastname, setLastname] = useState("Loading...");
    const [pseudo, setPseudo] = useState("Loading...");
    const [password, setPassword] = useState("Loading...");
    //const [tel, setTel] = useState("Loading...");
    const [email, setEmail] = useState("Loading...");
    const followForm = useForm();
    const unfollowForm = useForm();

    useEffect(() => {
        dispatch(getOneUserById(id));
    }, []);
    const user = useSelector(state => state.userReducer);
    const [dataUser,setDataUser] = useState();
    const loadDataUser = async () => {
        let dbUser = await user;
        setDataUser(dbUser);
    }
    loadDataUser().then()

    useEffect( () => {
        dispatch(getFullPostByUser(id));
    },[])
    const posts = useSelector((state) => state.postReducer);
    const [dataPosts, setDataPosts] = useState([]);
    const loadDataPost = async () => {
        let dbPosts = await posts;
        setDataPosts(dbPosts);
    }
    loadDataPost().then()


    useEffect( () => {
        dispatch(getProjectByOwner(id));
    },[])
    const projectProfile = useSelector( (state) => state.projectReducer);
    const [dataProjectProfile, setDataProjectProfile] = useState([]);
    const loadDataProject = async () => {
        let projectProfileData = await projectProfile;
        setDataProjectProfile(projectProfileData);
    }
    loadDataProject().then()


    useEffect( () => {
        dispatch(getCodeByUser(id));
    },[]);
    const codeProfile = useSelector( (state) => state.codeReducer);
    const [dataCodeProfile, setDataCodeProfile] = useState([]);
    const loadDataCode = async () => {
        let dbCodes = await codeProfile;
        setDataCodeProfile(dbCodes);
    }
    loadDataCode().then()


    useEffect(() => {
        dispatch(getGroupsByOwner(id));
    }, []);
    const groupProfile = useSelector( (state) => state.groupReducer);
    const [dataGroupProfile, setDataGroupProfile] = useState([]);
    const loadDataGroup = async () => {
        let dbGroup = await groupProfile;
        setDataGroupProfile(dbGroup);
    }
    loadDataGroup().then()


    useEffect(() => {
        dispatch(getFullFollow(id,user_id))
    }, []);
    const follow = useSelector( (state) => state.followerReducer)
    const [dataFollow, setDataFollow] = useState();
    const loadDataFollow = async () => {
        let dbFollow = await follow;
        setDataFollow(dbFollow);
        console.log(dataFollow);
    }
    loadDataFollow().then()

    const handleChangeLastnameInput = event => {
        setLastname(event.target.value);
    };
    const handleChangeFirstnameInput = event => {
        setFirstname(event.target.value);
    };
    const handleChangePseudoInput = event => {
        setPseudo(event.target.value);
    };
    const handleChangeEmailInput = event => {
        setEmail(event.target.value);
    };
    const handleChangePasswordInput = event => {
        setPassword(event.target.value);
    };

    const onSubmit = data => {
        console.log(data);
        if (data["firstname"] !== dataUser["firstname"] && data.firstname !== '') {
            dispatch(updateUserFirstName(user_id, data));
        }
        if (data["lastname"] !== dataUser["lastname"] && data["lastname"] !== '') {
            dispatch(updateUserLastName(user_id, data));
        }
        if (data.email !== AuthService.getCurrentUser().email && data["email"] !== '') {
            dispatch(updateUserEmail(user_id, data));
        }
        if (data["pseudo"] !==  dataUser["pseudo"] && data["pseudo"] !== '') {
            dispatch(updateUserPseudo(user_id, data));
        }
        if (data["password"] !== dataUser["password"] && data["password"] !== '') {
            dispatch(updateUserPassword(user_id, data));
        }
        wait(500).then(() => {
            window.location.reload();
        })

    }

    const onFollowSubmit = (data) => {
        data.followedUserId = id;
        data.followerUserId = user_id;
        dispatch(addFollower(data));
        wait(500).then(()=>window.location.reload());
    }
    const onUnfollowSubmit = () => {
        dispatch(deleteFollower(dataFollow.isFollow.id));
        wait(500).then(()=>window.location.reload());
    }

    if (isEmpty(dataUser))
        return (<div>User Not Found</div>)
if (user_id === id){

    return (
        <div className="view--profile">
            <div className="header-profile">
                <img className="overlay-profile" src="" alt=""/>
                <div className="profile-data">
                    <div className="title-name">{!isEmpty(dataUser) && dataUser.pseudo}</div>
                    <div className="image-profile">
                        <img src="/assets/logo/profil_header.png" alt="profile"/>
                    </div>
                </div>
            </div>
            <div className="body-profile">
                <div className="social-profile">
                    <div className="social-follow margin">
                        <div className="number-social-follow">{!isEmpty(dataFollow) && !isEmpty(dataFollow.followers) && dataFollow.followers.length}</div>
                        <div className="title-social-follow">followers</div>
                    </div>
                    <div className="social-follow">
                        <div className="number-social-follow">{!isEmpty(dataFollow) && !isEmpty(dataFollow.followed) && dataFollow.followed.length}</div>
                        <div className="title-social-follow">following</div>
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="form-profile">
                    <div className="container-profile">
                        <div className="social-profile-input">
                            <div className="title-input">Nom</div>
                            <input type="text"  {...register("lastname")}
                                   className="input-profile"
                                   name="lastname" id="lastname"
                                   defaultValue={!isEmpty(dataUser) && dataUser.lastname}
                                   onChange={handleChangeLastnameInput}

                            />
                        </div>
                        <div className="social-profile-input">
                            <div className="title-input">Prenom</div>
                            <input type="text"  {...register("firstname")} className="input-profile"
                                   defaultValue={!isEmpty(dataUser) && dataUser.firstname}
                                   name="firstname" id="firstname"
                                   onChange={handleChangeFirstnameInput}
                            />
                        </div>
                    </div>
                    <div className="container-profile">
                        <div className="social-profile-input">
                            <div className="title-input">Pseudo</div>
                            <input type="text"  {...register("pseudo")} className="input-profile"
                                   defaultValue={!isEmpty(dataUser) && dataUser.pseudo}
                                   name="pseudo" id="pseudo"
                                   onChange={handleChangePseudoInput}
                            />
                        </div>
                        <div className="social-profile-input">
                            <div className="title-input">Mot de passe</div>
                            <input type="password"  {...register("password")} className="input-profile"
                                   defaultValue={!isEmpty(dataUser) && dataUser.password}
                                   name="password" id="password"
                                   onChange={handleChangePasswordInput}
                            />
                        </div>
                    </div>
                    <div className="container-profile">
                        <div className="social-profile-input">
                            {/*
                            <div className="title-input">Tel</div>
                            <input type="tel"  {...register("tel")} className="input-profile" defaultValue={tel}/>
                            */}
                        </div>
                        <div className="social-profile-input">
                            <div className="title-input">Email</div>
                            <input type="text"
                                   {...register("email")}
                                   className="input-profile"
                                   defaultValue={!isEmpty(dataUser) && dataUser.email}
                                   name="email" id="email"
                                   onChange={handleChangeEmailInput}
                            />
                        </div>
                    </div>
                    <button className="button-profile">Save</button>
                </form>
                <div className="view--project">
                    Yours posts :
                    <br/>
                    <br/>
                    <div className="container-project">
                        {
                            !isEmpty(dataPosts) &&
                            dataPosts.map(
                                (item, index) => (
                                    <div key={index} className="post-code">
                                        <PostView  postData={item}></PostView>
                                    </div>
                                )
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
    {/** Your profile on the top **/}
}else{
    {/** Other profile on the bottom **/}
    return (
        <div className="view--profile">
            <div className="header-profile">
                <img className="overlay-profile" src="" alt=""/>
                <div className="profile-data">
                    <div className="title-name">{!isEmpty(dataUser) && dataUser.pseudo}</div>
                    <div className="image-profile">
                        <img src="/assets/logo/profil_header.png" alt="profile"/>
                    </div>
                </div>
            </div>
            <div className="body-profile">
                <div className="social-profile">
                    <div className="social-follow margin">
                        <div className="number-social-follow">{!isEmpty(dataFollow) && !isEmpty(dataFollow.followers) && dataFollow.followers.length}</div>
                        <div className="title-social-follow">followers</div>
                    </div>
                    <div className="social-follow">
                        <div className="number-social-follow">{!isEmpty(dataFollow) && !isEmpty(dataFollow.followed) && dataFollow.followed.length}</div>
                        <div className="title-social-follow">following</div>
                    </div>
                </div>
                <form className="form-profile">
                    <div className="container-profile">
                        <div className="social-profile-input">
                            <div className="title-input">Lastname</div>
                            <input type="text" readOnly className="input-profile"
                                   value={!isEmpty(dataUser) && dataUser.lastname}/>
                        </div>
                        <div className="social-profile-input">
                            <div className="title-input">Firstname</div>
                            <input type="text" readOnly className="input-profile"
                                   value={!isEmpty(dataUser) && dataUser.firstname}/>
                        </div>
                    </div>
                    <div className="container-profile">
                    </div>
                    <div className="container-profile">
                        <div className="social-profile-input">
                            {/*
                            <div className="title-input">Phone</div>
                            <input type="tel"readOnly  {...register("tel", { required: "Please enter your password valid." })} className="input-profile" value={tel}/>
                            */}
                        </div>
                        <div className="social-profile-input">
                            <div className="title-input">Email</div>
                            <input type="text" readOnly className="input-profile" value={!isEmpty(dataUser) && dataUser.email}/>
                        </div>
                    </div>
                </form>

                {
                    !isEmpty(dataFollow) && isEmpty(dataFollow.isFollow) && dataFollow.isFollow === null &&
                    <form onSubmit={followForm.handleSubmit(onFollowSubmit)}>
                        <button type="submit">Follow</button>
                    </form>
                }
                {
                    !isEmpty(dataFollow) && !isEmpty(dataFollow.isFollow) &&
                    <form onSubmit={unfollowForm.handleSubmit(onUnfollowSubmit)}>
                        <input {...unfollowForm.register("id")} type="hidden" value={!isEmpty(dataFollow) && !isEmpty(dataFollow.isFollow) && dataFollow.isFollow.id}/>
                        <button type="submit">Unfollow</button>
                    </form>
                }

            </div>

            <div  className="view--project">
                {
                    !isEmpty(dataUser) &&
                    dataUser.pseudo + " projects : "
                }
                <br/>
                <br/>
                <div className="container-project">
                    {
                        !isEmpty(dataProjectProfile) &&
                        dataProjectProfile.map(
                            (item, index) => (
                                <div key={index} className="post-code">
                                    <ProjectView  key={index} userPseudo={item.user.pseudo} name={item.name} description={item.description} projectId={item.id} userId={item.user.id}></ProjectView>
                                </div>
                            )
                        )
                    }
                </div>
            </div>

            <div className="view--project">
                {
                    !isEmpty(dataUser) &&
                    dataUser.pseudo + " codes : "
                }
                <br/>
                <br/>
                <div className="container-project">
                    {
                        !isEmpty(dataCodeProfile) &&
                        dataCodeProfile.map( (item, index) =>(
                            <div key={index} className="post-code">
                                <MyCodeView language={isEmpty(item.language) ? "removed language" : item.language.name} userId={item.user.id} userPseudo={item.user.pseudo} codeId={item.id} code={item.content}></MyCodeView>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className="view--project">
                {
                    !isEmpty(dataUser) &&
                    dataUser.pseudo + " groups : "
                }
                <br/>
                <br/>
                <div className="container-project">
                    {
                        !isEmpty(dataGroupProfile) &&
                        dataGroupProfile.map( (item, index) =>(
                            <div key={index} className="post-code">
                                <GroupCard group={item}></GroupCard>
                            </div>
                        ))
                    }
                </div>
            </div>


            <div className="view--project">
                {
                    !isEmpty(dataUser) &&
                    dataUser.pseudo + " posts : "
                }
                <br/>
                <br/>
                <div className="container-project">
                    {
                        !isEmpty(dataPosts) &&
                        dataPosts.map(
                            (item, index) => (
                                <div key={index} className="post-code">
                                    <PostView  postData={item}></PostView>
                                </div>
                            )
                        )
                    }
                </div>
            </div>
        </div>
    )
}

};

export default Profil;
