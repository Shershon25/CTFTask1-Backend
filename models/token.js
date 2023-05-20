// const Sequelize = require('sequelize');
// const db= require('../config/dbconnection');

module.exports= (sequelize, DataTypes) =>{
    const Token = sequelize.define('token', {
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        token: {
            type:DataTypes.STRING,
        }
    });

    return Token;
}