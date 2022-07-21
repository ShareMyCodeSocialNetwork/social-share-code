import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getProjectByGroup} from "../actions/API/project.action";
import {isEmpty} from "../components/utils/Utils";
import {getOneGroupById} from "../actions/API/group.action";
import NewProject from "../layout/Modals/NewProject";
import ProjectView from "../components/pages/ProjectView";
import {
    addUserRoleGroup, deleteUserRoleGroup, getFullUserRoleGroups,
    getUserRoleGroupByUserAndGroup,
    getUserRoleGroupsByGroup
} from "../actions/API/userRoleGroup.action";
import {useForm} from "react-hook-form";
import AuthService from "../components/Auth/AuthService";

const GroupContent = () => {
    AuthService.isAuth();
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
    const leave = useForm();



    useEffect(() => {
        dispatch(getOneGroupById(id));
        dispatch(getProjectByGroup(id));
        dispatch(getFullUserRoleGroups(id, user_id));
    }, []);

    const [groupData, setGroupData] = useState();
    const group = useSelector(state => state.groupReducer);

    const [projectData, setProjectData] = useState([]);
    const project = useSelector(state => state.projectReducer);


    const [userRoleGroupData, setUserRoleGroupData] = useState();
    const userRoleGroup = useSelector(state => state.userRoleGroupReducer);

    const loadProjectData = async () => {
        let dbGroup = await group;
        let dbProject = await project;
        let dbUserRoleGroup = await userRoleGroup;

        setGroupData(dbGroup);
        setProjectData(dbProject);
        setUserRoleGroupData(dbUserRoleGroup);
    }
    loadProjectData().then();

    const joinClick = (data) => {
        data.user_id = user_id;
        data.group_id = groupData.id;
        dispatch(addUserRoleGroup(data));
        window.location.reload();
    };

    const leaveClick = (data) => {
        console.log(data);
        dispatch(deleteUserRoleGroup(data.userRoleGroupId));
        //window.location.reload();
        alert("you leave this group !");
    };

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
                    <button type={"submit"}>Join</button>
                </form>
            }
            {
                !isEmpty(groupData) &&
                !isEmpty(userRoleGroupData) &&
                //groupData.owner.id.toString() !== user_id.toString() &&
                <form onSubmit={leave.handleSubmit(leaveClick)}>
                    <input type={"hidden"} {...leave.register("userRoleGroupId")} value={userRoleGroupData.id} name="userRoleGroupId"/>
                    <button type={"submit"}>Leave</button>
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
                                <ProjectView name={item.name} description={item.description} projectId={item.id} userId={item.user.id} userPseudo={item.user.pseudo}></ProjectView>
                            </div>
                        ))
                    }
                    {isEmpty(projectData) && "No Projects in this group"}

                </div>
            </div>

            <div>
                {
                    !isEmpty(groupData) && <a href={"/profil/" + groupData.owner.id}>{"Group's owner : " + groupData.owner.pseudo} </a>
                }
                <ul>
                    {
                        !isEmpty(userRoleGroupData) &&
                        !isEmpty(userRoleGroupData.userInGroupWithRole) &&
                        !isEmpty(groupData) &&
                        user_id.toString() === groupData.owner.id.toString() &&
                        userRoleGroupData.userInGroupWithRole.map( (item, index) => (
                            <li key={index}><a href={"/profil/" + item.user.id}>{item.user.pseudo}</a></li>
                        ))
                    }
                </ul>
            </div>

            <NewProject style={style} openModalProject={openModalProject} handleCloseModalProject={handleCloseModalProject} group_id={id}></NewProject>
        </div>
    );


};

export default GroupContent;