import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {Box, Modal} from "@mui/material";
import {addPost} from "../../actions/API/post.action";
import {getOneCodeByUserId} from "../../actions/API/code.action";
import AuthService from "../../components/Auth/AuthService";
import {isEmpty} from "../../components/utils/Utils";
import {Link} from "react-router-dom";
const NewPost = ({handleCloseModalPost, openModalPost, style, group_id = 0}) => {

    const dispatch = useDispatch();
    const user_id = localStorage.getItem("user_id");
    const { register, handleSubmit,watch } = useForm();
    const [codelist,setCodelist] = useState([{id:1,name:"test",content:"test content",userId:"userId",language_id:1,project_id:1}])
    const [code,setCode] = useState()


    useEffect(() => {
        dispatch(getOneCodeByUserId(user_id))
    }, [])


    const codeData = useSelector((state) => state.codeReducer)

    const loadDataCode = async () => {
        const data = await codeData;
        setCodelist(data)

    }

    loadDataCode().then()

    const handleChangeCode = () => {
        const getCode = watch("code");
        setCode(getCode)
    }

    const onSubmitPost = (data) => {
        data.user_id = user_id;
        console.log(data);
        dispatch(addPost(data));
        window.location.replace("/profil/" + localStorage.getItem("user_id"));
    }

    return (
        <Modal
            open={openModalPost}
            onClose={handleCloseModalPost}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div className="composant-modal">
                    <div className="header-modal">
                        <div className="container-title-modal">
                            <div className="title-modal">Create New Post</div>
                            <div className="line-back"/>
                        </div>
                        <img src="/assets/logo/close.svg" onClick={()=> handleCloseModalPost()} className="close-modal" alt="close modal"/>
                    </div>
                    <div className="hr"/>
                    <form className="form-container-modal" name="projectForm" onSubmit={handleSubmit(onSubmitPost)}>
                        <div className="container-form-modal">
                            <div className="title-input-modal" >Post content</div>
                            <input {...register("content")} type="text" name="content" className="input-modal"/>
                        </div>
                        <div className="container-form-modal">
                            <div className="title-input-modal">Choix du Code</div>
                            {
                                !isEmpty(codelist) &&
                                <select onClick={handleChangeCode}
                                        name="code_id" {...register("code_id", {required: true})}>
                                    <option value={0}>Without code</option>
                                    {
                                        codelist.map((codeitem, index) =>
                                            <option value={codeitem.id} key={index}>{codeitem.nameCode}</option>
                                        )
                                    }
                                </select>
                            }
                            {
                                isEmpty(codelist) &&
                                <div className="title-input-modal empty">Aucun code pour le moment aller en crée sur <Link to="/code/new" style={{textDecoration:'none', color:'#248C45', cursor: 'pointer'}}> new code</Link> </div>
                            }
                        </div>
                        <button type="submit" className="button-save">Save</button>
                    </form>
                </div>
            </Box>
        </Modal>
    );
};

export default NewPost;