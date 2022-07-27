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
        handleCloseModal();
    }
    console.log(fullUserRoleGroupData);

    /*
    * <form onSubmit={remove.handleSubmit(RemoveUserFromGroup)}>
                            <table>
                                <thead>
                                <tr>
                                    <th>Members</th><th>Role</th><th></th>

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
    * */


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
                                !isEmpty(groupData) &&
                                <div className="title-first-form">
                                    <div className="title-form-user">Group's owner : </div>
                                    <a className="title-compte" href={"/profil/" + groupData.owner.id}>
                                        <img src="/assets/logo/profil.svg" alt=""/>
                                        <div className="title-user">{groupData.owner.pseudo}</div>
                                    </a>
                                </div>
                            }
                            <br/>
                            <br/>
                            <div className="form-container-table">
                                <form className="form-table" onSubmit={remove.handleSubmit(RemoveUserFromGroup)}>
                                    <div className="container-table">
                                        <div className="title-table">User</div>
                                        <div className="title-table">Role</div>
                                    </div>
                                    <div className="container-content">
                                        {
                                            !isEmpty(fullUserRoleGroupData) &&
                                            !isEmpty(fullUserRoleGroupData.userInGroupWithRole) &&
                                            !isEmpty(groupData) &&
                                            fullUserRoleGroupData.userInGroupWithRole.map( (item, index) =>
                                                <div key={index} className="container-data">
                                                    <a href={"/profil/" + item.user.id} className="user">
                                                        <img src="/assets/logo/profil.svg" alt=""/>
                                                        <div className="title-user">{item.user.pseudo}</div>
                                                    </a>
                                                    <div className="title-data">{item.role.titlePermission}</div>
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
                                                        <div className="form-data">
                                                            <input {...remove.register("removeId")} type="text" name="removeId" value={item.id} readOnly/>
                                                            <button type={"submit"}>remove</button>
                                                        </div>
                                                    }

                                                </div>
                                            )
                                        }
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Box>
        </Modal>
    );
};

export default MembersOfGroup