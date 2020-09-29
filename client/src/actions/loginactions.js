import { login } from '../services/service';

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
    console.log(newValue)
    return {
        type: "LOGIN_FAILURE",
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
                console.log(err);
                dispatch(loginFailure(err))
            })
    }
}