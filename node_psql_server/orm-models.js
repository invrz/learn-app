// orm-models.js
const { sequelize } = require('./db');
const { DataTypes } = require('sequelize');

// Define a User model
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Example function to get a user by ID
const getUser = async (userId) => {
  return await User.findByPk(userId);
};

// Example function to create a user
const createUser = async (name, email) => {
  return await User.create({ name, email });
};

module.exports = { getUser, createUser };
