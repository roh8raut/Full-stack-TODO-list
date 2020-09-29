const url = `https://todo-sable.vercel.app`;
// const url = `https://todo.roh8raut.vercel.app`;
// const url = `http://localhost:5000`

export function login(email, password) {
    return fetch(`${url}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
}