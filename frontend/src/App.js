import React from "react";
import WeatherDisplay from "./components/WeatherDisplay/WeatherDisplay";
import Alerts from "./components/Alerts/Alerts";

const App = () => {
  return (
    <div className="App">
      <WeatherDisplay />
      <Alerts />
    </div>
  );
};

export default App;
