import React, {useEffect, useState} from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import {Link, useHistory, useLocation} from "react-router-dom";
import {useForm} from "react-hook-form";
import AuthService from "../components/Auth/AuthService";
import {isEmpty} from "../components/utils/Utils";
import NewCollection from "./Modals/NewCollection";
import NewProject from "./Modals/NewProject";
import NewPen from "./Modals/NewPen";
import SnippetsCard from "../components/pages/SnippetsCard";

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
    const [anchorElSnippets, setAnchorElSnippets] = useState(null);
    const open = Boolean(anchorEl);
    const openSnippets = Boolean(anchorElSnippets);
    const [openModalProject, setOpenModalProject] = useState(false);
    const [openModalPen, setOpenModalPen] = useState(false);
    const handleOpenModalProject = () => setOpenModalProject(true);
    const handleOpenModalPen = () => setOpenModalPen(true);
    const handleCloseModalProject = () => setOpenModalProject(false);
    const handleCloseModalPen = () => setOpenModalPen(false);
    const search = useForm();
    const [openModalCollection, setOpenModalCollection] = useState(false);
    const handleOpenModalCollection = () => setOpenModalCollection(true);
    const handleCloseModalCollection = () => setOpenModalCollection(false);
    const history = useHistory();



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


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClickSnippets = (event) => {
        setAnchorElSnippets(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAddSnippet = () => {
        console.log('addSnippet')
    }

    const handleCloseSnippets = () => {
        setAnchorElSnippets(null);
    };

    return (
        <>
           <NewCollection handleCloseModalCollection={handleCloseModalCollection}  style={style} openModalCollection={openModalCollection}></NewCollection>
            <NewProject handleCloseModalProject={handleCloseModalProject} style={style} openModalProject={openModalProject}></NewProject>
            <NewPen style={style} handleCloseModalPen={handleCloseModalPen} openModalPen={openModalPen}></NewPen>

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
                            <div id="basic-button"
                                 aria-controls={openSnippets ? 'account-menu' : undefined}
                                 aria-haspopup="true"
                                 aria-expanded={openSnippets ? 'true' : undefined}
                                 onClick={handleClickSnippets} className="connected margin-right">
                                <img className="connected-img" src="/assets/logo/pin.svg" alt="pin"/>
                            </div>
                            <Menu
                                anchorEl={anchorElSnippets}
                                id="account-menu"
                                open={openSnippets}
                                onClose={handleCloseSnippets}
                                onClick={handleCloseSnippets}
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
                                    <SnippetsCard addSnippet={()=> handleAddSnippet()} title={"title snipts"}/>
                                </MenuItem>
                            </Menu>
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
                                        <Link to="/myProjects"  style={{textDecoration:'none', color:'#fff'}}>
                                            Your Projects
                                        </Link>
                                    </div>
                                </MenuItem>
                                <MenuItem>
                                    <div>
                                        <Link to={"/profil/" + localStorage.getItem("user_id")}  style={{textDecoration:'none', color:'#fff'}}>
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
                                <MenuItem onClick={() => handleOpenModalPen()}>
                                    New Pen
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