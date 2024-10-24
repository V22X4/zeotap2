# Weather Monitoring System

The **Weather Monitoring System** is a full-stack application designed to fetch, store, and monitor weather data for selected cities, including features to set and trigger alerts when temperature thresholds are crossed. The system also provides a historical weather report for the past month.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Features](#features)
- [Backend](#backend)
- [Frontend](#frontend)
- [Database](#database)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)

## Technologies Used

- **Frontend**: React
- **Backend**: Express
- **Database**: Mongodb
- **Containerization**: Docker
- **Weather API**: OpenWeather API

## Features

- Real-time weather monitoring for selected cities.
- Store weather data periodically and trigger alerts based on set temperature thresholds.
- View the historical weather data of the last 30 days for a city.
- Unit selection for temperature display (Celsius/Fahrenheit).
- Threshold-based alerts.

## Backend

The backend is built with **Expressjs**, responsible for fetching weather data from the OpenWeather API, storing it in mongodb, and providing the logic for alerts and historical data retrieval. It runs on port **5000** and handles API endpoints for city weather, threshold settings, and historical data.

The entry point for the backend is `server.js` in the ./backend folder, and it uses the command:
```bash
node server.js
```

## Frontend

The frontend is built using **React** and is located in the `weather-frontend` directory. It provides a user-friendly interface to display current weather, set alerts, view weather history, and switch between temperature units. The frontend runs on port **3000** and is started using:
```bash
npm start
```

## Database

The project uses **mongodb** as the database to store weather data and alert thresholds. Weather data is periodically fetched from the OpenWeather API and stored in the database for analysis and history display.

## Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/V22X4/zeotap2.git
cd zeotap2
```

2. Ensure you have **Docker** installed.

3. Build the Docker containers:

```bash
docker-compose build
```

4. Run the containers:

```bash
docker-compose up
```

## Running the Application

- The **backend** will be available at: `http://localhost:5000`
- The **frontend** will be available at: `http://localhost:3000`

You can access the frontend to interact with the weather monitoring system, set thresholds, and view the weather history.

