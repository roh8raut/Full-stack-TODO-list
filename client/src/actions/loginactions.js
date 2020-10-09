import { login, signup } from '../services/service';

export function changeTab(newValue) {
    return {
        type: "CHANGE_TAB",
        payload: newValue,
    };
}

export const loading = () => {
    return {
        type: "LOADING"
    }
}

export const loginSuccess = (newValue) => {
    return {
        type: "LOGIN_SUCCESS",
        payload: newValue
    }
}

export const loginFailure = (newValue) => {
    return {
        type: "LOGIN_FAILURE",
        payload: newValue
    }
}

export const signUpSuccess = (newValue) => {
    return {
        type: "SIGNUP_SUCCESS",
        payload: newValue
    }
}

export const signUpFailure = (newValue) => {
    return {
        type: "SIGNUP_FAILURE",
        payload: newValue
    }
}

export const doLogin = ({ email, password }) => {
    return function (dispatch) {
        dispatch(loading())
        login(email, password)
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                return res.json().then(text => { throw text })
            })
            .then((data) => dispatch(loginSuccess(data)))
            .catch((err) => {
                dispatch(loginFailure(err))
            })
    }
}

export const doSignUp = ({ name, email, password }) => {
    return function (dispatch) {
        dispatch(loading())
        signup(name, email, password)
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                return res.json().then(text => { throw text })
            })
            .then((data) => dispatch(signUpSuccess(data)))
            .catch((err) => {
                dispatch(signUpFailure(err))
            })
    }
}