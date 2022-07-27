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
    const dispatch = useDispatch();
    const user_id = localStorage.getItem("user_id");
    const [dataProject, setDataProject] = useState();
    useEffect(() => {
        axios
            .get(`${API_URL}/project/full/${id}`,{ headers:  AuthService.authHeader() })
            .then((res) => {
                setDataProject(res.data)
            })
            .catch((err) => console.log(err));
        //dispatch(getOneProjectsByIdFull(id));
        //dispatch(getCodeByProject(id));
    }, [dispatch, id]);

    //const projects = useSelector( state => state.projectReducer);
    //const codes = useSelector( state => state.codeReducer);

    //const [dataCode, setDataCode] = useState([]);


    /*const loadProjectData = async () => {
        let projectsData = await projects;
        setDataProject(projectsData);
        //let codesData = await codes;
        //setDataCode(codesData);
    }
    loadProjectData().then();*/

    return (

        <div>
            {
                isEmpty(dataProject) && "project not found"
            }
            {!isEmpty(dataProject) && !isEmpty(dataProject.project) &&
                "project name : " + dataProject.project.name}
            <br/>
            <br/>
            {!isEmpty(dataProject) && !isEmpty(dataProject.project) && "project description : " + dataProject.project.description}
            <br/>
            <br/>
            {!isEmpty(dataProject) && !isEmpty(dataProject.project) && !isEmpty(dataProject.project.group) && <a href={"/group/" + dataProject.project.group.id}>project group : { dataProject.project.group.name}</a>}
            {!isEmpty(dataProject) && !isEmpty(dataProject.project) && isEmpty(dataProject.project.group) && "No group for this project"}
            <br/>
            <br/>
            {
                !isEmpty(dataProject) && !isEmpty(dataProject.project) && !isEmpty(dataProject.project.user) &&
                dataProject.project.user.id.toString() === user_id.toString() &&
                <button onClick={() => handleOpenModalPen()}>create code in project</button>
            }

            <div className="view--project">
                <div className="container-project">
                {
                    !isEmpty(dataProject) && !isEmpty(dataProject.codesInProject) &&
                    !isEmpty(dataProject.codesInProject) &&
                    dataProject.codesInProject.map((item, index) => (
                       <div key={index} className="post-code">
                           <MyCodeView language={item.language.name} code={item.nameCode} userPseudo={item.user.pseudo} codeId={item.id} userId={item.user.id}></MyCodeView>
                       </div>
                    ))
                }
                {!isEmpty(dataProject) && isEmpty(dataProject.codesInProject) && "No codes for this project"}

        </div>
        </div>
            <NewPen style={style} handleCloseModalPen={handleCloseModalPen} openModalPen={openModalPen} project_id={!isEmpty(dataProject) && !isEmpty(dataProject.project) && dataProject.project.id}></NewPen>
        </div>

    );


};

export default ProjectContent;