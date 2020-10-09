const url = process.env.REACT_APP_BACKEND

const getToken = () => {
    return JSON.parse(localStorage.getItem("token"));
}


export function signup(name, email, password) {
    const body = { name, email, password };
    return fetch(`${url}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
}

export function login(email, password) {
    const body = { email, password }
    return fetch(`${url}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
}

export function deleteTask(id) {

    return fetch(`${url}/removetask`, {
        method: 'DELETE',
        headers: {
            'Content-Type': "application/json",
            '_id': id,
            'Authorization': `Bearer ${getToken()}`
        }
    })
}

export function addTask(task) {
    return fetch(`${url}/addtask`, {
        method: 'POST',
        headers: {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(task)
    })
}