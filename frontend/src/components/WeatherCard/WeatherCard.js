import React from 'react';
import { Cloud, Droplets, Sun, CloudRain } from 'lucide-react';
import styles from './WeatherCard.module.css'; // Import CSS module

const WeatherIcon = ({ condition }) => {
  switch (condition?.toLowerCase()) {
    case 'clear':
      return <Sun className={`${styles.icon} ${styles.sun}`} />;
    case 'clouds':
      return <Cloud className={`${styles.icon} ${styles.cloud}`} />;
    case 'rain':
      return <CloudRain className={`${styles.icon} ${styles.rain}`} />;
    default:
      return <Cloud className={`${styles.icon} ${styles.cloud}`} />;
  }
};

export const WeatherCard = ({ data }) => {
  const unitSymbol = '°C';

  // Function to format the date into a more readable format
  const formatDate = (isoDate) => {
    if (!isoDate) return 'No data';
    const date = new Date(isoDate);
    return date.toLocaleString(undefined, {
      weekday: 'long', // e.g., "Thursday"
      year: 'numeric',
      month: 'long',   // e.g., "October"
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={styles.weatherCard}>
      <div className={styles.header}>
        <h3 className={styles.cityName}>{data.city}</h3>
        <WeatherIcon condition={data.main_condition} />
      </div>
      <p className={styles.temperature}>
        {data.temperature != null ? `${data.temperature.toFixed(1)}${unitSymbol}` : 'No data'}
      </p>
      <div className={styles.weatherDetails}>
        <p className={styles.condition}>
          Feels like: {data.feels_like != null ? `${data.feels_like.toFixed(1)}${unitSymbol}` : 'No data'}
        </p>
        <p className={styles.condition}>
          Condition: {data.main_condition ? data.main_condition : 'No data'}
        </p>
        <p className={styles.condition}>
          {formatDate(data.date)}
        </p>
      </div>
    </div>
  );
};

