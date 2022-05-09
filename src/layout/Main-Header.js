import React, {useState} from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import {Link, useHistory} from "react-router-dom";
import {useForm} from "react-hook-form";

const MainHeader = () => {

    //TODO : faire les modals et les liens

    const [isConnected,setIsConnected] = useState(true)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const { register, handleSubmit,watch , getValues} = useForm();
    const history = useHistory();
    const onSubmit = (data) => {
        console.log(data);
    }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="main-header">
            <Link to="/" style={{textDecoration:'none',color:'#fff'}}>
                <div className="logo">CODEBACK</div>
            </Link>
            <div className="right-part">
                <div className="search-container">
                    <form onSubmit={handleSubmit(onSubmit)} action="" className="search-form">
                        <input type="text" {...register("search")} className="search-input" placeholder="Search..."/>
                    </form>
                    <img className="search-img" src="/assets/logo/search.svg" alt="Search"/>
                </div>
                {
                    isConnected === false &&
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
                    isConnected === true &&
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
                                 Your Work
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
                            <MenuItem>
                                 New Project
                            </MenuItem>
                            <MenuItem>
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
                                Logout
                            </MenuItem>
                        </Menu>
                    </div>
                }
            </div>
        </div>
    );
};

export default MainHeader;