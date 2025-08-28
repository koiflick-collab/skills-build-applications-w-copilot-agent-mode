import React, { useEffect, useState } from 'react';

const Teams = () => {
    const codespace = process.env.REACT_APP_CODESPACE_NAME;
    const apiUrl = codespace
        ? `https://${codespace}-8000.app.github.dev/api/teams/`
        : 'http://localhost:8000/api/teams/';
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                const results = data.results || data;
                setTeams(results);
                console.log('Teams API endpoint:', apiUrl);
                console.log('Fetched teams:', results);
            });
    }, [apiUrl]);

    return (
        <div>
            <h2>Teams</h2>
            <ul>
                {teams.map((team, idx) => (
                    <li key={idx}>{team.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Teams;
