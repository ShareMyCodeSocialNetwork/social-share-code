import axios from "axios";
import AuthService from "../../Component/Auth/AuthService";


export const API_URL = "http://localhost:8080/api"
export const GET_DEMAND = "GET_DEMAND";
export const GET_DEMAND_BY_ID = "GET_DEMAND_BY_ID";
export const ADD_DEMAND = "ADD_DEMAND";
export const EDIT_DEMAND = "EDIT_DEMAND";
export const DELETE_DEMAND = "DELETE_DEMAND";

export const getDemands = () => {
    return (dispatch) => {
        return axios
            .get(`${API_URL}/demand/`, { headers: AuthService.authHeader() })
            .then((res) => {
                console.log(res.data);
                dispatch({ type: GET_DEMAND, payload: res.data });

            })
            .catch((err) => console.log(err));
    };
};

export const getOneDemandById = (demandId) => {
    return (dispatch) => {
        return axios
            .get(`${API_URL}/demand/${demandId}`,{ headers:  AuthService.authHeader() })
            .then((res) => {
                dispatch({ type: GET_DEMAND_BY_ID, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};

export const addDemand = (data) => {
    return (dispatch) => {
        return axios
            .post(`${API_URL}/demand/create`, data, { headers:  AuthService.authHeader() })
            .then(() => {
                dispatch({ type: ADD_DEMAND, payload: data });
            })
            .catch((err) => console.log(err));
    };
};

export const editDemand = (data) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `${API_URL}/demand/${data.id}`,
            data: { ...data },
            headers:  AuthService.authHeader()
        })
            .then(() => {
                dispatch({ type: EDIT_DEMAND, payload: { ...data } });
            })
            .catch((err) => console.log(err));
    };
};

export const deleteDemand = (demandId) => {
    return (dispatch) => {
        return axios({
            method: "delete",
            url: `${API_URL}/demand/delete/${demandId}`,
            headers:  AuthService.authHeader()

        })
            .then(() => {
                dispatch({ type: DELETE_DEMAND, payload: { demandId } });
            })
            .catch((err) => console.log(err));
    };
};