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
import {getCodeByUser} from "../actions/API/code.action";
import MyCodeView from "../components/pages/MyCodeView";
import GroupCard from "./GroupCard";
import {getGroupsByOwner} from "../actions/API/group.action";

const Profil = () => {
    AuthService.isAuth();
    const {id} = useParams();


    const dispatch = useDispatch();
    const history = useHistory();



    const user_id = localStorage.getItem("user_id");
    useEffect(() => {
        dispatch(getOneUserById(id));
        dispatch(getFollowed(id));
        dispatch(getFollowers(id));
        dispatch(getProjectByOwner(id));
        dispatch(getPostByUserId(id));
        dispatch(getCodeByUser(id))
        dispatch(getGroupsByOwner(id))
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

    const codeProfile = useSelector( (state) => state.codeReducer);
    const [dataCodeProfile, setDataCodeProfile] = useState([]);

    const groupProfile = useSelector( (state) => state.groupReducer);
    const [dataGroupProfile, setDataGroupProfile] = useState([]);

    const {register, handleSubmit, watch, formState: {errors}} = useForm({ shouldUseNativeValidation: true });

    const [followersInput, setFollowersInput] = useState(0);
    const [followedInput, setFollowedInput] = useState(0);

    const [firstname, setFirstname] = useState("Loading...");
    const [lastname, setLastname] = useState("Loading...");
    const [pseudo, setPseudo] = useState("Loading...");
    const [password, setPassword] = useState("Loading...");
    //const [tel, setTel] = useState("Loading...");
    const [email, setMail] = useState("Loading...");


    const loadData = async () => {
        let dbUser = await user;
        let followedData = await followed;
        let followersData = await followers;
        let projectProfileDate = await projectProfile;
        let dbPosts = await posts;
        let dbCodes = await codeProfile;
        let dbGroup = await groupProfile;

        setDataUser(dbUser);
        setDataFollowed(followedData);
        setDataFollowers(followersData);
        setDataCodeProfile(dbCodes);
        setDataPosts(dbPosts);
        setDataProjectProfile(projectProfileDate);
        setDataGroupProfile(dbGroup);

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
    }

    loadData().then()

    const handleChangeLastnameInput = event => {
        setLastname(event.target.value);
    };
    const handleChangeFirstnameInput = event => {
        setFirstname(event.target.value);
    };
    const handleChangePseudoInput = event => {
        setFirstname(event.target.value);
    };
    const handleChangeEmailInput = event => {
        setFirstname(event.target.value);
    };
    const handleChangePasswordInput = event => {
        setFirstname(event.target.value);
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
        wait(2000).then(() => {
            history.push({
                pathname: "/profil/" + user_id
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
                            <input type="text"  {...register("lastname")}
                                   className="input-profile"
                                   name="lastname" id="lastname"
                                   defaultValue={lastname}
                                   onChange={handleChangeLastnameInput}

                            />
                        </div>
                        <div className="social-profile-input">
                            <div className="title-input">Prenom</div>
                            <input type="text"  {...register("firstname")} className="input-profile"
                                   defaultValue={firstname}
                                   name="firstname" id="firstname"
                                   onChange={handleChangeFirstnameInput}
                            />
                        </div>
                    </div>
                    <div className="container-profile">
                        <div className="social-profile-input">
                            <div className="title-input">Pseudo</div>
                            <input type="text"  {...register("pseudo")} className="input-profile"
                                   defaultValue={pseudo}
                                   name="pseudo" id="pseudo"
                                   onChange={handleChangePseudoInput}
                            />
                        </div>
                        <div className="social-profile-input">
                            <div className="title-input">Mot de passe</div>
                            <input type="password"  {...register("password")} className="input-profile"
                                   defaultValue={password}
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
                                   defaultValue={email}
                                   name="email" id="email"
                                   onChange={handleChangeEmailInput}
                            />
                        </div>
                    </div>
                    <button className="button-profile">Save</button>
                </form>
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
                <form className="form-profile">
                    <div className="container-profile">
                        <div className="social-profile-input">
                            <div className="title-input">Lastname</div>
                            <input type="text" readOnly className="input-profile"
                                   value={lastname}/>
                        </div>
                        <div className="social-profile-input">
                            <div className="title-input">Firstname</div>
                            <input type="text" readOnly className="input-profile"
                                   value={firstname}/>
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
                            <input type="text" readOnly className="input-profile" value={email}/>
                        </div>
                    </div>
                </form>

                <form>
                    <button type={"submit"}> follow this beautiful guys</button>
                    {
                        //todo implement it ! show it if get by follower && followed is null && create follow on click
                    }
                </form>

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
