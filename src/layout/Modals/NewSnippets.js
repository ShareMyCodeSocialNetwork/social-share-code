import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import {addGroup} from "../../actions/API/group.action";
import {Box, Modal} from "@mui/material";
import {addSnippet} from "../../actions/API/snippets.action";

const NewSnippets = ({handleCloseModalSnippet, openModalSnippet, style, group_id = 0}) => {

    const dispatch = useDispatch();
    const user_id = localStorage.getItem("user_id");
    const { register, handleSubmit,watch } = useForm();
    const [language,setLanguage] = useState({id:1,name:"python"})
    const languagelist = [{id:1,name:"python"},{id:2,name:"js"},{id:4,name:"ruby"}]

    const group = useForm();

    const onSubmitGroup = (data) => {
        data.name = data["name"]
        data.content = data["content"]
        data.user_id = user_id;
        data.language_id = language.id;
        console.log(data);
        dispatch(addSnippet(data));
        handleCloseModalSnippet();
    }

    const handleChangeLanguage = () => {
        const getLanguage = watch("language");
        if(getLanguage === "python"){
            setLanguage({id:1,name:"python"});
        }else if(getLanguage === "js"){
            setLanguage({id:2,name:"js"});
        }else if(getLanguage === "ruby"){
            setLanguage({id:4,name:"ruby"});
        }else{
            console.error("language is not recognized")
        }
    }

    return (
        <Modal
            open={openModalSnippet}
            onClose={handleCloseModalSnippet}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div className="composant-modal">
                    <div className="header-modal">
                        <div className="container-title-modal">
                            <div className="title-modal">Create New snippet</div>
                            <div className="line-back"/>
                        </div>
                        <img onClick={()=> handleCloseModalSnippet()} className="close-modal" src="/assets/logo/close.svg" alt="close modal"/>
                    </div>
                    <div className="hr"/>
                    <form className="form-container-modal" name="groupForm" onSubmit={group.handleSubmit(onSubmitGroup)}>
                        <div className="container-form-modal">
                            <div className="title-input-modal">Name</div>
                            <input {...register("name")} type="text" className="input-modal"/>
                        </div>
                        <div className="container-form-modal">
                            <div className="choice-langage">
                                {
                                    language.name === "python" &&
                                    <img className="img-langage" src="/assets/logo/python.png" alt="python"/>
                                }
                                {
                                    language.name === "js" &&
                                    <img className="img-langage" src="/assets/logo/js.png" alt="js"/>
                                }
                                {
                                    language.name === "ruby" &&
                                    <img className="img-langage large" src="/assets/logo/ruby.png" alt="ruby"/>
                                }
                                <select onClick={handleChangeLanguage}
                                        name="language" {...register("language", {required: true})}>
                                    {
                                        languagelist.map((language, index) =>
                                            <option key={index}>{language.name}</option>
                                        )
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="container-form-modal">
                            <div className="title-input-modal">code</div>
                            <textarea style={{padding:20,fontSize:14}} {...register("content")} cols="30" rows="10" name="content-code" placeholder="votre code ...." />
                        </div>

                        <button type="submit" className="button-save">Save</button>
                    </form>
                </div>
            </Box>
        </Modal>
    );
};

export default NewSnippets;