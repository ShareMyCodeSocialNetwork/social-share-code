import React from 'react';
import "codemirror/theme/dracula.css"
import {Box, Modal} from "@mui/material";
import {isEmpty} from "../../components/utils/Utils";
import {useForm} from "react-hook-form";

const MembersOfGroup = ({handleCloseModal, openModal, style, groupData, fullUserRoleGroupData}) => {
    const user_id = localStorage.getItem("user_id");
    const remove = useForm();
    const RemoveUserFromGroup = (data) => {
        console.log(data);
        //handleCloseModal();
    }
    console.log(fullUserRoleGroupData);
    return (
        <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div className="composant-modal">
                    <div className="header-modal">
                        <div className="container-title-modal">
                            <div className="title-modal">Members of group : {!isEmpty(groupData) && groupData.name}</div>
                            <div className="line-back"/>
                        </div>
                        <img onClick={()=> handleCloseModal()} className="close-modal" src="/assets/logo/close.svg" alt="close modal"/>
                    </div>
                    <div className="hr"/>
                    <div className="form-container-modal" name="groupForm" >
                        <div className="container-form-modal">
                            {
                                !isEmpty(groupData) && <span>Group's owner : <a href={"/profil/" + groupData.owner.id}>{groupData.owner.pseudo} </a></span>
                            }
                            <br/>
                            <br/>
                            <form onSubmit={remove.handleSubmit(RemoveUserFromGroup)}>
                            <table>
                                <thead>
                                <tr>
                                    <th>Members</th><th>Role</th><th></th>
                                    {/*<th></th>*/}
                                </tr>
                                </thead>
                                <tbody>

                                {
                                    !isEmpty(fullUserRoleGroupData) &&
                                    !isEmpty(fullUserRoleGroupData.userInGroupWithRole) &&
                                    !isEmpty(groupData) &&
                                    //user_id.toString() === groupData.owner.id.toString() &&
                                    fullUserRoleGroupData.userInGroupWithRole.map( (item, index) => (
                                        <tr key={index}>
                                            <td><a href={"/profil/" + item.user.id}>{item.user.pseudo}</a></td>
                                            <td>{item.role.titlePermission}</td>
                                            {/*<td> //todo change role to implement later
                                                <form onSubmit={RemoveUserFromGroup}>
                                                    <input type={"hidden"} name={"userRoleGroupId"} value={item.id}/>
                                                    <button type={"submit"}>Change</button>
                                                </form>
                                            </td>*/}
                                            <td>
                                                {
                                                    !isEmpty(fullUserRoleGroupData) &&
                                                    !isEmpty(groupData) &&
                                                    (
                                                        groupData.owner.id.toString() === user_id.toString() ||
                                                        (
                                                            !isEmpty(fullUserRoleGroupData.isInGroup) &&
                                                            fullUserRoleGroupData.isInGroup.role.titlePermission === "ADMIN"
                                                        )
                                                    ) &&
                                                    <div id={index}>
                                                        <input {...remove.register("removeId")} type="text" name="removeId" value={item.id} readOnly/>
                                                        <button type={"submit"}>remove</button>
                                                    </div>
                                                }
                                            </td>
                                        </tr>
                                    ))
                                }

                                </tbody>
                            </table>
                            </form>
                        </div>

                    </div>
                </div>
            </Box>
        </Modal>
    );
};

export default MembersOfGroup