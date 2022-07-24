import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import {Box, Modal} from "@mui/material";
import {isEmpty} from "../../components/utils/Utils";
import AuthService from "../../components/Auth/AuthService";
import {API_URL} from "../../actions/global";
const NewSnippets = ({handleCloseModal, openModal, style }) => {
    const searchUser = useForm();
    const [users, setUsers] = useState([]);


    const onSubmit = (data) => {
        fetch(`${API_URL}/user/search/levenshtein/${data.v}`,
            {
                method:'GET',
                headers:{
                    Authorization: "Bearer " + AuthService.getCurrentUser()
                },
                mode:'cors'
            }
        )
            .then(res=>res.json())
            .then(res=>setUsers(res))
            .catch(e=>console.log(e));
    }

    return (
        <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div className="composant-modal">
                    <div className="header-modal">
                        <div className="container-title-modal">
                            <div className="title-modal">Search People</div>
                            <div className="line-back"/>
                        </div>
                        <img onClick={()=> handleCloseModal()} className="close-modal" src="/assets/logo/close.svg" alt="close modal"/>
                    </div>
                    <div className="hr"/>
                    <form className="form-container-modal"  onSubmit={searchUser.handleSubmit(onSubmit)}>
                        <div className="container-form-modal">
                            <input {...searchUser.register("v")} type="text" className="input-modal"/>
                        </div>
                        <button type="submit" className="button-save">Search</button>
                    </form>
                    <div>
                        {
                            isEmpty(users) &&
                            "Not found"
                        }
                        {
                            !isEmpty(users) &&
                            users.map( (item, index) =>(
                                <div key={index}>
                                    <a href={"/profil/" + item.id}>
                                        {item.pseudo}
                                    </a>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </Box>
        </Modal>
    );
};

export default NewSnippets;