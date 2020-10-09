import { deleteTask, addTask } from '../services/service';
import { loading } from '../actions/loginactions';

export const deleteSuccess = (data) => {
    return {
        type: "DELETE_SUCCESS",
        payload: data
    }
}

export const deleteFailure = (data) => {
    return {
        type: "DELETE_FAILURE",
        payload: data
    }
}

export const addTaskSuccess = (data) => {
    return {
        type: "ADD_TASK_SUCCESS",
        payload: data
    }
}

export const addTaskFailure = (data) => {
    return {
        type: "ADD_TASK_FAILURE",
        payload: data
    }
}

export const logOutUser = () => {
    return {
        type: "LOGOUT"
    }
}

export const loadTasksFromStorage = () => {
    const tasks = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];
    return (dispatch) => {
        if (tasks) {
            dispatch({ type: "LOAD_TASKS", payload: tasks })
        }
    }
}

export const removeUserTask = (id) => {
    return function (dispatch) {
        deleteTask(id)
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                return res.json().then(text => { throw text })
            })
            .then((data) => dispatch(deleteSuccess(data)))
            .catch((err) => (err.msg && err.msg === "Invalid token") ? dispatch(logOutUser()) : dispatch(deleteFailure(err)))
    }
}

export const addUserTask = (task) => {
    return function (dispatch) {
        dispatch(loading())
        addTask(task)
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                return res.json().then(text => { throw text })
            })
            .then((data) => dispatch(addTaskSuccess(data)))
            .catch((err) => (err.msg && err.msg === "Invalid token") ? dispatch(logOutUser()) : dispatch(addTaskFailure(err)))
    }
}