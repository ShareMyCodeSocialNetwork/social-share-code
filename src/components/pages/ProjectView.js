import React, {useState} from 'react';
import CodeMirror from "@uiw/react-codemirror";
import {useForm} from "react-hook-form";
import {deleteCode} from "../../actions/API/code.action";
import {useDispatch} from "react-redux";
import {deleteProject} from "../../actions/API/project.action";

const ProjectView = ({name= "",description= "", userPseudo="", projectId = "" , userId = ""}) => {

    const dispatch = useDispatch();

    const remove = useForm();

    const submitRemove = () => {
        dispatch(deleteProject(projectId));
        window.location.reload();
    }

    return (
        <div className="component--card-search-code">
            <a href={"/project/" + projectId}>
            <div className="container-code">
                <div className="language-code">
                    <div className="language-title">{name}</div>
                </div>
                <div className="codemirror">
                    <CodeMirror
                        options={{theme : "default" }}
                        value={description}
                        height="100%"
                        />
                </div>
            </div>
            </a>
            <div className="social-code-search">
                <a href={"/profile/" + userId}>
                <div className="profile-editor">
                    <img className="profile-img" src="/assets/logo/profil.svg" alt="profile" />
                    <div className="title-name-editor">{userPseudo}</div>
                </div>
                </a>
                <form>
                    <button onClick={remove.handleSubmit(submitRemove)} className="button-profile" type="submit">Remove</button>
                </form>
            </div>

        </div>
    );
};

export default ProjectView;