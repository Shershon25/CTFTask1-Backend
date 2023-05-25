const { Sequelize } = require("sequelize");

// const db = new Sequelize('ctftest1', 'postgres', 'thisisnotgoodlol', {
//     host: 'database-2.cvyau4xzirke.ap-south-1.rds.amazonaws.com',
//     dialect: 'postgres'
//   });

const db = new Sequelize('ctftest1', 'postgres', 'thisisnotgoodlol', {
    host: 'database-2.cvyau4xzirke.ap-south-1.rds.amazonaws.com',
    port: 5432,
    logging: console.log,
    maxConcurrentQueries: 100,
    dialect: 'postgres',
    dialectOptions: {
        ssl:'Amazon RDS'
    },
    pool: { maxConnections: 5, maxIdleTime: 30},
    language: 'en'
})

db.authenticate()
.then(()=>{ 
    console.log('Connection has been established successfully.');
})  
.catch((err)=>{
    console.error('Unable to connect to the database:', err);
}) 

module.exports = db;

//nosql-mongodb