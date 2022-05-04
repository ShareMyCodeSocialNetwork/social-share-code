import React from 'react';
import {Link} from "react-router-dom";

const CardHome = ({logo= "",firstText= "",lastText="",button="", link = "/"}) => {
    return (
        <div className="component--card-home">
            <div className="logo-car">
                <img className="img-logo-card" src={logo} alt="logo"/>
            </div>
            <div className="first-text-card">{firstText}</div>
            <div className="last-text-card">{lastText}</div>
            <Link to={link} style={{textDecoration:'none',color:'#fff'}}>
                <div className="button-card">{button}</div>
            </Link>
        </div>
    );
};

export default CardHome;