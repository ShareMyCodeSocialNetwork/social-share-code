import React from 'react';
import "codemirror/theme/dracula.css"
import {Box, Modal} from "@mui/material";
import {createProject} from "../../actions/API/project.action";
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";


const NewProjectModal = ({handleCloseModalProject, openModalProject, style}) => {

    const dispatch = useDispatch();
    const user_id = localStorage.getItem("user_id");
    const project = useForm();

    const onSubmitProject = (data) => {
        data["user_id"] = user_id;
        dispatch(createProject(data));
        handleCloseModalProject();
    }

    return (<Modal
            open={openModalProject}
            onClose={handleCloseModalProject}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div className="composant-modal">
                    <div className="header-modal">
                        <div className="container-title-modal">
                            <div className="title-modal">Create New Project</div>
                            <div className="line-back"/>
                        </div>
                        <img src="/assets/logo/close.svg" onClick={()=> handleCloseModalProject()}   className="close-modal" alt="close modal"/>
                    </div>
                    <div className="hr"/>
                    <form className="form-container-modal" name="projectForm" onSubmit={project.handleSubmit(onSubmitProject)}>
                        <div className="container-form-modal">
                            <div className="title-input-modal" >Name</div>
                            <input {...project.register("name")} type="text" name="name" className="input-modal"/>
                        </div>
                        <div className="container-form-modal">
                            <div className="title-input-modal">Description</div>
                            <textarea {...project.register("description")} type="" name="description" className="input-modal textura"/>
                        </div>
                        <input {...project.register("user_id")} type="hidden" name="user_id" />
                        <button type="submit" className="button-save">Save</button>
                    </form>
                </div>
            </Box>
        </Modal>

    );
};

export default NewProjectModal;