import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {GET_PROJECT_BY_ID_FULL, getOneProjectsById, getOneProjectsByIdFull} from "../actions/API/project.action";
import {isEmpty} from "../components/utils/Utils";
import MyCodeView from "../components/pages/MyCodeView";
import NewPen from "../layout/Modals/NewPen";
import AuthService from "../components/Auth/AuthService";
import axios from "axios";
import {API_URL} from "../actions/global";
const ProjectContent = () => {
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
    const [openModalPen, setOpenModalPen] = useState(false);
    const handleCloseModalPen = () => setOpenModalPen(false);
    const handleOpenModalPen = () => setOpenModalPen(true);
    const { id } = useParams();
    const user_id = localStorage.getItem("user_id");
    const [dataProject, setDataProject] = useState();
    useEffect(() => {
        axios
            .get(`${API_URL}/project/full/${id}`,{ headers:  AuthService.authHeader() })
            .then((res) => {
                setDataProject(res.data)
            }).catch((err) => console.log(err));
    }, []);
    return (
        <>
        <NewPen style={style} handleCloseModalPen={handleCloseModalPen} openModalPen={openModalPen} project_id={!isEmpty(dataProject) && !isEmpty(dataProject.project) && dataProject.project.id}></NewPen>
            <div className="view--project-content">
                <div className="left-part">
            {
                isEmpty(dataProject) && <div className="information-title">project not found</div>
            }
            {!isEmpty(dataProject) && !isEmpty(dataProject.project) &&
                <div className="information-title">project name :  {dataProject.project.name}</div>
            }

            {!isEmpty(dataProject) && !isEmpty(dataProject.project) &&
                <div className="information-title">project description : {dataProject.project.description}</div>
                }
            <br/>
            <br/>
            {!isEmpty(dataProject) && !isEmpty(dataProject.project) && !isEmpty(dataProject.project.group) &&
                <a className="link-information" href={"/group/" + dataProject.project.group.id}>project group : { dataProject.project.group.name}</a>}
            {!isEmpty(dataProject) && !isEmpty(dataProject.project) && isEmpty(dataProject.project.group) &&
                <div className="information-title">No group for this project</div>}
            <br/>
            <br/>
            {
                !isEmpty(dataProject) && !isEmpty(dataProject.project) && !isEmpty(dataProject.project.owner) &&
                dataProject.project.owner.id.toString() === user_id.toString() &&
                <a className="link-information" href={"/code/new" + dataProject.project.id}>create code in project</a>
            }
                </div>
                <div className="right-part">
            <div className="view--project">
                <div className="container-project">
                    {
                        !isEmpty(dataProject) && !isEmpty(dataProject.codesInProject) &&
                        !isEmpty(dataProject.codesInProject) &&
                        dataProject.codesInProject.map((item, index) => (
                            <div key={index} className="post-code">
                                <MyCodeView language={item.language.name} code={item.nameCode} userPseudo={item.user.pseudo} codeId={item.id} userId={item.user.id}></MyCodeView>
                            </div>))
                    }
                    {!isEmpty(dataProject) && isEmpty(dataProject.codesInProject) && <div className="information-title">No codes for this project</div>}
                </div>
            </div>
            </div>

        </div>
        </>
    );
};
export default ProjectContent;