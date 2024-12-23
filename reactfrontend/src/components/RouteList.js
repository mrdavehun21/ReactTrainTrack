import ListGroup from 'react-bootstrap/ListGroup';

function RouteList({ filteredRoutes, fetchVehicles, setIsVisible }) {
  return (
    <div>
      <ListGroup>
        {filteredRoutes.map((route) => (
          <ListGroup.Item
            key={route.routeID}
            action
            onClick={() => {
              fetchVehicles(route.routeID);
              setIsVisible(false); // Hide the search results box
            }}
          >
            {route.lineNumber} - {route.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default RouteList;
