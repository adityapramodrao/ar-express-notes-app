// Import core dependencies
const express = require("express");                  // Express framework
const cors = require("cors");                        // CORS middleware to handle cross-origin requests
require('dotenv').config();                          // Load environment variables from .env file

const authenticateToken = require("./utilities.js")
// Import internal modules
const config = require("./config.json");             // Custom config file (optional usage)
const mongoose = require("mongoose");                // MongoDB ODM (Object Data Modeling)
const Authrouter = require('./routes/Authrouter.js') // Authentication routes
const { PORT, mongoDBURL } = require('./config.js'); // Extracting port and MongoDB URL from config
const NotesRouter = require("./routes/notesCrudRouter.js");


// Initialize express app
const app = express();

// Middleware to parse incoming JSON data
app.use(express.json());

// Middleware to parse URL-encoded data (form submissions, etc.)
app.use(express.urlencoded({ extended: true }));

// Enable CORS for all origins (*). You can limit this to a specific origin if needed.
app.use(cors({ origin: "*" }));

// Register routes: All Auth routes will be accessible under `/app` prefix
app.use('/app', Authrouter);

app.use('/notes', NotesRouter);


// Simple test route
app.get('/', (req, res) => {
    res.json({ data: "hello bro" });  // Test response
});

// Connect to MongoDB and start the server
mongoose
    .connect(mongoDBURL) // Connect using URL from config
    .then(() => {
        console.log("✅ App is connected to database");

        // Start the Express server after DB connection is successful
        app.listen(PORT, () => {
            console.log("🚀 App is listening on port:", PORT);
        });
    })
    .catch((error) => {
        // Handle DB connection error
        console.error("❌ Error connecting to database:", error);
    });

// Exporting app instance (optional - useful for testing or advanced setups)
module.exports = app;
