const { Model, DataTypes } = require('sequelize');
const sequelize = require("../databse.js");

class Score extends Model {};

Score.init({
    name: DataTypes.TEXT,
    time: DataTypes.FLOAT
}, {
    sequelize,
    tableName: 'score'
});

module.exports = Score;