const initialState = {
    isLoading: false,
    isAuthUser: !!localStorage.getItem("token"),
    responseObj: {}
}

export const authReducer = (state = initialState, action) => {
    if (action.type === "CHANGE_TAB") {
        return {
            state: initialState
        }
    }

    if (action.type === "LOADING") {
        return {
            ...state,
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
        };
    }

    if (action.type === "LOGIN_FAILURE") {
        return {
            isLoading: false,
            responseObj: action.payload
        };
    }

    if (action.type === "SIGNUP_SUCCESS") {
        return {
            isLoading: false,
            responseObj: action.payload
        };
    }

    if (action.type === "SIGNUP_FAILURE") {
        console.log("singupfailed", action.payload)
        return {
            isLoading: false,
            responseObj: action.payload
        };
    }

    if (action.type === "LOGOUT") {
        localStorage.removeItem("token");
        localStorage.removeItem("tasks");
        return {
            isAuthUser: false
        };
    }
    return state;
};

export const authMessageSelector = (state) => {
    const responseObj = state.authReducer.responseObj;
    console.log("resPonseObj", responseObj);
    return (responseObj && responseObj.msg) ? responseObj.msg : undefined;
}