import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Define icons for different vehicle types
const icons = {
  'vehicle-suburban-railway': L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/4886/4886431.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  }),
  'bus': L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/1023/1023362.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  }),
  'tram': L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/15474/15474914.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  }),
  'trolleybus': L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3231/3231936.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  }),
  // Add more mappings as needed
};

function VehicleMap({ vehicles, SearchResults, isVisible }) {
  const mapTilerApiKey = process.env.REACT_APP_MAPTILER_API_KEY; 

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          height: '90vh',
          width: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      >
        <MapContainer
          center={[47.483944, 19.105474]} // Default center of the map
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url={`https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=${mapTilerApiKey}`}
            attribution='&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a> contributors'
          />
          {vehicles.length > 0 ? (
            vehicles.map((vehicle) => (
              <Marker
                key={vehicle.vehicleId}
                position={[vehicle.location.lat, vehicle.location.lon]}
                icon={icons[vehicle.style.icon.name] || L.icon({
                  iconUrl: 'https://cdn-icons-png.flaticon.com/512/1237/1237912.png', // Default icon
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                  popupAnchor: [1, -34],
                })}
              >
                <Popup>
                  <b>License Plate:</b> {vehicle.licensePlate} <br />
                  <b>Model:</b> {vehicle.model} <br />
                  <b>Status:</b> {vehicle.status} <br />
                  <b>Route:</b> {vehicle.routeId}
                </Popup>
              </Marker>
            ))
          ) : (
            null
          )}
        </MapContainer>
      </div>

      {/* Conditionally render the Row and Col */}
      {isVisible && SearchResults &&(
        <Row className="justify-content-center">
          <Col
            sm={12}
            md={6}
            style={{
              position: 'absolute',
              overflowY: 'auto',
              top: '1px',
              height: '200px',
              zIndex: 10001,
            }}
          >
            {SearchResults}
          </Col>
        </Row>
      )}
    </div>
  );
}

export default VehicleMap;
