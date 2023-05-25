const { Sequelize } = require("sequelize");

// const db = new Sequelize('ctftest1', 'postgres', 'thisisnotgoodlol', {
//     host: 'database-2.cvyau4xzirke.ap-south-1.rds.amazonaws.com',
//     dialect: 'postgres'
//   });

const db = new Sequelize('postgres//postgres:thisisnotgoodlol@database-2.cvyau4xzirke.ap-south-1.rds.amazonaws.com/ctftest1', {
        host: 'database-2.cvyau4xzirke.ap-south-1.rds.amazonaws.com',
        dialect: 'postgres'
      });
    

db.authenticate()
.then(()=>{ 
    console.log('Connection has been established successfully.');
})  
.catch((err)=>{
    console.error('Unable to connect to the database:', err);
}) 

module.exports = db;

//nosql-mongodb