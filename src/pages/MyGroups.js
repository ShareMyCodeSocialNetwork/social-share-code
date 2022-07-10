import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {isEmpty} from "../components/utils/Utils";
import ProjectView from "../components/pages/ProjectView";
import {getGroupsByOwner} from "../actions/API/group.action";
import GroupCard from "./GroupCard";

const MyGroups = () => {
    const dispatch = useDispatch();
    const user_id = localStorage.getItem("user_id");

    useEffect(() => {
        dispatch(getGroupsByOwner(user_id));
    }, []);

    const groups = useSelector( state => state.groupReducer);
    const [groupsData, setGroupsData] = useState([]);

    const loadProjectData = async () => {
        let dbGroups = await groups;
        setGroupsData(dbGroups);
    }
    loadProjectData().then();


    return (
        <div className="view--project">
            <div className="container-project">

                {
                    !isEmpty(groupsData) &&
                    groupsData.map(
                        (item, index) => (
                            <div key={index} className="post-code" >
                                <GroupCard group={item}></GroupCard>
                            </div>
                        ))
                }
                {isEmpty(groupsData) && "No group found ! Create one on top right !"}

            </div>
        </div>
    );

}
export default MyGroups;