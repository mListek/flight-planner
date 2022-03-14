import React, { useState } from 'react'
import "./styles.css";

const airports: string[] = [
  'ATH', 'BSL', 'BFS', 'BLQ',
  'BTS', 'BRS', 'CRL', 'BUD',
  'DUB', 'EDI', 'EIN', 'GLA',
  'HAM', 'CTA', 'KEF', 'CGN',
  'SUF', 'LCA', 'LPL', 'LIS',
  'LTN', 'STN', 'MAD'];

const connections: [string, string][] = [
  ['ATH','EDI'], ['ATH','GLA'], ['ATH','CTA'],
  ['BFS','CGN'], ['BFS','LTN'], ['BFS','CTA'],
  ['BTS','STN'], ['BTS','BLQ'], ['CRL','BLQ'],
  ['CRL','BSL'], ['CRL','LTN'], ['DUB','LCA'],
  ['LTN','DUB'], ['LTN','MAD'], ['LCA','HAM'],
  ['EIN','BUD'], ['EIN','MAD'], ['HAM','BRS'],
  ['KEF','LPL'], ['KEF','CGN'], ['SUF','LIS'],
  ['SUF','BUD'], ['SUF','STN'], ['STN','EIN'],
  ['STN','HAM'], ['STN','DUB'], ['STN','KEF']
]

const adjacencyList = new Map();

interface Props {
  startAirport: string;
  endAirport: string;
}

const DisplayRoute: React.FC<Props> = ({startAirport, endAirport}) => {
  const [bestRoute, setBestRoute] = useState([]);

  const addNode = (airport: string) => {
    adjacencyList.set(airport, []);
  }

  const addEdge = (origin: string, destination: string) => {
    adjacencyList.get(origin).push(destination);
    adjacencyList.get(destination).push(origin);
  }

  const bfs = (start: string, finish: string): string[] => {
    const queue = [start];
    const predecessor = [];
    const visited = new Set();
    
    // loop until route has been found or all connections were checked
    while (queue.length > 0) {
      // remove first item from the queue
      let airport = queue.shift();
      // get all connected airports
      const destinations = adjacencyList.get(airport);

      for (const destination of destinations) {

        if (destination === finish) {

          // recreate the path from the finish to the start
          const path = [destination];
          while (airport !== start) {
            path.push(airport);
            airport = predecessor[airport];
          }
          path.push(airport);
          path.reverse();

          // returns all the conn
          return path;
        }

        // mark visited airports
        if (!visited.has(destination)) {
          visited.add(destination);
          queue.push(destination);
          predecessor[destination] = airport;
        }
      }
    }
  }

  const handleClick = () => {
    // add airports and connections to the adjacencyList
    airports.forEach(addNode);
    connections.forEach(conn => addEdge(...conn));

    const path = bfs(startAirport, endAirport);
    setBestRoute(path);
  }
  
  return <div className='display'>
    
    {(startAirport === "" || endAirport === "") ? (
      <p className="warning">Please choose both airports to see the optimal route...</p>
    ) : startAirport === endAirport ? (
      <p className="warning">Airports can't be the same! Please choose another one.</p>
    ) : (
      <div className='display-route'>
        <button className="button" onClick={handleClick}>Press to find the route</button>
        <p className="warning">To get to your destination you have to fly through theese airports:</p>
        <ul className="result-list">
          {bestRoute.map((part) => <li className="item" key={part}>{part}</li>)}
        </ul>
      </div>
    )}
  </div>
};

export default DisplayRoute;