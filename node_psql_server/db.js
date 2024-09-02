// db.js
const { Pool } = require('pg');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

const pgPool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Function to test Sequelize connection
const testSequelizeConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Sequelize: Database connected successfully');
  } catch (err) {
    console.error('Sequelize: Unable to connect to the database:', err);
  }
};

// Function to test PostgreSQL connection
const testPgConnection = async () => {
  try {
    const client = await pgPool.connect();
    client.release();
    console.log('pg: Database connected successfully');
  } catch (err) {
    console.error('pg: Unable to connect to the database:', err);
  }
};

// Export functions for usage
module.exports = {
  sequelize,
  pgPool,
  testSequelizeConnection,
  testPgConnection,
};
