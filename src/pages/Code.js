import React, {useEffect, useState} from 'react';
import CodeMirror from "@uiw/react-codemirror"
import "codemirror/theme/dracula.css"
import {useForm} from "react-hook-form";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    API_URL,
    execute_code_java,
    execute_code_js, EXECUTE_CODE_PYTHON,
    execute_code_python,
    execute_code_ruby
} from "../actions/API/execode.action";
import AuthService from "../components/Auth/AuthService";
import {addSnippet, deleteSnippet, getAllSnippetsByUser} from "../actions/API/snippets.action";
import {addCode} from "../actions/API/code.action";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SnippetsCard from "../components/pages/SnippetsCard";
import {Box, Modal} from "@mui/material";
import {getProjectByOwner} from "../actions/API/project.action";
import ReloadUntilData from "../components/utils/ReloadUntilData";
import {isEmpty} from "../components/utils/Utils";
import axios from "axios";


const Code = () => {

    const dispatch = useDispatch();
    const { id } = useParams();
    const [codeTest, setCodeTest] =  useState(``)
    const [codeSnippetsAdd,setCodeSnippetsAdd] = useState(``)
    const [nameCode,setCodeName] = useState("Unititled")
    const { register, handleSubmit,watch } = useForm({mode: 'onChange'});
    const [responseCode, setResponseCode] = useState([""])
    const [language,setLanguage] = useState({id:1,name:"python"})
    const languagelist = [{id:1,name:"python"},{id:2,name:"js"},{id:4,name:"ruby"}]
    const [excutePython,setExcutePython] = useState([])
    const [excuteRuby,setExcuteRuby] = useState([])
    const [excuteJs,setExcuteJs] = useState([])
    const user_id = AuthService.getUserId()
    const [anchorElSnippets, setAnchorElSnippets] = useState(null);
    const openSnippets = Boolean(anchorElSnippets);
    const [projectChoices, setProjectChoices] = useState([]);
    const [allProject,setAllProject] = useState([]);
    const [allSnippets, setAllSnippets] = useState([]);

    useEffect(() => {
        dispatch(getProjectByOwner(user_id));
        dispatch(getAllSnippetsByUser(user_id))
    }, []);

    const projects = useSelector( state => state.projectReducer);
    const snippets = useSelector( state => state.snippetsReducer);


    const loadProjectData = async () => {
        let projectsData = await projects;
        let snippetsData = await snippets
        setAllProject(projectsData)
        setAllSnippets(snippetsData)
    }

    loadProjectData().then(r => {
        console.log(r)
        ReloadUntilData(projects)
    });




    console.log(allProject)
    console.log(allSnippets)
    console.log(codeTest)

    const [openModalSave, setOpenModalSave] = useState(false);
    const handleOpenModalSave = () => {
        if(allProject.length > 1){
            if(allProject[0].id !== 0){
                    allProject.push({id:0,name:"Aucun"})
            }
        }else {
            allProject.push({id:0,name:"Aucun"})
        }

        setOpenModalSave(true)
    };
    const handleCloseModalSave = () => setOpenModalSave(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 838,
        bgcolor: '#131417',
        borderRadius:5,
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const callExecPythons = (data) => {
        axios
            .post(`http://46.101.91.145:3001/excution/python`, data)
            .then((res) => {
                setExcutePython(res.data)

            })
            .catch((err) => console.log(err));
    }

    const callExecJs = (data) => {
        axios
            .post(`http://46.101.91.145:3001/excution/js`, data)
            .then((res) => {
                setExcuteJs(res.data)

            })
            .catch((err) => console.log(err));
    }

    const callExecRuby = (data) => {
        axios
            .post(`http://46.101.91.145:3001/excution/ruby`, data)
            .then((res) => {
                setExcuteRuby(res.data)

            })
            .catch((err) => console.log(err));
    }

    const getCodeTest = (codetitle) => {
        const article = { code: codetitle };
        if(language.name === "python"){
            callExecPythons(article)
            loadDataPythons()
        }else if(language.name === "js"){
            callExecJs(article)
            loadDataJs()
        }else if(language.name === "ruby"){
            callExecRuby(article)
            loadDataRuby()
        }else{
            console.error("language is not recognized")
        }
    }
    const onSubmit = (data) => {
        if(data.nameCode !== "Unititled"){
            console.log(reconstructJsonSendApi(data));
            dispatch(addCode(reconstructJsonSendApi(data)))
            handleCloseModalSave()

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
        data.content = data["contentinput"]
        data.language_id = language.id
        if(projectChoices.id !== 0){
            data.project_id = projectChoices.id
        }
        return data
    }

    const handleProjectName = () => {
        const getProject = watch("project")
        allProject.map((value => {
           if(value.name === getProject){
               setProjectChoices(value)
               console.log(value)
           }
        }))
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
    const handleAddSnippet = (content) => {
        const test = content
        setCodeTest(codeTest + "\n" + test)
    }

    const handleCloseSnippets = () => {
        setAnchorElSnippets(null);
    };


    const handleChangeNameCode = () => {
        let nameCodeChange = watch("nameCode");
        console.log(nameCodeChange)
        setCodeName(nameCodeChange)
    }

    const handleDeleteSnippets = (id) => {
        dispatch(deleteSnippet(id))
    }

    return (
       <>
           <Modal
               open={openModalSave}
               onClose={handleCloseModalSave}
               aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description"
           >
               <Box sx={style}>
                   <div className="composant-modal">
                       <div className="header-modal">
                           <div className="container-title-modal">
                               <div className="title-modal">Save your code</div>
                               <div className="line-back"/>
                           </div>
                           <img onClick={()=> handleCloseModalSave()} className="close-modal" src="/assets/logo/close.svg" alt="close modal"/>
                       </div>
                       <div className="hr"/>
                       <form className="form-container-modal" name="groupForm" onSubmit={handleSubmit(onSubmit)}>
                           <div className="container-form-modal">
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
                           </div>
                           <div className="container-form-modal">
                               <div className="title-input-modal">Code</div>
                               <textarea {...register("contentinput")} defaultValue={codeTest}  cols="30" rows="10"  placeholder="votre code ...." style={{padding:10,fontSize:10,resize: "none"}}   />
                           </div>
                           <div className="container-form-modal">
                               <div className="title-input-modal">Project</div>
                               {
                                   !isEmpty(allProject) &&
                                   <select className="input-modal" onClick={handleProjectName}
                                           name="project"  {...register("project", {required: true})}>
                                       {
                                           allProject?.map((project, index) =>
                                               <option key={index}>{project.name}</option>
                                           )
                                       }
                                   </select>
                               }
                           </div>
                           <button type="submit" className="button-save">Save</button>
                       </form>
                   </div>
               </Box>
           </Modal>
           <div className="view--code">
               <form  action="">
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
                               {
                                   !isEmpty(allSnippets) &&
                                   allSnippets.map((value,index) =>
                                       <MenuItem  key={index} >
                                           <div className="component-snippets-card">
                                               <div className="title-snippets">{value.name}</div>
                                               <img onClick={()=> handleAddSnippet(value.content)} src="/assets/logo/add.svg" alt="add"/>
                                               <img onClick={()=> handleDeleteSnippets(value.id)} src="/assets/logo/close_red.svg" alt="add"/>
                                           </div>
                                       </MenuItem>
                                   )
                               }
                           </Menu>
                           <div onClick={() => handleOpenModalSave()} className="option-button">
                               <img className="img-option" src="/assets/logo/save.svg" alt="save"/>
                               <div  className="title-option">Save</div>
                           </div>
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
                                   value={codeTest}
                                   height="100%"
                                   onChange={(editor, viewUpdate) => {
                                       console.log('value:', editor.getValue() + codeSnippetsAdd);
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
       </>
    );
};

export default Code;