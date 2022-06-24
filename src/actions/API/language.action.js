import axios from "axios";
import AuthService from "../../components/Auth/AuthService";
import {API_URL} from "../global";


export const GET_LANGUAGE = "GET_LANGUAGE";
export const GET_LANGUAGE_BY_ID = "GET_LANGUAGE_BY_ID";
export const ADD_LANGUAGE = "ADD_LANGUAGE";
export const UPDATE_LANGUAGE = "UPDATE_LANGUAGE";
export const DELETE_LANGUAGE = "DELETE_LANGUAGE";

export const getLanguages = () => {
    return (dispatch) => {
        return axios
            .get(`${API_URL}/language/`, { headers: AuthService.authHeader() })
            .then((res) => {
                dispatch({ type: GET_LANGUAGE, payload: res.data });

            })
            .catch((err) => console.log(err));
    };
};

export const getOneLanguageById = (languageId) => {
    return (dispatch) => {
        return axios
            .get(`${API_URL}/language/${languageId}`,{ headers:  AuthService.authHeader() })
            .then((res) => {
                dispatch({ type: GET_LANGUAGE_BY_ID, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};



//TODO :  avoir tout les LANGUAGEs d'une personne
//  faire un get all code et filtrer en unique sur les languages


export const addLanguage = (data) => {
    return (dispatch) => {
        return axios
            .post(`${API_URL}/language/create`, data, { headers:  AuthService.authHeader() })
            .then(() => {
                dispatch({ type: ADD_LANGUAGE, payload: data });
            })
            .catch((err) => console.log(err));
    };
};



export const updateLanguage = (languageId,data) => {
    return (dispatch) => {
        return axios
            .put(`${API_URL}/language/update/${languageId}`, data, { headers:  AuthService.authHeader() })
            .then(() => {
                dispatch({ type: UPDATE_LANGUAGE, payload: data });
            })
            .catch((err) => console.log(err));
    };
};



export const deleteLanguage = (languageId) => {
    return (dispatch) => {
        return axios({
            method: "delete",
            url: `${API_URL}/language/delete/${languageId}`,
            headers:  AuthService.authHeader()

        })
            .then(() => {
                dispatch({ type: DELETE_LANGUAGE, payload: { languageId } });
            })
            .catch((err) => console.log(err));
    };
};
