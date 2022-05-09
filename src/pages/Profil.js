import React, {useState} from 'react';

const Profil = () => {

    const [firstName,setFirstName] = useState("David")
    const [lastName,setLastName] = useState("Arnaud")
    const [pseudo,setPseudo] = useState("DH7789-dev")
    const [mdp,setMdp] = useState("dada222329@")
    const [tel,setTel] = useState("0622901123")
    const [mail,setMail] = useState("David@gmail.com")

    return (
        <div className="view--profile">
            <div className="header-profile">
                <img className="overlay-profile" src="/assets/img/overlay-profile.svg" alt=""/>
                <div className="profile-data">
                    <div className="title-name">{pseudo}</div>
                    <div className="image-profile">
                        <img src="/assets/logo/profil_header.svg" alt="profile"/>
                    </div>
                </div>
            </div>
            <div className="body-profile">
                <div className="social-profile">
                    <div className="social-follow">
                        <div className="number-social-follow">0</div>
                        <div className="title-social-follow">followers</div>
                    </div>
                    <div className="social-follow">
                        <div className="number-social-follow">0</div>
                        <div className="title-social-follow">following</div>
                    </div>
                </div>
                <form action="" className="form-profile">
                    <div className="container-profile">
                        <div className="social-profile-input">
                            <div className="title-input">Nom</div>
                            <input type="text" className="input-profile" defaultValue={lastName}/>
                        </div>
                        <div className="social-profile-input">
                            <div className="title-input">Prenom</div>
                            <input type="text" className="input-profile" defaultValue={firstName}/>
                        </div>
                    </div>
                    <div className="container-profile">
                        <div className="social-profile-input">
                            <div className="title-input">Pseudo</div>
                            <input type="text" className="input-profile" defaultValue={pseudo}/>
                        </div>
                        <div className="social-profile-input">
                            <div className="title-input">MDP</div>
                            <input type="password" className="input-profile" defaultValue={mdp}/>
                        </div>
                    </div>
                    <div className="container-profile">
                        <div className="social-profile-input">
                            <div className="title-input">Tel</div>
                            <input type="tel" className="input-profile" defaultValue={tel}/>
                        </div>
                        <div className="social-profile-input">
                            <div className="title-input">Email</div>
                            <input type="text" className="input-profile" defaultValue={mail}/>
                        </div>
                    </div>
                    <button className="button-profile">enregistrer</button>
                </form>
            </div>
        </div>
    );
};

export default Profil;