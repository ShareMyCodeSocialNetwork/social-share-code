import React, {useState} from 'react';
import "codemirror/theme/dracula.css"
import {Box, Modal} from "@mui/material";
import {useForm} from "react-hook-form";
import {addGroup} from "../../actions/API/group.action";
import {useDispatch} from "react-redux";



const NewCollectionModal = ({handleCloseModalCollection, openModalCollection, style}) => {

    const dispatch = useDispatch();
    const user_id = localStorage.getItem("user_id");


    const group = useForm();

    const onSubmitGroup = (data) => {
        data["user_id"] = user_id;
        console.log(data);
        dispatch(addGroup(data));
        handleCloseModalCollection();
    }

    return (
        <Modal
        open={openModalCollection}
        onClose={handleCloseModalCollection}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
            <div className="composant-modal">
                <div className="header-modal">
                    <div className="container-title-modal">
                        <div className="title-modal">Create New Collection</div>
                        <div className="line-back"/>
                    </div>
                    <img onClick={()=> handleCloseModalCollection()} className="close-modal" src="/assets/logo/close.svg" alt="close modal"/>
                </div>
                <div className="hr"/>
                <form className="form-container-modal" name="groupForm" onSubmit={group.handleSubmit(onSubmitGroup)}>
                    <div className="container-form-modal">
                        <div className="title-input-modal">Name</div>
                        <input {...group.register("name")} type="text" className="input-modal"/>
                    </div>
                    <div className="container-form-modal">
                        <div className="title-input-modal">Description</div>
                        <input {...group.register("user_id")} type="hidden" name="user_id" />
                        <textarea {...group.register("description")} type="text" className="input-modal textura"/>
                    </div>
                    <button type="submit" className="button-save">Save</button>
                </form>
            </div>
        </Box>
    </Modal>
    );
};

export default NewCollectionModal;