import React, { useEffect, useRef, useState } from 'react';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

const WeatherChart = ({ weatherData }) => {
  const chartRef = useRef(null);
  const summaries = weatherData?.summaries || [];

  // Initialize state with all cities selected
  const [selectedCities, setSelectedCities] = useState(
    summaries.map((summary) => summary.city)
  );
  const [chartData, setChartData] = useState(null);
  const [dominantConditions, setDominantConditions] = useState([]);
  const [currentTemps, setCurrentTemps] = useState([]);

  // Handle city selection
  const handleCityChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedCities((prev) => [...prev, value].sort());
    } else {
      setSelectedCities((prev) =>
        prev.filter((city) => city !== value).sort()
      );
    }
  };

  // Prepare chart data whenever selected cities change
  useEffect(() => {
    const filteredSummaries = summaries.filter((data) =>
      selectedCities.includes(data.city)
    );

    // Sort the data alphabetically by city name
    const sortedSummaries = [...filteredSummaries].sort((a, b) =>
      a.city.localeCompare(b.city)
    );

    const cities = sortedSummaries.map((data) => data.city);
    const avgTemps = sortedSummaries.map((data) => data.avgTemp);
    const maxTemps = sortedSummaries.map((data) => data.maxTemp);
    const minTemps = sortedSummaries.map((data) => data.minTemp);
    const conditions = sortedSummaries.map((data) => data.dominantCondition);
    const latestCurrentTemps = sortedSummaries.map((data) => data.currentTemp);

    const data = {
      labels: cities,
      datasets: [
        {
          label: 'Average Temperature (last) (°C)',
          data: avgTemps,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
          tension: 0.4,
        },
        {
          label: 'Max Temperature (°C)',
          data: maxTemps,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          fill: true,
          tension: 0.4,
        },
        {
          label: 'Min Temperature (°C)',
          data: minTemps,
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          fill: true,
          tension: 0.4,
        },
      ],
    };

    setChartData(data);
    setDominantConditions(conditions);
    setCurrentTemps(latestCurrentTemps);
  }, [selectedCities]);

  return (
    <div>

       {/* Dominant Conditions */}
       {selectedCities.length > 0 && (
        <>
          <h3>Dominant Weather Conditions</h3>
          <ul>
            {dominantConditions.map((condition, index) => (
              <li key={index}>
                <strong>{selectedCities[index]}:</strong> {condition} | Current Temp: {currentTemps[index]}°C
              </li>
            ))}
          </ul>
        </>
      )}
      
      <h2>Weather Summary</h2>

      {/* City Selection */}
      <div style={{ marginBottom: '1rem' }}>
        <h3>Select Cities</h3>
        {summaries
          .sort((a, b) => a.city.localeCompare(b.city))
          .map((summary) => (
            <div key={summary.city}>
              <input
                type="checkbox"
                value={summary.city}
                onChange={handleCityChange}
                checked={selectedCities.includes(summary.city)}
              />
              <label>{summary.city}</label>
            </div>
          ))}
      </div>

      {/* Chart */}
      {chartData ? (
        <Line ref={chartRef} data={chartData} />
      ) : (
        <p>Please select cities to display the chart.</p>
      )}

     
    </div>
  );
};

export default WeatherChart;
