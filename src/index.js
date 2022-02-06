const express = require('express');
const cors = require('cors');

// Configuration
const connectDB = require('./utils/db');
const getUrl = require('./routes/getUrl');
const setUrl = require('./routes/setUrl');

// Setup
const PORT = process.env.PORT;
const app = express();
connectDB();

// Content-Type JSON parsed and attached to req.body
app.use(express.json());

// Enabling all CORS for now
app.use(cors());

// GET
app.use('/', getUrl);

// POST
app.use('/api/store', setUrl);

app.listen(PORT, () => {
  console.log(`Server is up on PORT: ${PORT}`);
});
