import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

function SearchBar({ searchTerm, handleSearch }) {
  return (
    <>
      <Navbar className="bg-body-tertiary justify-content-between">
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Search Routes and Destinations"
            aria-label="Route or Destination"
            value={searchTerm}
            onChange={handleSearch}
          />
        </InputGroup>
      </Navbar>  
    </>
  );
}

export default SearchBar;
