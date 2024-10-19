import React, { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary components
ChartJS.register(LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend);

const WeatherChart = ({ weatherData }) => {
  const chartRef = useRef();

  useEffect(() => {
    // Cleanup on component unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  // Avoid rendering chart until we have weather data
  if (!weatherData || weatherData.length === 0) {
    return <div>Loading...</div>; // or any loading indicator
  }

  const chartData = {
    labels: weatherData.map(entry => entry.city),
    datasets: [
      {
        label: 'Average Temperature (°C)',
        data: weatherData.map(entry => entry.avgTemp),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Max Temperature (°C)',
        data: weatherData.map(entry => entry.maxTemp),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Min Temperature (°C)',
        data: weatherData.map(entry => entry.minTemp),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div>
      <h2>Weather Data Visualization</h2>
      <div style={{ height: '400px' }}>
        <Bar ref={chartRef} data={chartData} options={options} />
      </div>
    </div>
  );
};

export default WeatherChart;
