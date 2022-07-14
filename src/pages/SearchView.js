import React, {useEffect, useState} from 'react';
import CardSearchCode from "../components/pages/CardSearchCode";
import {useParams} from "react-router-dom";
import {filter_array, isEmpty} from "../components/utils/Utils";
import {getOneUserById} from "../actions/API/user.action";
import {getByFollowedAndFollower, getFollowed, getFollowers} from "../actions/API/follower.action";
import {getProjectByOwner} from "../actions/API/project.action";
import {getPostByUserId, getPosts} from "../actions/API/post.action";
import {getCodeByUser} from "../actions/API/code.action";
import {getGroupsByOwner} from "../actions/API/group.action";
import {useDispatch, useSelector} from "react-redux";
import postReducer from "../reducers/API/post.reducer";
import PostView from "./PostView";

const SearchView = () => {
    const dispatch = useDispatch();

    const { filters } = useParams();


    useEffect(() => {
        dispatch(getPosts());
    }, []);

    const [arrayPost, setArrayPost] = useState([]);
    const posts = useSelector((state) => state.postReducer);

    const loadPost = async () => {
        let dbPosts = await posts;
        setArrayPost(dbPosts);
        console.log(arrayPost)
    }
    loadPost().then()

    return (
        <div className="view--project">
            <div className="container-project">
                {
                    !isEmpty(arrayPost) && !isEmpty(filters) &&
                        filter_array(filters,arrayPost).map((value, index) =>
                            <div className="post-code" key={index}>
                                <PostView  postData={value}></PostView>
                            </div>
                        )
                }
                {
                    isEmpty(filters) && !isEmpty(arrayPost) &&
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

export default SearchView;