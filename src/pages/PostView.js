import React, {useEffect, useState} from 'react';
import CodeMirror from "@uiw/react-codemirror";
import {Box, Modal, TextareaAutosize} from "@mui/material";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {isEmpty} from "../components/utils/Utils";

const PostView = ({postData}) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 838,
        bgcolor: '#2c303a',
        borderRadius:5,
        border: '2px solid transparent',
        boxShadow: 24,
        p: 4,
    };
    const dispatch = useDispatch();
    const commentForm = useForm();

    const [openModalComments, setOpenModalComments] = useState(false);
    const handleOpenModalComments = () => setOpenModalComments(true);
    const handleCloseModalComments = () => setOpenModalComments(false);
    const [tabComment, setTabComment] = useState([]);

    /*useEffect(() => {
        //get all comments by post id
        // get all likes by post Id
    }, []);

    const user = useSelector(state => state.userReducer);
    const [userData, setUserData] = useState()

    const loadData = async () => {
        let userData = await user;
        setUserData(userData);
    }
    loadData().then()
*/
    const onSubmit = (data) => {
        console.log(data);
        const array = [...tabComment]
        array.push({content: data.content});
        setTabComment(array)
    }

    const handleCopyLink = () => {

    }
    const handleClickEditor = () => {

    }

    const handleAddLike = () => {

    }

    return (
        <>
            <Modal
                open={openModalComments}
                onClose={handleCloseModalComments}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="composant-modal-comments">
                        <div className="header-modal-comments">
                            <div className="left-part-header-comments">
                                <div className="title-code-modal">Title will be remove</div>
                                <div className="name-creator">{postData.user.id}</div>
                            </div>
                            <div className="right-part-header-comments">
                                <div className="logo">
                                    <img src="/assets/logo/like.svg" alt="like"/>
                                </div>
                                <div className="logo">
                                    <div onClick={() => handleClickEditor()} className="button-header">View Editor</div>
                                </div>
                            </div>
                        </div>
                        <div className="body-modal-comments">
                            <div className="left-part-body-comments">
                                <form onSubmit={commentForm.handleSubmit(onSubmit)} className="comment-form">
                                    <textarea {...commentForm.register("content")}  cols="30" rows="10"/>{/*todo change it to content */}
                                    <button  className="button-comments">Comment</button>
                                </form>
                                <div className="response-comments">
                                    <div className="title-comment">
                                        <div className="number-comments">{tabComment.length}</div>
                                        <div className="title-response-comment">COMMENTS</div>
                                    </div>
                                    <div className="response">
                                        {
                                            !isEmpty(tabComment) &&
                                            tabComment.map((value,index) => (
                                                <div key={index} className="card-response-comments">
                                                    {<div className="title-creator-comment">{value.user.pseudo}</div>}
                                                    <div className="title-comment">{value.content}</div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="right-part-body-comments">
                                <div className="header-right-part">
                                    <div className="share-social-code">
                                        <div className="title">SHARE</div>
                                        <div className="logo-share">
                                            <img src="/assets/logo/twitter.svg" alt="twiter" />
                                        </div>
                                        <div className="logo-share">
                                            <div onClick={() => handleCopyLink} className="title-logo">Copy link</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="title-date">
                                    <div className="title-date-code">Created On</div>
                                    <div className="subtitle-date-code">22/05/1996</div>
                                </div>
                                <div className="title-date">
                                    <div className="title-date-code">Update On</div>
                                    <div className="subtitle-date-code">22/05/1999</div>
                                </div>
                                <div className="information-comment">
                                    <img src="/assets/logo/like.svg" alt="like"/>
                                    <div className="number-logo">1000000</div>
                                    <div className="subtitle-information">Loves</div>
                                </div>
                                <div className="information-comment">
                                    <img src="/assets/logo/view.svg" alt="view"/>
                                    <div className="number-logo">1000000</div>
                                    <div className="subtitle-information">Comments</div>
                                </div>

                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
            <div className="component--card-search-code">
                <div className="container-code">
                    <div className="language-code">
                    </div>
                    <div className="codemirror">
                        <CodeMirror
                            options={{theme : "default", readOnly: true, className: "readOnly" }}
                            value={postData.content}
                            height="100%"/>
                    </div>
                </div>
                <div className="social-code-search">
                    <div className="profile-editor">
                        <div className="title-name-editor">Code name will be remove</div>
                    </div>
                    <div className="profile-editor">
                        <img className="profile-img" src="/assets/logo/profil.svg" alt="profile" />
                        <div className="title-name-editor">Code creator, will be remove</div>
                    </div>

                    <div className="container-social-code">
                        <div className="social-code">
                            <img className="social-code-img" src="/assets/logo/like.svg" alt="like"/>
                            <div onClick={() => handleAddLike()} className="title-social-code">Like </div>
                        </div>
                        <div className="social-code" onClick={() => handleOpenModalComments()}>
                            <img className="social-code-img" src="/assets/logo/comments.svg" alt="comments"/>
                            <div  className="title-social-code">{"comments.length"}</div>
                        </div>
                        <div className="social-code">
                            <img className="social-code-img" src="/assets/logo/view.svg" alt="like"/>
                            <div className="title-social-code">{"view will be remove or add in api"}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default PostView;