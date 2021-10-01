import React from 'react'
import { useState } from 'react'
import service from '../api/service';

export default function Login(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        console.log(username, password)

        service.login(username, password)
            .then(response => {
                console.log(response);
                if (response.message) {
                    setMessage(response.message)
                    setUsername('')
                    setPassword('')
                } else {
                    props.setUser(response);
                    props.history.push('/')
                }
            })

    }
    return (
        <div>
            <h3>Log in</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username: </label>
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <label htmlFor="password">Password: </label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button type="submit">Log in✍️</button>
                {message && (
                    <h3>{message}</h3>
                )}
            </form>
        </div>
    )
}
