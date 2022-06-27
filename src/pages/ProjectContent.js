import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getOneProjectsById} from "../actions/API/project.action";
import {getCodeByProject} from "../actions/API/code.action";

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
            alert("project not found");
            history.push( "/");
        }
        console.log(dataProject);
        let codesData = await codes;
        setDataCode(codesData);
        console.log(dataCode);
    }
    loadProjectData().then();

    return (
        <div>
            project name : {dataProject["name"]}
            <br/>
            project description : {dataProject["description"]}
            <br/>
            project group : {dataProject["group"]}
            <br/>
            codes : work in progress, need to show
            {/*<ol>
                {
                    dataCode.map(item => (
                       <li key={item}>
                           {
                               item
                           }
                       </li>
                    ))
                }
            </ol>*/}

        </div>
    );


};

export default Project;