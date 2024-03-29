import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {GET_PROJECT_BY_OWNER, getProjectByOwner} from "../actions/API/project.action";
import {isEmpty} from "../components/utils/Utils";
import ProjectView from "../components/pages/ProjectView";
import AuthService from "../components/Auth/AuthService";
import axios from "axios";
import {API_URL} from "../actions/global";
const MyProjects = () => {
    AuthService.isAuth();
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
    }, []);
    return (
        <div className="view--project">
            <div className="container-project">
                {
                    !isEmpty(dataProjects) &&
                    dataProjects.map(
                        (item, index) => (
                            <div key={index} className="post-code" >
                                <ProjectView  userPseudo={item.user.pseudo} name={item.name} description={item.description} projectId={item.id} userId={item.user.id}></ProjectView>
                            </div>
                        ))
                }
                {isEmpty(dataProjects) && "No project found ! Create one on top right !"}
            </div>
        </div>
    );
}
export default MyProjects;