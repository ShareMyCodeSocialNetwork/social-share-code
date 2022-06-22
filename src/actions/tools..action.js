

export const GET_TAB = "GET_TAB";
export const SET_TAB = "SET_TAB";

const generalTab = [];

export const getGeneralTab = () => {
    return (dispatch) => {
        dispatch({ type: GET_TAB, payload: generalTab });
    };
};

export const setGeneralTab = (data) => {
    generalTab.push(data);
    return (dispatch) => {
        return  dispatch({ type: SET_TAB, payload: data });
    };
};