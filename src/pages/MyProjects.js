import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getProjectByOwner} from "../actions/API/project.action";

const MyProjects = () => {
    const dispatch = useDispatch();
    const [myProjects, setMyProjects] = useState([]);
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

    return (
        <ol>
            <li>
                work in progress, show data make me crazy 🤯
            </li>
            number of project :{myProjects.length}
            {/*
                myProjects?.map((item) => (
                    <div key={item}>{
                        item["name"]
                    }{
                        item["description"]
                    },
                        <br/>
                        <a href={"/project/" + item["id"]}> Show it </a>

                    </div>

                    ))
            */}
            </ol>
        );

}
export default MyProjects;