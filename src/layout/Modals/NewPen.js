import React, {useEffect, useState} from 'react';
import "codemirror/theme/dracula.css"
import {Box, Modal} from "@mui/material";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {isEmpty} from "../../components/utils/Utils";
import {getProjectByOwner} from "../../actions/API/project.action";
import {getLanguages} from "../../actions/API/language.action";



const NewPenModal = ({handleCloseModalPen, openModalPen, style}) => {

    const dispatch = useDispatch();
    const user_id = localStorage.getItem("user_id");
    const pen = useForm();
    const [language,setLanguage] = useState("1");
    const [dataLanguage, setDataLanguage] = useState([]);

    useEffect(() => {
        dispatch(getProjectByOwner(user_id));
        dispatch(getLanguages())
    }, []);

    const projects = useSelector( state => state.projectReducer);
    const [data_projects, setData_projects] = useState([]);
    const dbLanguages = useSelector( state=> state.languageReducer)

    const loadData = async () =>{
        let projectsData = await projects;
        setData_projects(projectsData);
        console.log(data_projects);

        let languageData = await dbLanguages;
        setDataLanguage(languageData);
        console.log(dataLanguage);
    }
    loadData().then();

    const handleChangeLangage = () => {
        let languageChange = pen.watch("language_id");
        console.log(languageChange)
        setLanguage(languageChange)
    }

    const onSubmitPen = (data) => {
        data.user_id = user_id;
        console.log(data);
        console.log(data.project_id)
    }

    return (
        <Modal
            open={openModalPen}
            onClose={handleCloseModalPen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div className="composant-modal">
                    <div className="header-modal">
                        <div className="container-title-modal">
                            <div className="title-modal">Create New Pen</div>
                            <div className="line-back"/>
                        </div>
                        <img onClick={()=> handleCloseModalPen()} className="close-modal" src="/assets/logo/close.svg" alt="close modal"/>
                    </div>
                    <div className="hr"/>
                    <form className="form-container-modal" name="groupForm" onSubmit={pen.handleSubmit(onSubmitPen)}>
                        <div className="container-form-modal">
                            <div className="title-input-modal">Name</div>
                            <input {...pen.register("name")} type="text" className="input-modal"/>
                        </div>
                        <div className="container-form-modal">
                            <div  className="code-writer">
                                <div className="choice-langage">
                                    {
                                        language === "1" &&
                                        <img className="img-langage" height="50px" src="/assets/logo/python.png" alt="python"/>
                                    }
                                    {
                                        language === "2" &&
                                        <img className="img-langage" height="50px" src="/assets/logo/js.png" alt="js"/>
                                    }
                                    {
                                        language === "3" &&
                                        <img className="img-langage" height="50px" src="/assets/logo/java.png" alt="java"/>
                                    }
                                    {
                                        language === "4" &&
                                        <img className="img-langage" height="50px" src="/assets/logo/ruby.png" alt="ruby"/>
                                    }
                                    <select className="select-langage" name="language_id" onClick={handleChangeLangage} {...pen.register("language_id")}>
                                        {
                                            !isEmpty(dataLanguage) && dataLanguage.map((item,index)=>(
                                                <option key={index} value={item.id}>{item.name}</option>
                                            ))
                                        }
                                    </select>
                                    <br/>
                                    <select>
                                        {
                                            !isEmpty(data_projects) &&
                                            data_projects.map((item, index) => (
                                                <option key={index} value={item.id}>{item.name}</option>
                                            ))
                                        }
                                        <option value={null} {...pen.register("project_id")}>Without project</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="button-save">Save</button>
                    </form>
                </div>
            </Box>
        </Modal>
    );
};

export default NewPenModal;