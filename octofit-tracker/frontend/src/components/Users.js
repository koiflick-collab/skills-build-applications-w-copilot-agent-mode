import React, { useEffect, useState } from 'react';

const Users = () => {
    const codespace = process.env.REACT_APP_CODESPACE_NAME;
    const apiUrl = codespace
        ? `https://${codespace}-8000.app.github.dev/api/users/`
        : 'http://localhost:8000/api/users/';
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                const results = data.results || data;
                setUsers(results);
                console.log('Users API endpoint:', apiUrl);
                console.log('Fetched users:', results);
            });
    }, [apiUrl]);

    return (
        <div>
            <h2>Users</h2>
            <ul>
                {users.map((user, idx) => (
                    <li key={idx}>{user.username} ({user.email})</li>
                ))}
            </ul>
        </div>
    );
};

export default Users;
