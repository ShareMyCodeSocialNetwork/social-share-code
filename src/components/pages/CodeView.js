import React, {useState} from 'react';
import CodeMirror from "@uiw/react-codemirror";

const CodeView = ({language= "Python",code= "", userPseudo="" }) => {

    const [codeTest, setCodeTest] =  useState(`${code}`)


    return (
        <div className="component--card-search-code">
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
                <div className="profile-editor">
                    <img className="profile-img" src="/assets/logo/profil.svg" alt="profile" />
                    <div className="title-name-editor">{userPseudo}</div>
                </div>
            </div>
        </div>
    );
};

export default CodeView;