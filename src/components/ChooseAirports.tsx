import React from 'react';
import Select from 'react-select';
import "./styles.css";

const airports = [
  { value: 'ATH', label: 'ATH' },
  { value: 'BSL', label: 'BSL' },
  { value: 'BFS', label: 'BFS' },
  { value: 'BLQ', label: 'BLQ' },
  { value: 'BTS', label: 'BTS' },
  { value: 'BRS', label: 'BRS' },
  { value: 'CRL', label: 'CRL' },
  { value: 'BUD', label: 'BUD' },
  { value: 'DUB', label: 'DUB' },
  { value: 'EDI', label: 'EDI' },
  { value: 'EIN', label: 'EIN' },
  { value: 'GLA', label: 'GLA' },
  { value: 'HAM', label: 'HAM' },
  { value: 'CTA', label: 'CTA' },
  { value: 'KEF', label: 'KEF' },
  { value: 'CGN', label: 'CGN' },
  { value: 'SUF', label: 'SUF' },
  { value: 'LCA', label: 'LCA' },
  { value: 'LPL', label: 'LPL' },
  { value: 'LIS', label: 'LIS' },
  { value: 'LTN', label: 'LTN' },
  { value: 'STN', label: 'STN' },
  { value: 'MAD', label: 'MAD' },
]

interface Props {
  startAirport: string;
  endAirport: string;
  setStartAirport(e);
  setEndAirport(e);
}

const ChooseAirports: React.FC<Props> = ({startAirport, endAirport, setStartAirport, setEndAirport}) => {

  const handleStartChange = (e) => {
    // save only the value
    setStartAirport(e.value);
  }
  const handleEndChange = (e) => {
    // save only the value
    setEndAirport(e.value);
  }

  return <div className='choiceComponent'>
    <div className='startAirport'>
      <h4 className="instruction-text">
        1. Select the first airport:
      </h4>
      <Select
        placeholder="Choose an airport..."
        value={airports.filter(obj => obj.value === startAirport)}
        options={airports}
        onChange={handleStartChange}
      />
    </div>
    <div className='endAirport'>
      <h4 className="instruction-text">
        2. Select the second airport:
      </h4>
      <Select
        placeholder="Choose an airport..."
        value={airports.filter(obj => obj.value === endAirport)}
        options={airports}
        onChange={handleEndChange}
      />
    </div>
  </div>
}

export default ChooseAirports;