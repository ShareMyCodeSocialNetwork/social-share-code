import React, {useState} from 'react';
import CodeMirror from "@uiw/react-codemirror"
import "codemirror/theme/dracula.css"
import {useForm} from "react-hook-form";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    execute_code_java,
    execute_code_js,
    execute_code_python,
    execute_code_ruby
} from "../actions/API/execode.action";
import AuthService from "../components/Auth/AuthService";
import {addSnippet} from "../actions/API/snippets.action";
import {addCode} from "../actions/API/code.action";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SnippetsCard from "../components/pages/SnippetsCard";


const Code = () => {

    const dispatch = useDispatch();
    const { id } = useParams();
    const [codeTest, setCodeTest] =  useState(``)
    const [nameCode,setCodeName] = useState("Unititled")
    const { register, handleSubmit,watch } = useForm({mode: 'onChange'});
    const [responseCode, setResponseCode] = useState([""])
    const [language,setLanguage] = useState({id:1,name:"python"})
    const languagelist = [{id:1,name:"python"},{id:2,name:"js"},{id:4,name:"ruby"}]
    const excutePython = useSelector((state) => state.execodeReducer)
    const excuteRuby = useSelector((state) => state.execodeReducer)
    const excuteJs = useSelector((state) => state.execodeReducer)
    const user_id = AuthService.getUserId()
    const [anchorElSnippets, setAnchorElSnippets] = useState(null);
    const openSnippets = Boolean(anchorElSnippets);

    const getCodeTest = (codetitle) => {
        const article = { code: codetitle };
        if(language.name === "python"){
            dispatch(execute_code_python(article))
            loadDataPythons()
        }else if(language.name === "js"){
            dispatch(execute_code_js(article))
            loadDataJs()
        }else if(language.name === "ruby"){
            dispatch(execute_code_ruby(article))
            loadDataRuby()
        }else{
            console.error("language is not recognized")
        }
    }
    const onSubmit = (data) => {
        if(data.nameCode !== "Unititled"){
            console.log(reconstructJsonSendApi(data));
            //dispatch(addCode(reconstructJsonSendApi(data)))
        }else{
            alert("Donner un nom a votre code")
        }

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


    const loadDataRuby = async () => {
        const data = await excuteRuby;
        console.log(data)
        responseCode.push(data.response)
    }

    const reconstructJsonSendApi = (data) => {
        data.name = data["nameCode"];
        data.user_id = parseInt(user_id);
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
        }else if(getLanguage === "ruby"){
            setLanguage({id:4,name:"ruby"});
        }else{
            console.error("language is not recognized")
        }
        setResponseCode([""])
    }

    const handleClickSnippets = (event) => {
        setAnchorElSnippets(event.currentTarget);
    };
    const handleAddSnippet = () => {
        console.log('addSnippet')
    }

    const handleCloseSnippets = () => {
        setAnchorElSnippets(null);
    };
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

                        <div id="basic-button"
                             aria-controls={openSnippets ? 'account-menu' : undefined}
                             aria-haspopup="true"
                             aria-expanded={openSnippets ? 'true' : undefined}
                             onClick={handleClickSnippets} className="option-button">
                            <img className="img-option" src="/assets/logo/pin.svg" alt="pin"/>
                            <div className="title-option">Add to snippets</div>
                        </div>
                        <Menu
                            anchorEl={anchorElSnippets}
                            id="account-menu"
                            open={openSnippets}
                            onClose={handleCloseSnippets}
                            onClick={handleCloseSnippets}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    bgcolor: '#131417',
                                    color: '#fff',
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        bgcolor: '#fff',
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem>
                                <SnippetsCard addSnippet={()=> handleAddSnippet()} title={"title snipts"}/>
                            </MenuItem>
                        </Menu>
                        <button className="option-button">
                            <img className="img-option" src="/assets/logo/save.svg" alt="save"/>
                            <div className="title-option">Save</div>
                        </button>
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