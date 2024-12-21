// models.js
const { pgPool } = require('./db');

// Example function to get a user by ID
const getUser = async (userId) => {
  const result = await pgPool.query('SELECT * FROM users WHERE id = $1', [userId]);
  return result.rows[0];
};

// Example function to create a user
const createUser = async (name, email) => {
  const result = await pgPool.query('INSERT INTO users(name, email) VALUES($1, $2) RETURNING *', [name, email]);
  return result.rows[0];
};

module.exports = { getUser, createUser };
