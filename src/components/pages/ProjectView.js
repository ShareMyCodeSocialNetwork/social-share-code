import React from 'react';
import CodeMirror from "@uiw/react-codemirror";
import {useForm} from "react-hook-form";
import {deleteProject} from "../../actions/API/project.action";
import {useDispatch} from "react-redux";
import {isEmpty} from "../utils/Utils";

const ProjectView = ({name= "",description= "", userPseudo="", projectId = "" , userId = ""}) => {
    const dispatch = useDispatch();
    const remove = useForm();

    const submitRemove = (projectId) => {
        dispatch(deleteProject(projectId));
        window.location.reload();
    }

    return (
        <div className="component--card-search-code">
            <div className="project-code-search" >
                <div className="container-explain">
                    <div  className="language-code-title">
                        {name}
                    </div>
                    <div className="subtitle">
                        {description}
                    </div>
                </div>
                <a href={"/project/" + projectId} className="button-access">
                    <img src="/assets/logo/view.svg" alt="send"/>
                </a>
            </div>
            <div className="social-code-search">
                <a style={{textDecoration:"none"}} href={"/profil/" + userId}>
                <div className="profile-editor">
                    <img className="profile-img" src="/assets/logo/profil.svg" alt="profile" />
                    <div className="title-name-editor">{userPseudo}</div>
                </div>
                </a>
                <div className="button-user-code">
                    {
                        !isEmpty(userId) &&
                        userId.toString() === localStorage.getItem("user_id").toString() ?
                            <form>
                                <div  onClick={remove.handleSubmit(submitRemove)}  className="button-profile" type="submit">Remove</div>
                            </form>
                            :
                            <div></div>
                    }
                </div>

            </div>

        </div>
    );
};

export default ProjectView;