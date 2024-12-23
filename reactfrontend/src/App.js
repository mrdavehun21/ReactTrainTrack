import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import SearchBar from './components/SearchBar';
import RouteList from './components/RouteList';
import VehicleMap from './components/VehicleMap';
import ComponentPlacer from './components/ComponentPlacer';

function App() {
  const [routes, setRoutes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [isVisible, setIsVisible] = useState(true); // State to control visibility

  useEffect(() => {
    // Fetch route data from the backend
    axios
      .get('api/routes')
      .then((response) => {
        setRoutes(response.data);
        setFilteredRoutes(response.data); // Initialize filtered routes
      })
      .catch((error) => console.error('Error fetching routes:', error));
  }, []);

  // Handle search
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Filter routes based on the search term
    const filtered = routes.filter((route) =>
      route.lineNumber.toLowerCase().includes(term) || route.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredRoutes(filtered);

    // Make search results visible when typing
    setIsVisible(true);
  };

  const fetchVehicles = (routeID) => {
    axios
      .post('api/vehicles', { routeID })
      .then((response) => {
        setVehicles(response.data.data.list); // Access the list of vehicles from response.data.data.list
        setIsVisible(false); // Hide search results after selecting a route
      })
      .catch((error) => {
        console.error('Error fetching vehicles:', error);
      });
  };

  const searchResults =
    searchTerm.length > 0 ? (
      <RouteList
        filteredRoutes={filteredRoutes}
        fetchVehicles={fetchVehicles}
        setIsVisible={setIsVisible} // Pass setIsVisible to RouteList
      />
    ) : null;

  return (
    <ComponentPlacer
      SearchBar={<SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />}
      VehicleMap={<VehicleMap vehicles={vehicles} SearchResults={searchResults} isVisible={isVisible} />}
    />
  );
}

export default App;
