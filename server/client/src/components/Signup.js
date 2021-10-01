import React from 'react'
import { useState } from 'react';

export default function Signup() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = e => {

    }
    return (
        <div>
            <h3>Sign up</h3>
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
                <button type="submit">Sign Up ✍️</button>
                {message && (
                    <h3>{message}</h3>
                )}
            </form>
        </div>
    )
}
