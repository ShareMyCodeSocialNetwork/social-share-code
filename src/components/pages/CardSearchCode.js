import React, {useState} from 'react';
import CodeMirror from "@uiw/react-codemirror";

const CardSearchCode = ({language= "Python",code= "",like=0,comments=[],view=0, editorName="" }) => {

    const [codeTest, setCodeTest] =  useState(`${code}`)

    const openComments = () => {

    }

    return (
        <div className="component--card-search-code">
            <div className="container-code">
                <div className="language-code">
                    {
                        language === "Python" &&
                        <img className="img-language" src="/assets/logo/python.png" alt="python"/>
                    }
                    {
                        language === "Js" &&
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
                <div className="profile-editor">
                    <img className="profile-img" src="/assets/logo/profil.svg" alt="profile" />
                    <div className="title-name-editor">{editorName}</div>
                </div>
                <div className="container-social-code">
                    <div className="social-code">
                        <img className="social-code-img" src="/assets/logo/like.svg" alt="like"/>
                        <div className="title-social-code">{like}</div>
                    </div>
                    <div className="social-code">
                        <img className="social-code-img" src="/assets/logo/comments.svg" alt="comments"/>
                        <div onClick={() => openComments()} className="title-social-code">{comments.length}</div>
                    </div>
                    <div className="social-code">
                        <img className="social-code-img" src="/assets/logo/view.svg" alt="like"/>
                        <div className="title-social-code">{view}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardSearchCode;