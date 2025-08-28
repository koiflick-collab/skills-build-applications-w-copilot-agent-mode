import React, { useEffect, useState } from 'react';

const Workouts = () => {
    const codespace = process.env.REACT_APP_CODESPACE_NAME;
    const apiUrl = codespace
        ? `https://${codespace}-8000.app.github.dev/api/workouts/`
        : 'http://localhost:8000/api/workouts/';
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                const results = data.results || data;
                setWorkouts(results);
                console.log('Workouts API endpoint:', apiUrl);
                console.log('Fetched workouts:', results);
            });
    }, [apiUrl]);

    return (
        <div>
            <h2>Workouts</h2>
            <ul>
                {workouts.map((workout, idx) => (
                    <li key={idx}>{workout.name}: {workout.description}</li>
                ))}
            </ul>
        </div>
    );
};

export default Workouts;
