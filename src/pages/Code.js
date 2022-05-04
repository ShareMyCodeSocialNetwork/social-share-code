import React from 'react';
import CodeMirror from "@uiw/react-codemirror"
import "codemirror/theme/dracula.css"
import {useEffect, useState} from "react"
import axios from "axios";
import {useForm} from "react-hook-form";
import {getValue} from "@testing-library/user-event/dist/utils";


const Code = () => {

    const [codeTest, setCodeTest] =  useState(``)
    const [nameCode,setCodeName] = useState("Unititled")
    const [langage,setLangage] = useState("python")
    const { register, handleSubmit,watch , getValues} = useForm();
    const [responseCode, setResponseCode] = useState(["response1","response1","response1","response1","response1"])
    const getCodeTest = (codetitle) => {
        const article = { code: codetitle };
        axios.post('http://localhost:3001/excution/python', article)
            .then(response => responseCode.push(response.data.response));
    }
    const onSubmit = (data) => {
        console.log(data);
    }

    const handleChangeLangage = () => {
        let langageChange = watch("langage");
        console.log(langageChange)
        setLangage(langageChange)
    }

    const handleChangeNameCode = () => {
        let nameCodeChange = watch("nameCode");
        console.log(nameCodeChange)
        setCodeName(nameCodeChange)
    }

    return (
        <div className="view--code">
            <form onSubmit={handleSubmit(onSubmit)} action="">
                <div className="header-code">
                    <div className="left-part-header-code">
                        <img src="/assets/logo/lamp.svg" alt="lamp" className="logo-header"/>
                        <input defaultValue={nameCode} onChange={handleChangeNameCode}  {...register("nameCode")} className="title-header-code" placeholder="Unititled"/>
                        <img src="/assets/logo/pen.svg" alt="lamp" className="logo-header extp"/>
                    </div>
                    <div className="right-part-header">
                        <button className="option-button">
                            <img className="img-option" src="/assets/logo/save.svg" alt="save"/>
                            <div className="title-option">Save</div>
                        </button>
                        <div className="option-button">
                            <img className="img-option" src="/assets/logo/setting.svg" alt="settings"/>
                            <div className="title-option">Settings</div>
                        </div>
                    </div>
                </div>
                <div className="body-code">
                    <div  className="code-writer">
                        <div className="choice-langage">
                            {
                                langage === "python" &&
                                <img className="img-langage" src="/assets/logo/python.png" alt="python"/>
                            }
                            {
                                langage === "js" &&
                                <img className="img-langage" src="/assets/logo/js.png" alt="python"/>
                            }
                            {
                                langage === "java" &&
                                <img className="img-langage large" src="/assets/logo/java.png" alt="python"/>
                            }
                            <select className="select-langage" onClick={handleChangeLangage} {...register("langage")}>
                                <option value="python">python</option>
                                <option value="js">js</option>
                                <option value="java">java</option>
                            </select>
                        </div>
                        <div className="codemirror">
                            <CodeMirror
                                options={{theme : "dracula", mode: langage }}
                                value=""
                                height="100%"
                                onChange={(editor, viewUpdate) => {
                                    console.log('value:', editor.getValue());
                                    setCodeTest(editor.getValue())
                                }}/>
                            <div className="button-send-code" onClick={()=> getCodeTest(codeTest)}>Executer</div>
                        </div>
                    </div>
                    <div className="code-console">
                        <div className="title">Console</div>
                        <div className="container-response">
                            {
                                responseCode.map((value, index) =>
                                    <div key={index} className="title-response">{value}</div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Code;