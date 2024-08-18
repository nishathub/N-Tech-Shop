const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectDB } = require("./config/db");
const brandRoutes = require("./routes/brandRoutes");

const app = express();
const port = process.env.PORT || 5000;

// Use CORS middleware
app.use(cors());
app.use(express.json());

// Handle preflight requests
// app.options('*', cors());

async function startServer() {
  try {
    await connectDB();

    app.use("/", brandRoutes);

    app.get("/", (req, res) => {
      res.send("Brand server is running");
    });

    app.listen(port, () => {
      console.log(`Brand server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
}

startServer();
