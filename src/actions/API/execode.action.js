import axios from "axios";


export const API_URL = "https://localhost:3001/excution"

export const EXECUTE_CODE_JS = "EXECUTE_CODE_JS";
export const EXECUTE_CODE_PYTHON = "EXECUTE_CODE_PYTHON";
export const EXECUTE_CODE_RUBY = "EXECUTE_CODE_RUBY";
export const EXECUTE_CODE_JAVA = "EXECUTE_CODE_JAVA";







export const execute_code_python = (data) => {
    return (dispatch) => {
        return axios
            .post(`${API_URL}/python`, data)
            .then((res) => {
                dispatch({ type: EXECUTE_CODE_PYTHON, payload: res.data });

            })
            .catch((err) => console.log(err));
    };
};


export const execute_code_js = (data) => {
    return (dispatch) => {
        return axios
            .post(`${API_URL}/js`, data)
            .then((res) => {
                dispatch({ type: EXECUTE_CODE_JS, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};


export const execute_code_java = (data) => {
    return (dispatch) => {
        return axios
            .post(`${API_URL}/java`, data)
            .then((res) => {
                dispatch({ type: EXECUTE_CODE_JAVA, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};


export const execute_code_ruby = (data) => {
    return (dispatch) => {
        return axios
            .post(`${API_URL}/ruby`, data)
            .then((res) => {
                dispatch({ type: EXECUTE_CODE_RUBY, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};


