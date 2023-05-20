module.exports= (sequelize, DataTypes) =>{
    const JWTtoken = sequelize.define('jwtToken', {
        userid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        jwtToken: {
            type:DataTypes.STRING,
        }
    });

    return JWTtoken;
}