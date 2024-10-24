// Alerts.jsx
import React from 'react';
import AlertForm from '../AlertForm/AlertForm';
import TriggeredAlerts from '../TriggeredAlerts/TriggeredAlerts';
import availableCities from "../../utils/cities";
import styles from './Alerts.module.css';

const Alerts = () => {
    return (
        <div className={styles.alertsContainer}>
            <AlertForm availableCities={availableCities} />
            <TriggeredAlerts />
        </div>
    );
};

export default Alerts;