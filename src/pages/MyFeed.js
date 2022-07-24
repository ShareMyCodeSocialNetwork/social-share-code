import React, {useEffect, useState} from 'react';
import {isEmpty} from "../components/utils/Utils";
import {getFullPostFollowedUserByFollowerUser} from "../actions/API/post.action";
import {useDispatch, useSelector} from "react-redux";
import PostView from "./PostView";
import AuthService from "../components/Auth/AuthService";

const MyFeed = () => {
    AuthService.isAuth();
    const dispatch = useDispatch();
    const user_id = localStorage.getItem("user_id");


    useEffect(() => {
        dispatch(getFullPostFollowedUserByFollowerUser(user_id));
    }, []);

    const posts = useSelector((state) => state.postReducer);
    const [arrayPost, setArrayPost] = useState([]);

    const loadPost = async () => {
        let dbPosts = await posts;
        setArrayPost(dbPosts);
        console.log(arrayPost);
    }
    loadPost().then()

    return (
        <div className="view--project">
            <div className="container-project">
                {
                    !isEmpty(arrayPost) &&
                    arrayPost.map((value, index) =>
                        <div className="post-code" key={index}>
                            <PostView  postData={value}></PostView>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default MyFeed;