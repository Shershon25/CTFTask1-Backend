var logger=require("./utils/log")(module)
const dotenv = require('dotenv').config()
const express = require('express');
const app = express();
const cors=require('cors');
const con=require("./config/dbconnection")
const UserDetails=require('./models')
const authroutes=require('./routes/auth')
const userroutes=require('./routes/user')
const { verifyUser, JWTVerify } = require('./controllers/auth')
const  utils=require('./utils');

app.use(cors());//update it when u integrate with frontend
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// DB-Connection 
con.
  sync().
  then(() => {
    logger.info("Synced db.");
  })
  .catch((err) => {
    logger.error(err);
    logger.info("Failed to sync db: " + err.message);
  });

//Syncing the model
UserDetails.sequelize.sync()
.then((res)=>{
  logger.info("Model worked!!")
})
.catch((err)=>{
  logger.error(err)
})

//allow login-signup routes without jwt Authorization
app.use('/api/auth', authroutes); 

app.use('/user/verify/:id/:token',verifyUser)

app.use('/api/user',JWTVerify, userroutes )

// // Authorizing requests
// app.use((req,res,next)=>{

//   const token = req.headers.authorization 

//   if(!token || token==="Bearer no_token") return res.status(401).send({message:"token required"})

//   const data = verifyToken(token)

//   //set locals - according to your logic 
//   //we can use it in the controllers function - logic
  
//   if(data!==null){ 
//     //set 
//     //store the decoded data in res.locals.keyname=value
//     //for eg : 
//     res.locals.id=data.id;
    
//     next(); 
//   }
//   else{
//     return res.status(401).send({message:"un-authorised , give me token!!"})
//   }
// })




// //add routes here




// app.use(function(req, res, next) {
//   return res.status(404)
// });

app.listen(process.env.PORT || 5000, (err) => {
  if (!err) logger.info("App Started!! at PORT",process.env.PORT)
  else logger.error("Error Starting") 
})
