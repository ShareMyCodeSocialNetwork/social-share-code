import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getOneProjectsById} from "../actions/API/project.action";
import {getCodeByProject} from "../actions/API/code.action";
import {isEmpty} from "../components/utils/Utils";
import CodeView from "../components/pages/CodeView";

const Project = () => {
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
            project name : {!isEmpty(dataProject) && dataProject.name}
            <br/>
            <br/>
            project description : {!isEmpty(dataProject) && dataProject.description}
            <br/>
            <br/>
            project group : {!isEmpty(dataProject) && !isEmpty(dataProject.group) && dataProject.group.name}
            <br/>
            <br/>
            codes in project :

            {<ol>
                {
                    !isEmpty(dataCode) &&
                    dataCode.map((item, index) => (
                       <div className="post-code" key={index}>
                           <CodeView language={item.language.name} code={item.nameCode} userPseudo={item.user.pseudo} ></CodeView>
                       </div>
                    ))
                }
            </ol>}

        </div>
    );


};

export default Project;