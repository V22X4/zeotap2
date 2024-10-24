import React, { useState, useEffect } from 'react';
import styles from './AlertForm.module.css';

const AlertForm = ({ availableCities }) => {
  const [formData, setFormData] = useState({
    city: '',
    maxTemp: '',
    minTemp: '',
    email: '',
  });
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    console.log(availableCities)
    if (availableCities.length > 0) {
      setFormData((prev) => ({ ...prev, city: availableCities[0] }));
    }
  }, [availableCities]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage({ 
          text: '✅ Alert registered successfully!',
          type: 'success'
        });
        setFormData({ 
          city: availableCities[0], 
          maxTemp: '', 
          minTemp: '', 
          email: '' 
        });
      } else {
        setMessage({ 
          text: '❌ Failed to register alert.',
          type: 'error'
        });
      }
    } catch (error) {
      console.error('Error submitting alert:', error);
      setMessage({ 
        text: '⚠️ Server error. Please try again later.',
        type: 'warning'
      });
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formHeader}>Register Weather Alert</h2>
      <form onSubmit={handleSubmit} className={styles.alertForm}>
        <div className={styles.formGroup}>
          <label>City:</label>
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          >
            {availableCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        
        <div className={styles.formGroup}>
          <label>Max Temperature (°C):</label>
          <input
            type="number"
            name="maxTemp"
            value={formData.maxTemp}
            onChange={handleChange}
            placeholder="Enter maximum temperature"
            required
          />
        </div>
        
        <div className={styles.formGroup}>
          <label>Min Temperature (°C):</label>
          <input
            type="number"
            name="minTemp"
            value={formData.minTemp}
            onChange={handleChange}
            placeholder="Enter minimum temperature"
            required
          />
        </div>
        
        <div className={styles.formGroup}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        
        <button type="submit" className={styles.submitButton}>
          Register Alert
        </button>
      </form>
      
      {message.text && (
        <p 
          className={styles.formMessage} 
          data-type={message.type}
        >
          {message.text}
        </p>
      )}
    </div>
  );
};

export default AlertForm;