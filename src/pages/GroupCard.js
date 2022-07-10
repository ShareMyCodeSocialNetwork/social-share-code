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
            <div className="container-code">
                <a href={"/group/" + group.id}>
                    <div className="language-code">
                        <div className="language-title">
                        {
                            group.name
                        }
                        </div>
                    </div>
                    <div className="codemirror">
                        <CodeMirror
                            options={{theme : "default"}}
                            value={group.description}
                            height="100%"
                        />
                    </div>
                </a>
            </div>
            <div className="social-code-search">
                <a href={"/profil/" + group.owner.id}>
                    <div className="profile-editor">
                        <img className="profile-img" src="/assets/logo/profil.svg" alt="profile" />
                        <div className="title-name-editor">{group.owner.pseudo}</div>
                    </div>
                </a>
                <div>
                    {
                        group.owner.id.toString() === localStorage.getItem("user_id").toString() ?
                            <form>
                                <button onClick={remove.handleSubmit(submitRemove)} className="button-profile" type="submit">Remove</button>
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