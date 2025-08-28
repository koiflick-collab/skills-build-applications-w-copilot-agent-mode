import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
    const codespace = process.env.REACT_APP_CODESPACE_NAME;
    const apiUrl = codespace
        ? `https://${codespace}-8000.app.github.dev/api/leaderboard/`
        : 'http://localhost:8000/api/leaderboard/';
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                const results = data.results || data;
                setLeaderboard(results);
                console.log('Leaderboard API endpoint:', apiUrl);
                console.log('Fetched leaderboard:', results);
            });
    }, [apiUrl]);

    return (
        <div>
            <h2>Leaderboard</h2>
            <ul>
                {leaderboard.map((entry, idx) => (
                    <li key={idx}>{entry.team}: {entry.points} points</li>
                ))}
            </ul>
        </div>
    );
};

export default Leaderboard;
