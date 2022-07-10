import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getProjectByGroup} from "../actions/API/project.action";
import {isEmpty} from "../components/utils/Utils";
import {getOneGroupById} from "../actions/API/group.action";
import NewProject from "../layout/Modals/NewProject";
import ProjectView from "../components/pages/ProjectView";
import {
    addUserRoleGroup,
    getUserRoleGroupByUserAndGroup,
    getUserRoleGroupsByGroup
} from "../actions/API/userRoleGroup.action";
import {useForm} from "react-hook-form";

const GroupContent = () => {
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

    const [openModalProject, setOpenModalProject] = useState(false);
    const handleCloseModalProject = () => setOpenModalProject(false);
    const handleOpenModalProject = () => setOpenModalProject(true);
    const { id } = useParams();
    const dispatch = useDispatch();
    const user_id = localStorage.getItem("user_id");

    const join = useForm();

    const joinClick = (data) => {
        data.user_id = user_id;
        data.group_id = groupData.id;
        dispatch(addUserRoleGroup(data));
        alert("join ok");
    };

    useEffect(() => {
        dispatch(getOneGroupById(id));
        dispatch(getProjectByGroup(id));
        dispatch(getUserRoleGroupsByGroup(id));
        dispatch(getUserRoleGroupByUserAndGroup(user_id, id));
    }, []);

    const [groupData, setGroupData] = useState();
    const group = useSelector(state => state.groupReducer);

    const [usersInGroup, setUsersInGroup] = useState([]);
    const usersInGroupAsync = useSelector(state => state.userRoleGroupReducer);

    const [userRoleGroupData, setUserRoleGroupData] = useState();
    const userRoleGroup = useSelector(state => state.userRoleGroupReducer);

    const [projectData, setProjectData] = useState([]);
    const project = useSelector(state => state.projectReducer);

    const loadProjectData = async () => {
        let dbGroup = await group;
        let dbProject = await project;
        let dbUsersInGroup = await usersInGroupAsync;
        let dbUserRoleGroup = await userRoleGroup;

        setGroupData(dbGroup);
        setProjectData(dbProject);
        setUsersInGroup(dbUsersInGroup);
        setUserRoleGroupData(dbUserRoleGroup);
        console.log(usersInGroup)
    }
    loadProjectData().then();


    return (

        <div>
            {
                isEmpty(groupData) && "group not found"
            }
            {!isEmpty(groupData) && "group name : " + groupData.name}
            <br/>
            <br/>
            {
                !isEmpty(groupData) &&
                "project description : " + groupData.description
            }
            <br/>
            <br/>

            {
                !isEmpty(groupData) &&
                isEmpty(userRoleGroupData) && groupData.owner.id.toString() !== user_id.toString()
                &&
                <form onSubmit={join.handleSubmit(joinClick)}>
                    <button type={"submit"}>join</button>
                </form>
            }
            {
                !isEmpty(groupData) && !isEmpty(groupData.owner) &&
                groupData.owner.id.toString() === user_id.toString() &&
                <button onClick={() => handleOpenModalProject()}>Create Project in this group</button>
            }

            <div className="view--project">
                <div className="container-project">
                    {
                        !isEmpty(projectData) &&
                        projectData.map((item, index) => (
                            <div key={index} className="post-code">
                                <ProjectView name={item.name} description={item.description} projectId={item.id} userId={item.user.id} userPseudo={item.user.id}></ProjectView>
                            </div>
                        ))
                    }
                    {isEmpty(projectData) && "No Projects in this group"}

                </div>
            </div>

            <div>
                {!isEmpty(groupData) && <a href={"/profil/" + groupData.owner.id}>{"Group's owner : " + groupData.owner.pseudo} </a> }
                <ul>
                    {
                        !isEmpty(usersInGroup) &&
                        usersInGroup.map( (item, index) => (
                            <li key={index}>{item.pseudo}</li>
                        ))
                    }
                </ul>
            </div>

            <NewProject style={style} openModalProject={openModalProject} handleCloseModalProject={handleCloseModalProject} group_id={id}></NewProject>
        </div>
    );


};

export default GroupContent;