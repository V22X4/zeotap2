import React, { useEffect, useRef, useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { WeatherCard } from "../WeatherCard/WeatherCard";
import styles from "./WeatherChart.module.css";

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
  const [selectedCities, setSelectedCities] = useState(
    summaries.map((summary) => summary.city)
  );
  const [chartData, setChartData] = useState(null);
  const [dominantConditions, setDominantConditions] = useState([]);
  const [currentTemps, setCurrentTemps] = useState([]);
  const [feels_like, setFeelsLike] = useState([]);
  const [date, setDate] = useState([]);

  const handleCityChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedCities((prev) => [...prev, value].sort());
    } else {
      setSelectedCities((prev) => prev.filter((city) => city !== value).sort());
    }
  };

  useEffect(() => {
    const filteredSummaries = summaries
      .filter((data) => selectedCities.includes(data.city))
      .sort((a, b) => a.city.localeCompare(b.city));

    const cities = filteredSummaries.map((data) => data.city);
    const avgTemps = filteredSummaries.map((data) => data.avgTemp);
    const maxTemps = filteredSummaries.map((data) => data.maxTemp);
    const minTemps = filteredSummaries.map((data) => data.minTemp);
    const conditions = filteredSummaries.map((data) => data.dominantCondition);
    const latestCurrentTemps = filteredSummaries.map((data) => data.currentTemp);
    const latestFeelsLike = filteredSummaries.map((data) => data.feels_like);
    const latestDate = filteredSummaries.map((data) => data.date);

    const data = {
      labels: cities,
      datasets: [
        {
          label: "Average Temperature (°C)",
          data: avgTemps,
          borderColor: "rgb(99, 102, 241)",
          backgroundColor: "rgba(99, 102, 241, 0.1)",
          fill: true,
          tension: 0.4,
        },
        {
          label: "Max Temperature (°C)",
          data: maxTemps,
          borderColor: "rgb(239, 68, 68)",
          backgroundColor: "rgba(239, 68, 68, 0.1)",
          fill: true,
          tension: 0.4,
        },
        {
          label: "Min Temperature (°C)",
          data: minTemps,
          borderColor: "rgb(59, 130, 246)",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          fill: true,
          tension: 0.4,
        },
      ],
    };

    setChartData(data);
    setDominantConditions(conditions);
    setCurrentTemps(latestCurrentTemps);
    setFeelsLike(latestFeelsLike);
    setDate(latestDate);
  }, [selectedCities]);

  return (
    <div className={styles.container}>
      {selectedCities.length > 0 && (
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Current Weather Conditions</h2>
          </div>
          <div className={styles.gridContainer}>
            {dominantConditions.map((condition, index) => (
              <WeatherCard
                key={selectedCities[index]}
                data={{
                  city: selectedCities[index],
                  main_condition: dominantConditions[index],
                  temperature: currentTemps[index],
                  feels_like: feels_like[index],
                  date: date[index],
                }}
              />
            ))}
          </div>
        </div>
      )}

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Temperature Trends</h2>
        </div>
        
        <div className={styles.citySelection}>
          {/* <h3>Select Cities</h3> */}
          <div className={styles.checkboxGrid}>
            {summaries
              .sort((a, b) => a.city.localeCompare(b.city))
              .map((summary) => (
                <div key={summary.city} className={styles.checkboxWrapper}>
                  <input
                    type="checkbox"
                    id={summary.city}
                    className={styles.checkbox}
                    value={summary.city}
                    onChange={handleCityChange}
                    checked={selectedCities.includes(summary.city)}
                  />
                  <label
                    htmlFor={summary.city}
                    className={styles.checkboxLabel}
                  >
                    {summary.city}
                  </label>
                </div>
              ))}
          </div>
        </div>

        <div className={styles.chartWrapper}>
          {chartData ? (
            <Line
              ref={chartRef}
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "top",
                  },
                },
                scales: {
                  y: {
                    beginAtZero: false,
                    grid: {
                      color: "rgba(0, 0, 0, 0.1)",
                    },
                  },
                  x: {
                    grid: {
                      display: false,
                    },
                  },
                },
              }}
            />
          ) : (
            <div className={styles.emptyState}>
              Please select cities to display the chart.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherChart;