import React, { useState } from 'react';
import styles from './TriggeredAlerts.module.css';

const TriggeredAlerts = () => {
  const [email, setEmail] = useState('');
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetchAlerts = async () => {
    if (!email) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:5000/api/alerts/triggered?email=${encodeURIComponent(email)}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch alerts');
      }

      const data = await response.json();
      setAlerts(data);
    } catch (err) {
      console.error('Error fetching alerts:', err);
      setError('Failed to fetch alerts. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFetchAlerts();
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Fetch Triggered Alerts</h2>
      
      <form onSubmit={handleSubmit} className={styles.searchSection}>
        <input
          type="email"
          className={styles.emailInput}
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button 
          type="submit" 
          className={styles.fetchButton}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Fetch Alerts'}
        </button>
      </form>

      {error && (
        <div className={styles.noAlerts}>
          {error}
        </div>
      )}

      {!error && alerts.length > 0 ? (
        <ul className={styles.alertsList}>
          {alerts.map((alert) => (
            <li key={alert._id} className={styles.alertItem}>
              <div className={styles.alertIcon}>
                ⚠️
              </div>
              <div className={styles.alertContent}>
                <p className={styles.alertMessage}>
                  {alert.message}
                </p>
                <p className={styles.alertCity}>
                  {alert.city}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        !error && !isLoading && (
          <div className={styles.noAlerts}>
            No alerts have been issued.
          </div>
        )
      )}
    </div>
  );
};

export default TriggeredAlerts;