import React from 'react';
import CodeMirror from "@uiw/react-codemirror"
import "codemirror/theme/dracula.css"
import axios from "axios";
import {useForm} from "react-hook-form";
import {getValue} from "@testing-library/user-event/dist/utils";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    execute_code_java,
    execute_code_js,
    execute_code_python,
    execute_code_ruby
} from "../actions/API/execode.action";
import execodeReducer from "../reducers/API/execode.reducer";
import {addCode} from "../actions/API/code.action";
import AuthService from "../components/Auth/AuthService";
import {addSnippet} from "../actions/API/snippets.action";


const Code = () => {

    const dispatch = useDispatch();
    const { id } = useParams();
    const [codeTest, setCodeTest] =  useState(``)
    const [nameCode,setCodeName] = useState("Unititled")
    const { register, handleSubmit,watch } = useForm({mode: 'onChange'});
    const [responseCode, setResponseCode] = useState([""])
    const [language,setLanguage] = useState({id:1,name:"python"})
    const languagelist = [{id:1,name:"python"},{id:2,name:"js"},{id:3,name:"java"},{id:4,name:"ruby"}]
    const excutePython = useSelector((state) => state.execodeReducer)
    const excuteJava = useSelector((state) => state.execodeReducer)
    const excuteRuby = useSelector((state) => state.execodeReducer)
    const excuteJs = useSelector((state) => state.execodeReducer)
    const user_id = AuthService.getUserId()

    const getCodeTest = (codetitle) => {
        const article = { code: codetitle };
        if(language.name === "python"){
            dispatch(execute_code_python(article))
            loadDataPythons()
        }else if(language.name === "js"){
            dispatch(execute_code_js(article))
            loadDataJs()
        }else if (language.name === "java"){
            dispatch(execute_code_java(article))
            loadDataJava()
        }else if(language.name === "ruby"){
            dispatch(execute_code_ruby(article))
            loadDataRuby()
        }else{
            console.error("language is not recognized")
        }
    }
    const onSubmit = (data) => {
        console.log(reconstructJsonSendApi(data));
        //dispatch(addCode(reconstructJsonSendApi(data)))
    }

    const loadDataPythons = async () => {
        const data = await excutePython;
        console.log(data)
        responseCode.push(data.response)
    }

    const loadDataJs = async () => {
        const data = await excuteJs;
        console.log(data)
        responseCode.push(data.response)
    }

    const loadDataJava = async () => {
        const data = await excuteJava;
        console.log(data)
        responseCode.push(data.response)
    }

    const loadDataRuby = async () => {
        const data = await excuteRuby;
        console.log(data)
        responseCode.push(data.response)
    }

    const reconstructJsonSendApi = (data) => {
        data.name = data["nameCode"];
        data.user_id = user_id
        data.content = codeTest
        data.language_id = language.id
        return data
    }

    const handleChangeLanguage = () => {
        const getLanguage = watch("language");
        if(getLanguage === "python"){
            setLanguage({id:1,name:"python"});
        }else if(getLanguage === "js"){
            setLanguage({id:2,name:"js"});
        }else if (getLanguage === "java"){
            setLanguage({id:3,name:"java"});
        }else if(getLanguage === "ruby"){
            setLanguage({id:4,name:"ruby"});
        }else{
            console.error("language is not recognized")
        }
        setResponseCode([""])
    }


    const addSnippetToCompte = () => {
        //TODO call add snipets
        dispatch(addSnippet())
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
                        <div className="option-button" onClick={()=> addSnippetToCompte}>
                            <img className="img-option" src="/assets/logo/pin.svg" alt="save"/>
                            <div className="title-option">Add to snippets</div>
                        </div>
                        <button className="option-button">
                            <img className="img-option" src="/assets/logo/save.svg" alt="save"/>
                            <div className="title-option">Save</div>
                        </button>

                        {
                            /*
                            *   <div className="y">
                                    <img className="img-option" src="/assets/logo/setting.svg" alt="settings"/>
                                    <div className="title-option">Settings</div>
                                </div>
                            */
                        }
                    </div>
                </div>
                <div className="body-code">
                    <div  className="code-writer">
                        <div className="choice-langage">
                            {
                                language.name === "python" &&
                                <img className="img-langage" src="/assets/logo/python.png" alt="python"/>
                            }
                            {
                                language.name === "js" &&
                                <img className="img-langage" src="/assets/logo/js.png" alt="js"/>
                            }
                            {
                                language.name === "java" &&
                                <img className="img-langage large" src="/assets/logo/java.png" alt="java"/>
                            }
                            {
                                language.name === "ruby" &&
                                <img className="img-langage large" src="/assets/logo/ruby.png" alt="ruby"/>
                            }
                            <select onClick={handleChangeLanguage}
                                    name="language" {...register("language", {required: true})}>
                                {
                                    languagelist.map((language, index) =>
                                        <option key={index}>{language.name}</option>
                                    )
                                }
                            </select>
                        </div>
                        <div className="codemirror">
                            <CodeMirror
                                options={{theme : "dracula", mode: language.name }}
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