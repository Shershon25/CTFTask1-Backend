// const Sequelize = require('sequelize');
// const db= require('../config/dbconnection');

module.exports= (sequelize, DataTypes) =>{
    const UserDetails = sequelize.define('userdetails', {
        name: {
            type:DataTypes.STRING,
            allowNull: false
        },
        registerno: {
            type:DataTypes.INTEGER,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type:DataTypes.STRING,
            allowNull: false
        },
        isEmailVerified:{
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        isTwoFA:{
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        secretAscii:{
            type: DataTypes.STRING
        }
    });

    return UserDetails;
}