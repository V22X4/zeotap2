import React, { useState } from 'react';

const TriggeredAlerts = () => {
  const [email, setEmail] = useState('');
  const [alerts, setAlerts] = useState([]);

  const handleFetchAlerts = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/alerts/triggered?email=${email}`);
      const data = await response.json();
      setAlerts(data);
    } catch (err) {
      console.error('Error fetching alerts:', err);
    }
  };

  return (
    <div className="triggered-alerts">
      <h2>Fetch Triggered Alerts</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleFetchAlerts}>Fetch Alerts</button>

      <ul>
      {alerts.length > 0 ? (
        alerts.map((alert) => (
          <li key={alert._id}>
            {alert.message} (City: {alert.city})
          </li>
        ))
      ) : (
        <p>No alerts have been issued.</p>
      )}
      </ul>
    </div>
  );
};

export default TriggeredAlerts;
