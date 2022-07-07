import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { getProjectByOwner} from "../actions/API/project.action";
import {isEmpty} from "../components/utils/Utils";
import ProjectView from "../components/pages/ProjectView";

const MyProjects = () => {
    const dispatch = useDispatch();
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
    }
    loadProjectData().then();


    return (
        <div className="view--project">
            <div className="container-project">

            {
                !isEmpty(dataProjects) &&
                dataProjects.map(
                    (item, index) => (
                        <div className="post-code" >
                        <ProjectView  key={index} userPseudo={item.user.pseudo} name={item.name} description={item.description} projectId={item.id} userId={item.user.id}></ProjectView>
                        </div>
                    ))
            }
                {isEmpty(dataProjects) && "No project found ! Create one on top right !"}

            </div>
            </div>
        );

}
export default MyProjects;