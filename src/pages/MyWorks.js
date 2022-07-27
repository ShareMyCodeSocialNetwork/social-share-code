import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {isEmpty} from "../components/utils/Utils";
import AuthService from "../components/Auth/AuthService";
import MyCodeView from "../components/pages/MyCodeView";
import {getCodeByUser} from "../actions/API/code.action";

const MyWorks = () => {
    AuthService.isAuth();
    const dispatch = useDispatch();
    const user_id = localStorage.getItem("user_id");

    useEffect(() => {
        dispatch(getCodeByUser(user_id));
    }, []);

    const codes = useSelector( state => state.codeReducer);
    const [dataCode, setDataCode] = useState([]);

    const loadData = async () => {
        let codesData = await codes;
        setDataCode(codesData);
    }
    loadData().then()


    return (
        <div className="view--project">
            <div className="container-project">
                {
                    !isEmpty(dataCode) &&
                    dataCode.map((item, index) => (
                        <div key={index} className="post-code">
                            <MyCodeView language={item.language.name} code={item} userPseudo={item.user.pseudo} codeId={item.id} userId={item.user.id}></MyCodeView>
                        </div>
                    ))
                }
                {isEmpty(dataCode) && "No codes for this project"}

            </div>
        </div>
    );

}
export default MyWorks;