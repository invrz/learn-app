// db.js
const { Pool } = require('pg');
require('dotenv').config();

const pgPool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Function to test PostgreSQL connection
const connectToDb = async () => {
  try {
    console.log(process.env.DATABASE_URL);
    const client = await pgPool.connect();
    client.release();
    console.log('pg: Database connected successfully');
  } catch (err) {
    console.error('pg: Unable to connect to the database:', err);
  }
};

// Export functions for usage
module.exports = {
  pgPool,
  connectToDb,
};
