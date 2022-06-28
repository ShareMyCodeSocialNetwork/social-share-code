import React, {useState} from 'react';
import CodeMirror from "@uiw/react-codemirror";

const ProjectView = ({name= "",description= "", userPseudo="", projectId = "" }) => {



    return (
        <div className="component--card-search-code">
            <div className="container-code">
                <div className="language-code">
                    <div className="language-title">{name}</div>
                </div>
                <div className="codemirror">
                    {description}
                </div>
            </div>
            <div className="social-code-search">
                <div className="profile-editor">
                    <img className="profile-img" src="/assets/logo/profil.svg" alt="profile" />
                    <div className="title-name-editor">{userPseudo}</div>
                </div>
                <a className="title-name-editor" href={"/project/" + projectId}>Show it</a>
            </div>
        </div>
    );
};

export default ProjectView;