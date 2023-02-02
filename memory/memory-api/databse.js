const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('memory', 'memory', 'memory', {
  host: 'localhost',
  dialect: 'postgres',
  define: {
      timestamps: false
  }
});

module.exports = sequelize;