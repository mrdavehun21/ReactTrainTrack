const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');
require('dotenv').config();

app.use(cors()); // Allow requests from other origins
app.use(express.json());
app.use(express.static(path.join(__dirname, '../reactfrontend/build')));

// Import the JSON file
const routeData = require('./routeIDs.json');
// Routes
// Fetch vehicles for a specific route
app.post('/api/vehicles', async (req, res) => {
  const { routeID } = req.body;

  if (!routeID) {
    return res.status(400).json({ error: 'routeID is required' });
  }

  try {
    const response = await axios.get(
      'https://futar.bkk.hu/api/query/v1/ws/otp/api/where/vehicles-for-route',
      {
        params: {
          routeId: `BKK_${routeID}`,
          related: false,
          version: 4,
          includeReferences: true,
          key: process.env.API_KEY,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching vehicles from BKK API:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch vehicles' });
  }
});

// Fetch route data
app.get('/api/routes', (req, res) => {
  res.json(routeData);
});

// Catch-all route for serving React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../reactfrontend/build', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});