import React from 'react';
import WeatherDisplay from './components/WeatherDisplay';
import AlertForm from './components/AlertForm';
import availableCities from './utils/cities';
import TriggeredAlerts from './components/TriggeredAlerts';

const App = () => {
  
  return (
    <div className="App">
      <WeatherDisplay />
      <AlertForm availableCities={availableCities} />
      <TriggeredAlerts />
    </div>
  );
};

export default App;
