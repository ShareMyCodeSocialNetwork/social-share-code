import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {filter_array, isEmpty} from "../components/utils/Utils";
import {getPosts} from "../actions/API/post.action";
import {useDispatch, useSelector} from "react-redux";
import PostView from "./PostView";
import AuthService from "../components/Auth/AuthService";

const SearchView = () => {
    AuthService.isAuth();
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