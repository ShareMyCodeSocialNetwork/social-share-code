import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getOneProjectsById} from "../actions/API/project.action";
import {getCodeByProject} from "../actions/API/code.action";
import {isEmpty} from "../components/utils/Utils";
import MyCodeView from "../components/pages/MyCodeView";

const ProjectContent = () => {
    const history = useHistory();
    const { id } = useParams();
    const dispatch = useDispatch();

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
        console.log(dataProject);
        console.log("dataProject");
        let codesData = await codes;
        setDataCode(codesData);
        console.log("dataCode");
        console.log(dataCode);
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
        </div>
    );


};

export default ProjectContent;