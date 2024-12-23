import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ComponentPlacer({ SearchBar, VehicleMap }){
    return(
        <>
            <Container fluid>
                <Row className="justify-content-center">
                    <Col sm={12} md={6}>
                    { SearchBar }
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xs lg="11">{ VehicleMap }</Col>
                </Row>
            </Container>
        </>
    );
}

export default ComponentPlacer;
