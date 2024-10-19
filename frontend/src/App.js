import React from 'react';
import WeatherDisplay from './components/WeatherDisplay';
import AlertForm from './components/AlertForm';
import availableCities from './utils/cities';

const App = () => {
  
  return (
    <div className="App">
      <WeatherDisplay />
      <AlertForm availableCities={availableCities} />
    </div>
  );
};

export default App;
