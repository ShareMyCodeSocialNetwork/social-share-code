import React from 'react';

const Login = () => {
    return (
        <div className="view--auth">
            <div className="right-part-auth">
                <img className="right-img-auth" src="/assets/img/login.svg" alt="login"/>
            </div>
            <div className="left-part-auth">
                <div className="title-auth-left">Login</div>
                <form action="" className="auth-from">
                    <input type="text" placeholder="email" className="form-input"/>
                    <input type="text" placeholder="password" className="form-input"/>
                </form>
                <div className="button-send">Login</div>
            </div>

        </div>
    );
};

export default Login;