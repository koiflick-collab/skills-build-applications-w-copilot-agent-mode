import React, { useEffect, useState } from 'react';

const Activities = () => {
    const codespace = process.env.REACT_APP_CODESPACE_NAME;
    const apiUrl = codespace
        ? `https://${codespace}-8000.app.github.dev/api/activities/`
        : 'http://localhost:8000/api/activities/';
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                const results = data.results || data;
                setActivities(results);
                console.log('Activities API endpoint:', apiUrl);
                console.log('Fetched activities:', results);
            });
    }, [apiUrl]);

    return (
        <div>
            <h2>Activities</h2>
            <ul>
                {activities.map((activity, idx) => (
                    <li key={idx}>{activity.user} - {activity.type} ({activity.duration} min, {activity.team})</li>
                ))}
            </ul>
        </div>
    );
};

export default Activities;
