const initialState = {
    isLoading: false,
    error: null,
    tasks: []
}

export const tasksReducer = (state = initialState, action) => {
    if (action.type === "LOAD_TASKS") {
        return {
            ...state,
            isLoading: false,
            tasks: action.payload
        }
    }

    if (action.type === "LOADING") {
        return {
            ...state,
            isLoading: true
        }
    }

    if (action.type === "DELETE_SUCCESS") {
        localStorage.setItem("tasks", JSON.stringify(action.payload.tasks));
        return {
            ...state,
            isLoading: false,
            tasks: action.payload.tasks,
        };
    }

    if (action.type === "DELETE_FAILURE") {
        return {
            isLoading: false,
            error: action.payload
        };
    }

    if (action.type === "ADD_TASK_SUCCESS") {
        localStorage.setItem("tasks", JSON.stringify(action.payload.tasks));
        return {
            ...state,
            isLoading: false,
            tasks: action.payload.tasks,
        };
    }

    if (action.type === "ADD_TASK_FAILURE") {
        return {
            isLoading: false,
            error: action.payload
        };
    }

    return state;
};