import React from 'react';

const Register = () => {
    return (
        <div className="view--auth">
            <div className="right-part-auth">
                <img className="right-img-auth" src="/assets/img/signUp.svg" alt="register"/>
            </div>
            <div className="left-part-auth">
                <div className="title-auth-left">Register</div>
                <form action="" className="auth-from">
                    <input type="text" placeholder="Lastname" className="form-input"/>
                    <input type="text" placeholder="firstname" className="form-input"/>
                    <input type="text" placeholder="pseudo" className="form-input"/>
                    <input type="text" placeholder="password" className="form-input"/>
                    <input type="text" placeholder="email" className="form-input"/>
                    <input type="text" placeholder="tel" className="form-input"/>
                </form>
                <div className="button-send">register</div>
            </div>

        </div>
    );
};

export default Register;