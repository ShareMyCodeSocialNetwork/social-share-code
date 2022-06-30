import React, {useEffect, useState} from 'react';
import CodeMirror from "@uiw/react-codemirror";
import {Box, Modal, TextareaAutosize} from "@mui/material";
import {useForm} from "react-hook-form";
import {isEmpty} from "../utils/Utils";
import {getOneUserById} from "../../actions/API/user.action";
import {useDispatch, useSelector} from "react-redux";
import AuthService from "../Auth/AuthService";

const CardSearchCode = ({language= "Python",code= "",like=0,nameOfcode="",comments=[],view=0, editorName="", handleAddLike}) => {


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
    const [codeTest, setCodeTest] =  useState(`${code}`)
    const { register, handleSubmit,watch } = useForm();
    const [openModalComments, setOpenModalComments] = useState(false);
    const handleOpenModalComments = () => setOpenModalComments(true);
    const handleCloseModalComments = () => setOpenModalComments(false);
    const [tabComment, setTabComment] = useState([{comment:"cc"}]);
    useEffect(() => {
        dispatch(getOneUserById(AuthService.getUserId));
    }, []);
    const user = useSelector(state => state.userReducer);
    const [userData, setUserData] = useState()
    const loadData = async () => {
        let userData = await user;
        setUserData(userData);
    }
    loadData().then()
    const onSubmit = (data) => {
        console.log(data);
        const array = [...tabComment]
        array.push({comment: data.comment});
        setTabComment(array)
    }

    const handleCopyLink = () => {

    }
    const handleClickEditor = () => {

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
                                <div className="title-code-modal">{nameOfcode}</div>
                                <div className="name-creator">{editorName}</div>
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
                                <form onSubmit={handleSubmit(onSubmit)} className="comment-form">
                                    <textarea {...register("comment")}  cols="30" rows="10"/>
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
                                                   {/*<div className="title-creator-comment">{value.user.firstName}</div>*/}
                                                   <div className="title-comment">{value.comment}</div>
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
                        {
                            language === "Python" &&
                            <img className="img-language" src="/assets/logo/python.png" alt="python"/>
                        }
                        {
                            language === "Js" &&
                            <img className="img-language" src="/assets/logo/js.png" alt="python"/>
                        }
                        {
                            language === "Java" &&
                            <img className="img-language large" src="/assets/logo/java.png" alt="python"/>
                        }
                        <div className="language-title">{language}</div>
                    </div>
                    <div className="codemirror">
                        <CodeMirror
                            options={{theme : "default", mode: language, readOnly: true, className: "readOnly" }}
                            value={codeTest}
                            height="100%"
                            onChange={(editor, viewUpdate) => {
                                console.log('value:', editor.getValue());
                                setCodeTest(editor.getValue())
                            }}/>
                    </div>
                </div>
                <div className="social-code-search">
                    <div className="profile-editor">
                        <div className="title-name-editor">{nameOfcode}</div>
                    </div>
                    <div className="profile-editor">
                        <img className="profile-img" src="/assets/logo/profil.svg" alt="profile" />
                        <div className="title-name-editor">{editorName}</div>
                    </div>

                    <div className="container-social-code">
                        <div className="social-code">
                            <img className="social-code-img" src="/assets/logo/like.svg" alt="like"/>
                            <div onClick={() => handleAddLike()} className="title-social-code">{like}</div>
                        </div>
                        <div className="social-code" onClick={() => handleOpenModalComments()}>
                            <img className="social-code-img" src="/assets/logo/comments.svg" alt="comments"/>
                            <div  className="title-social-code">{comments.length}</div>
                        </div>
                        <div className="social-code">
                            <img className="social-code-img" src="/assets/logo/view.svg" alt="like"/>
                            <div className="title-social-code">{view}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default CardSearchCode;