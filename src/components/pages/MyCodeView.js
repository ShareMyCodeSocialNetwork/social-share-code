import React, {useState} from 'react';
import CodeMirror from "@uiw/react-codemirror";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {deleteCode} from "../../actions/API/code.action";

const MyCodeView = ({language= "Python",code= "", userPseudo="" , codeId = "", userId}) => {

    const dispatch = useDispatch();

    const [codeTest, setCodeTest] =  useState(`${code.content}`)

    const remove = useForm();

    const submitRemove = () => {
        dispatch(deleteCode(codeId));
        window.location.reload();
    }


    return (
        <div className="component--card-search-code">
            {code.nameCode}
            <br/>
            <br/>
            <div className="container-code">

                <div className="language-code">
                    {
                        language === "Python" &&
                        <img className="img-language" src="/assets/logo/python.png" alt="python"/>
                    }
                    {
                        language === "JavaScript" &&
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
                        options={{theme : "default", mode: language }}
                        value={codeTest}
                        height="100%"
                        onChange={(editor, viewUpdate) => {
                            console.log('value:', editor.getValue());
                            setCodeTest(editor.getValue())
                        }}/>
                </div>
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
                        userId.toString() === localStorage.getItem("user_id").toString() ?
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

export default MyCodeView;