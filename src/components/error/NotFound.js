import {Link} from "react-router-dom";
import React from "react";


const NotFound = () =>{
    return(
        <div className="container">
            <img src="/assets/img/404.svg" className="overlay" alt="404"/>
            <div className="content">
                <div className="message">
                    <p className="message-heading">Page Not Found</p>
                    <p className="message-description">The page you are looking for was moved, removed, renamed or might
                        never existed.</p>
                </div>
                <div className="links">
                    <Link to="/" style={{textDecoration:'none',color:'#fff'}}>
                    </Link>
                </div>
            </div>
            <div className="social">
                <ul className="social-list">
                    <li><a href=""><i className="fa fa-facebook"></i></a></li>
                    <li><a href=""><i className="fa fa-twitter"></i></a></li>
                    <li><a href=""><i className="fa fa-google-plus"></i></a></li>
                </ul>
            </div>
        </div>
    )
}

export default NotFound;