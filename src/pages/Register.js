import React from 'react';

const SignIn = () => {
    return (
        <div className="view--auth">
            <div className="right-part-auth">
                <img className="right-img-auth" src="/assets/img/signUp.svg" alt="register"/>
            </div>
            <div className="left-part-auth">
                <div className="title-auth-left">register</div>
                <form action="" className="auth-from">
                    <input type="text" placeholder="Lastname" className="form-input"/>
                    <input type="text" placeholder="firstname" className="form-input"/>
                    <input type="text" placeholder="pseudo" className="form-input"/>
                    <input type="text" placeholder="password" className="form-input"/>
                    <input type="text" placeholder="email" className="form-input"/>
                    <input type="text" placeholder="tel" className="form-input"/>
                </form>
            </div>
            <div className="button-send">Login</div>
        </div>
    );
};

export default SignIn;