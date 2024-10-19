import React, { useState, useEffect } from 'react';


const AlertForm = ({ availableCities }) => {
  const [formData, setFormData] = useState({
    city: '',
    maxTemp: '',
    minTemp: '',
    email: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Automatically set the first city as the default value if available
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
        setMessage('✅ Alert registered successfully!');
        setFormData({ city: availableCities[0], maxTemp: '', minTemp: '', email: '' });
      } else {
        setMessage('❌ Failed to register alert.');
      }
    } catch (error) {
      console.error('Error submitting alert:', error);
      setMessage('⚠️ Server error. Please try again later.');
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-header">Register Weather Alert</h2>
      <form onSubmit={handleSubmit} className="alert-form">
        <div className="form-group">
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
        <div className="form-group">
          <label>Max Temperature (°C):</label>
          <input
            type="number"
            name="maxTemp"
            value={formData.maxTemp}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Min Temperature (°C):</label>
          <input
            type="number"
            name="minTemp"
            value={formData.minTemp}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Register Alert
        </button>
      </form>
      {message && <p className="form-message">{message}</p>}
    </div>
  );
};

export default AlertForm;
