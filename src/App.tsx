import React, { useState } from 'react';
import './App.css';
import ChooseAirports from './components/ChooseAirports';
import DisplayRoute from './components/DisplayRoute';


const App: React.FC = () => {
  const [startAirport, setStartAirport] = useState<string>("");
  const [endAirport, setEndAirport] = useState<string>("");

  return (
    <div className="App">
      <h1 className="header">Flight Route Planner</h1>
      <h3 className="subheader">Find the best connection between two given airports</h3>
      <ChooseAirports startAirport={startAirport} endAirport={endAirport} setStartAirport={setStartAirport} setEndAirport={setEndAirport} />
      <DisplayRoute startAirport={startAirport} endAirport={endAirport} />
    </div>
  );
};

export default App;
