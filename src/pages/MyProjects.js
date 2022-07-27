import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {GET_PROJECT_BY_OWNER, getProjectByOwner} from "../actions/API/project.action";
import {isEmpty} from "../components/utils/Utils";
import ProjectView from "../components/pages/ProjectView";
import AuthService from "../components/Auth/AuthService";
import ReloadUntilData from "../components/utils/ReloadUntilData";
import axios from "axios";
import {API_URL} from "../actions/global";

const MyProjects = () => {
    AuthService.isAuth();
    const dispatch = useDispatch();
    const user_id = localStorage.getItem("user_id");
    const [dataProjects, setDataProjects] = useState([]);
    useEffect(() => {
        axios
            .get(`${API_URL}/project/user/${user_id}`,{ headers:  AuthService.authHeader() })
            .then((res) => {
                console.log(res.data);
                setDataProjects(res.data);
            })
            .catch((err) => console.log(err));
    }, [dispatch, user_id]);



   /* const loadProjectData = async () => {
        let projectsData = await projects;
        setDataProjects(projectsData);
        console.log(dataProjects);
    }
    loadProjectData().then(r => ReloadUntilData(projects));*/


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