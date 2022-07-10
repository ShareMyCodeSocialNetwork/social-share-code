import axios from "axios";
import AuthService from "../../components/Auth/AuthService";
import {API_URL} from "../global";

export const GET_PROJECT = "GET_PROJECT";
export const GET_PROJECT_BY_ID = "GET_PROJECT_BY_ID";
export const GET_PROJECT_BY_NAME = "GET_PROJECT_BY_NAME";
export const GET_PROJECT_BY_OWNER = "GET_PROJECT_BY_OWNER";
export const GET_PROJECT_BY_GROUP = "GET_PROJECT_BY_GROUP";
export const ADD_PROJECT = "ADD_PROJECT";
export const UPDATE_PROJECT = "UPDATE_PROJECT";
export const UPDATE_OWNER_PROJECT = "UPDATE_OWNER_PROJECT";
export const UPDATE_GROUP_PROJECT = "UPDATE_GROUP_PROJECT";
export const UPDATE_PROJECT_NAME = "UPDATE_PROJECT_NAME";
export const UPDATE_PROJECT_DESCRIPTION = "UPDATE_PROJECT_DESCRIPTION";
export const DELETE_PROJECT = "DELETE_PROJECT";

export const getProjects = () => {
    return (dispatch) => {
        return axios
            .get(`${API_URL}/project`, { headers: AuthService.authHeader() })
            .then((res) => {
                dispatch({ type: GET_PROJECT, payload: res.data });

            })
            .catch((err) => console.log(err));
    };
};

export const getOneProjectsById = (projectId) => {
    return (dispatch) => {
        return axios
            .get(`${API_URL}/project/${projectId}`,{ headers:  AuthService.authHeader() })
            .then((res) => {
                dispatch({ type: GET_PROJECT_BY_ID, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};

export const getProjectsByName = (projectName) => {
    return (dispatch) => {
        return axios
            .get(`${API_URL}/project/name/${projectName}`,{ headers:  AuthService.authHeader() })
            .then((res) => {
                dispatch({ type: GET_PROJECT_BY_NAME, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};

export const getProjectByOwner = (userId) => {
    return (dispatch) => {
        return axios
            .get(`${API_URL}/project/user/${userId}`,{ headers:  AuthService.authHeader() })
            .then((res) => {
                dispatch({ type: GET_PROJECT_BY_OWNER, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};

export const getProjectByGroup = (groupId) => {
    return (dispatch) => {
        return axios
            .get(`${API_URL}/project/group/${groupId}`,{ headers:  AuthService.authHeader() })
            .then((res) => {
                dispatch({ type: GET_PROJECT_BY_GROUP, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};

export const createProject = (data) => {
    return (dispatch) => {
        const init = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${AuthService.getCurrentUser()}`
            },
            data: JSON.stringify(data),
            url: API_URL + '/project/create',
        }
        axios(init).then(response =>{
            //dispatch({ type: ADD_PROJECT, payload: response.data });
            //todo : probleme avec le reducer : TypeError: state is not iterable
            alert("Project created successfully");
            return response.data;
        }).catch(e => {
            alert("missing information");
            console.log(e);
        });
    }
}

export const updateGroupForProject = (projectId,data) => {
    return (dispatch) => {
        return axios
            .patch(`${API_URL}/group/${projectId}`, data, { headers:  AuthService.authHeader() })
            .then(() => {
                dispatch({ type: UPDATE_GROUP_PROJECT, payload: data });
            })
            .catch((err) => console.log(err));
    };
};

export const updateOwnerForProject = (projectId,data) => {
    return (dispatch) => {
        return axios
            .patch(`${API_URL}/owner/${projectId}`, data, { headers:  AuthService.authHeader() })
            .then(() => {
                dispatch({ type: UPDATE_OWNER_PROJECT, payload: data });
            })
            .catch((err) => console.log(err));
    };
};



export const changeProjectName = (projectId,data) => {
    return (dispatch) => {
        return axios
            .patch(`${API_URL}/project/${projectId}/name`, data, { headers:  AuthService.authHeader() })
            .then(() => {
                dispatch({ type: UPDATE_PROJECT_NAME, payload: data });
            })
            .catch((err) => console.log(err));
    };
};

export const changeProjectDescription = (projectId,data) => {
    return (dispatch) => {
        return axios
            .patch(`${API_URL}/project/${projectId}/description`, data, { headers:  AuthService.authHeader() })
            .then(() => {
                dispatch({ type: UPDATE_PROJECT_DESCRIPTION, payload: data });
            })
            .catch((err) => console.log(err));
    };
};



export const deleteProject = (projectId) => {
    return (dispatch) => {
        return axios({
            method: "delete",
            url: `${API_URL}/project/delete/${projectId}`,
            headers:  AuthService.authHeader()

        })
            .then(() => {
                dispatch({ type: DELETE_PROJECT, payload: { projectId } });
            })
            .catch((err) => console.log(err));
    };
};
