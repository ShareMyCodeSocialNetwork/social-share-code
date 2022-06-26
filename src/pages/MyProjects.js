import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {getOneUserById} from "../actions/API/user.action";
import {getProjectByOwner, getProjectByOwnerV2} from "../actions/API/project.action";

const MyProjects = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user_id = localStorage.getItem("user_id");

    useEffect(() => {
        dispatch(getProjectByOwner(user_id));
    }, [dispatch, user_id]);

    const projects = useSelector( state => state.projectReducer);
    const [dataProjects, setDataProjects] = useState([]);

    const loadProjectData = async () => {
        let projectsData = await projects;
        setDataProjects(projectsData);
        console.log(dataProjects);
        setMyProjects(dataProjects);

    }
    loadProjectData().then();



    const [myProjects, setMyProjects] = useState([
        {
            'name':'Loading...',
            'description': 'Loading...'
        },
    ]);
    return (
        <ol>
            {myProjects !== undefined ?
                myProjects?.map((project) => (
                    <li key={project}>{
                        project["name"]
                    }{
                        project["description"]
                    },
                    </li>
                    ))
                :
                <li>no projects found</li>
            }
            </ol>
        );



}
export default MyProjects;