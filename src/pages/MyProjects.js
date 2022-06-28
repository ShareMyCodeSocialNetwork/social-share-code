import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getProjectByOwner} from "../actions/API/project.action";
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
        <ol>
            number of project : {dataProjects.length}

            {
                !isEmpty(dataProjects)&&
                dataProjects.map(
                    (item, index) => (
                        <div key={index + 1}>
                            <ProjectView userPseudo={item.user.pseudo} name={item.name} description={item.description} projectId={item.id}></ProjectView>
                        </div>
                    ))
            }
            </ol>
        );

}
export default MyProjects;