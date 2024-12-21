// index.js
const express = require('express');
const cors = require('cors');
const apiRoutes = require('./apis');
const { testSequelizeConnection, testPgConnection } = require('./db');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());  // Enable CORS for all origins
app.use(express.json());

/*
// Test database connections
testSequelizeConnection();
testPgConnection();
*/

// Use API routes
app.use('/api', apiRoutes);

const usingMiddleWare = (req, res, next) =>{

  console.log(req.path)
  next()

}

// Use API routes
app.get('/test', usingMiddleWare, (req, res) =>{

  res.send("works fine")

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
