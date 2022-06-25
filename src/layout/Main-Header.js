import React, {useEffect, useState} from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import {Link, useHistory, useLocation} from "react-router-dom";
import {useForm} from "react-hook-form";
import {Box, Modal} from "@mui/material";
import AuthService from "../components/Auth/AuthService";
import {isEmpty} from "../components/utils/Utils";
import {useDispatch} from "react-redux";
import {createProject} from "../actions/API/project.action";
import {addGroup} from "../actions/API/group.action";

const MainHeader = () => {

    //TODO : faire les modals et les liens

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




    const [isConnected, setIsConnected] = useState(AuthService.getCurrentUser())
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [openModalProject, setOpenModalProject] = useState(false);
    const [openModalCollection, setOpenModalCollection] = useState(false);
    const handleOpenModalProject = () => setOpenModalProject(true);
    const handleOpenModalCollection = () => setOpenModalCollection(true);
    const handleCloseModalProject = () => setOpenModalProject(false);
    const handleCloseModalCollection = () => setOpenModalCollection(false);
    const search = useForm();
    const project = useForm();
    const group = useForm();
    const history = useHistory();
    const dispatch = useDispatch();

    const _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            console.log('do validate');
        }
    }
    const location = useLocation()

    useEffect(() => {
        setIsConnected(AuthService.getCurrentUser())
    }, [location.key])


    const onSubmitSearch = (data) => {
        console.log(data);
        if(data.search === ""){
            history.push({
                pathname:`/project-all/all`
            })
        }else{
            history.push({
                pathname:`/project-all/${data.search}`
            })
        }
    }

    const onSubmitProject = (data) => {
        data["user_id"] = localStorage.getItem("user_id");
        dispatch(createProject(data));
    }

    const onSubmitGroup = (data) => {
        data["user_id"] = localStorage.getItem("user_id");
        console.log(data);
        dispatch(addGroup(data));
    }


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Modal
                open={openModalCollection}
                onClose={handleCloseModalCollection}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="composant-modal">
                        <div className="header-modal">
                            <div className="container-title-modal">
                                <div className="title-modal">Create New Collection</div>
                                <div className="line-back"/>
                            </div>
                            <img onClick={()=> handleCloseModalCollection()} className="close-modal" src="/assets/logo/close.svg" alt="close modal"/>
                        </div>
                        <div className="hr"/>
                        <form className="form-container-modal" name="groupForm" onSubmit={group.handleSubmit(onSubmitGroup)}>
                            <div className="container-form-modal">
                                <div className="title-input-modal">Name</div>
                                <input {...group.register("name")} type="text" className="input-modal"/>
                            </div>
                            <div className="container-form-modal">
                                <div className="title-input-modal">Description</div>
                                <textarea {...group.register("description")} type="text" className="input-modal textura"/>
                            </div>
                            <button type="submit" className="button-save">Save</button>
                        </form>
                    </div>
                </Box>
            </Modal>
            <Modal
                open={openModalProject}
                onClose={handleCloseModalProject}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="composant-modal">
                        <div className="header-modal">
                            <div className="container-title-modal">
                                <div className="title-modal">Create New Project</div>
                                <div className="line-back"/>
                            </div>
                            <img src="/assets/logo/close.svg" onClick={()=> handleCloseModalProject()}   className="close-modal" alt="close modal"/>
                        </div>
                        <div className="hr"/>
                        <form className="form-container-modal" name="projectForm" onSubmit={project.handleSubmit(onSubmitProject)}>
                            <div className="container-form-modal">
                                <div className="title-input-modal" >Name</div>
                                <input {...project.register("name")} type="text" name="name" className="input-modal"/>
                            </div>
                            <div className="container-form-modal">
                                <div className="title-input-modal">Description</div>
                                <textarea {...project.register("description")} type="" name="description" className="input-modal textura"/>
                            </div>
                            <input {...project.register("user_id")} type="hidden" name="user_id" />
                            <button type="submit" className="button-save">Save</button>
                        </form>
                    </div>
                </Box>
            </Modal>
            <div className="main-header">
                <Link to="/" style={{textDecoration:'none',color:'#fff'}}>
                    <div className="logo">CODEBACK</div>
                </Link>
                <div className="right-part">
                    <div className="search-container">
                        <form  action="" className="search-form">
                            <input type="text" {...search.register("search")} className="search-input" placeholder="Search..."/>
                        </form>
                        <img onClick={search.handleSubmit(onSubmitSearch)}  className="search-img" src="/assets/logo/search.svg" alt="Search"/>
                    </div>
                    {
                        isEmpty(isConnected) &&
                        <div className="auth-container">
                            <Link  to="/login" style={{textDecoration:'none'}}>
                                <div className="auth green">
                                    <div className="auth-title">Sign In</div>
                                </div>
                            </Link>
                            <Link to="/register" style={{textDecoration:'none'}}>
                                <div className="auth grey">
                                    <div className="auth-title">Sign Up</div>
                                </div>
                            </Link>


                        </div>
                    }
                    {
                        !isEmpty(isConnected) &&
                        <div className="auth-container">
                            <Link to="/code/new" style={{textDecoration:'none'}}>
                                <div className="connected margin-right">
                                    <img className="connected-img" src="/assets/logo/add.svg" alt="add"/>
                                </div>
                            </Link>
                            <div className="connected margin-right">
                                <img className="connected-img" src="/assets/logo/pin.svg" alt="pin"/>
                            </div>
                            <div id="basic-button"
                                 aria-controls={open ? 'account-menu' : undefined}
                                 aria-haspopup="true"
                                 aria-expanded={open ? 'true' : undefined}
                                 onClick={handleClick} className="connected ">
                                <img className="connected-img" src="/assets/logo/profil_header.png" alt="profil_header"/>
                            </div>
                            <Menu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        bgcolor: '#131417',
                                        color: '#fff',
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            bgcolor: '#fff',
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                <MenuItem>
                                    <div>
                                        <Link to="/project-all"  style={{textDecoration:'none', color:'#fff'}}>
                                            Your Work
                                        </Link>
                                    </div>
                                </MenuItem>
                                <MenuItem>
                                    <div>
                                        <Link to="/profil"  style={{textDecoration:'none', color:'#fff'}}>
                                            Profile
                                        </Link>
                                    </div>
                                </MenuItem>
                                <Divider sx={{bgcolor:'#C4C4C4'}}/>
                                <MenuItem>
                                    <div>
                                        <Link to="/code/new" style={{textDecoration:'none', color:'#fff'}}>
                                            New Pen
                                        </Link>
                                    </div>
                                </MenuItem>
                                <MenuItem onClick={() => handleOpenModalProject()}>
                                    New Project
                                </MenuItem>
                                <MenuItem onClick={() => handleOpenModalCollection()}>
                                    New Collection
                                </MenuItem>
                                <Divider sx={{bgcolor:'#C4C4C4'}} />
                                <MenuItem>
                                    <ListItemIcon>
                                        <Settings fontSize="small" sx={{color:'#C4C4C4'}} />
                                    </ListItemIcon>
                                    Settings
                                </MenuItem>
                                <MenuItem>
                                    <ListItemIcon>
                                        <Logout fontSize="small" sx={{color:'#C4C4C4'}}/>
                                    </ListItemIcon>
                                    <div>
                                        <Link to="/logout" style={{textDecoration:'none', color:'#fff'}}>
                                            logout
                                        </Link>
                                    </div>
                                </MenuItem>
                            </Menu>
                        </div>
                    }
                </div>
            </div>
        </>
    );
};

export default MainHeader;