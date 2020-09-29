const initialState = {
    isLoading: false,
    error: null,
    isAuthUser: !!localStorage.getItem("token"),
    tasks: localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : []
}

export const authReducer = (state = initialState, action) => {
    if (action.type === "LOADING") {
        return {
            isLoading: true
        }
    }

    if (action.type === "LOGIN_SUCCESS") {
        localStorage.setItem("token", JSON.stringify(action.payload.token));
        localStorage.setItem("tasks", JSON.stringify(action.payload.tasks));
        return {
            ...state,
            isLoading: false,
            isAuthUser: true,
            tasks: action.payload.tasks,
        };
    }

    if (action.type === "LOGIN_FAILURE") {
        return {
            isLoading: false,
            error: action.payload
        };
    }
    return state;
};