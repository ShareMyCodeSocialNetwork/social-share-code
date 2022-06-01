import axios from "axios";


export const API_URL_JAVA = "http://localhost:3003/excution"
export const API_URL_RUBY = "http://localhost:3003/excution"
export const API_URL_PYTHON = "http://localhost:3003/excution"
export const API_URL_JS = "http://localhost:3003/excution"
export const EXECUTE_CODE_JS = "ADD_CODE";
export const EXECUTE_CODE_PYTHON = "ADD_CODE";
export const EXECUTE_CODE_RUBY = "ADD_CODE";
export const EXECUTE_CODE_JAVA = "ADD_CODE";







export const execute_code_python = (data) => {
    return (dispatch) => {
        return axios
            .post(`${API_URL_PYTHON}/python`, data)
            .then(() => {
                dispatch({ type: EXECUTE_CODE_PYTHON, payload: data });
            })
            .catch((err) => console.log(err));
    };
};


export const execute_code_js = (data) => {
    return (dispatch) => {
        return axios
            .post(`${API_URL_JS}/js`, data)
            .then(() => {
                dispatch({ type: EXECUTE_CODE_JS, payload: data });
            })
            .catch((err) => console.log(err));
    };
};


export const execute_code_java = (data) => {
    return (dispatch) => {
        return axios
            .post(`${API_URL_JAVA}/java`, data)
            .then(() => {
                dispatch({ type: EXECUTE_CODE_JAVA, payload: data });
            })
            .catch((err) => console.log(err));
    };
};


export const execute_code_ruby = (data) => {
    return (dispatch) => {
        return axios
            .post(`${API_URL_RUBY}/ruby`, data)
            .then(() => {
                dispatch({ type: EXECUTE_CODE_RUBY, payload: data });
            })
            .catch((err) => console.log(err));
    };
};


