const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectDB } = require('./config/db'); // the import of one element out of many from another file should be inside a {curly brace}
const brandRoutes = require('./routes/brandRoutes');

const app = express(); // initialize express
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

async function startServer() {
  try {
    await connectDB(); // Wait for the DB connection to be established with database

    // Middleware to use brand routes
    app.use('/brand', brandRoutes);
    
    // Routes
    app.get('/', (req, res) => {
      res.send('Brand server is running');
    });

    app.listen(port, () => {
      console.log(`Brand server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server', error);
    process.exit(1);
  }
}

startServer();
