import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getOneProjectsById} from "../actions/API/project.action";
import {getCodeByProject} from "../actions/API/code.action";
import {isEmpty} from "../components/utils/Utils";
import MyCodeView from "../components/pages/MyCodeView";
import NewPen from "../layout/Modals/NewPen";

const ProjectContent = () => {
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

    const [openModalPen, setOpenModalPen] = useState(false);
    const handleCloseModalPen = () => setOpenModalPen(false);
    const handleOpenModalPen = () => setOpenModalPen(true);
    const { id } = useParams();
    const dispatch = useDispatch();
    const user_id = localStorage.getItem("user_id");
    useEffect(() => {
        dispatch(getOneProjectsById(id));
        dispatch(getCodeByProject(id));
    }, [dispatch, id]);

    const projects = useSelector( state => state.projectReducer);
    const codes = useSelector( state => state.codeReducer);

    const [dataCode, setDataCode] = useState([]);
    const [dataProject, setDataProject] = useState();

    const loadProjectData = async () => {
        let projectsData = await projects;
        setDataProject(projectsData);
        if(dataProject === undefined || dataProject === null){
            //alert("project not found");
            //history.push( "/");
            //window.location.reload();
        }
        let codesData = await codes;
        setDataCode(codesData);
    }
    loadProjectData().then();

    return (

        <div>
            {
                isEmpty(dataProject) && "project not found"
            }
            {!isEmpty(dataProject) && "project name : " + dataProject.name}
            <br/>
            <br/>
            {!isEmpty(dataProject) && "project description : " + dataProject.description}
            <br/>
            <br/>
            {!isEmpty(dataProject) && !isEmpty(dataProject.group) && "project group : " + dataProject.group.name}
            {!isEmpty(dataProject) && isEmpty(dataProject.group) && "No group for this project"}
            <br/>
            <br/>
            {
                !isEmpty(dataProject) && !isEmpty(dataProject.user) &&
                dataProject.user.id.toString() === user_id.toString() &&
                <button onClick={() => handleOpenModalPen()}>create code in project</button>
            }

            <div className="view--project">
                <div className="container-project">
                {
                    !isEmpty(dataCode) &&
                    dataCode.map((item, index) => (
                       <div className="post-code">
                           <MyCodeView key={index} language={item.language.name} code={item.nameCode} userPseudo={item.user.pseudo} codeId={item.id} userId={item.user.id}></MyCodeView>
                       </div>
                    ))
                }
                {isEmpty(dataCode) && "No codes for this project"}

        </div>
        </div>
            <NewPen style={style} handleCloseModalPen={handleCloseModalPen} openModalPen={openModalPen} project_id={!isEmpty(dataProject) && dataProject.id}></NewPen>
        </div>

    );


};

export default ProjectContent;