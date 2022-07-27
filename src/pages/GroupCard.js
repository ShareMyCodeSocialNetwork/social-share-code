import React from 'react';
import CodeMirror from "@uiw/react-codemirror";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {deleteGroup} from "../actions/API/group.action";

const GroupCard = ({group}) => {

    const dispatch = useDispatch();


    const remove = useForm();

    const submitRemove = () => {
        dispatch(deleteGroup(group.id));
        window.location.reload();
    }


    return (
        <div className="component--card-search-code">
            <div className="project-code-search" >
                <div className="container-explain">
                    <div  className="language-code-title">
                        {group.name}
                    </div>
                    <div className="subtitle">
                        {group.description}
                    </div>
                </div>
                <a href={"/group/" + group.id} className="button-access">
                    <img src="/assets/logo/view.svg" alt="send"/>
                </a>
            </div>
            <div className="social-code-search">
                <a style={{textDecoration:"none"}} href={"/profil/" + group.owner.id}>
                    <div className="profile-editor">
                        <img className="profile-img" src="/assets/logo/profil.svg" alt="profile" />
                        <div className="title-name-editor">{group.owner.pseudo}</div>
                    </div>
                </a>
                <div className="button-user-code">
                    {
                        group.owner.id.toString() === localStorage.getItem("user_id").toString() ?
                            <form>
                                <div onClick={remove.handleSubmit(submitRemove)} className="button-profile" type="submit">Remove</div>
                            </form>
                            :
                            <span></span>
                    }

                </div>
            </div>
        </div>
    );
};

export default GroupCard;