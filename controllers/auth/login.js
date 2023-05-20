const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const {jwtDetails }= require("../../config/config")
var logger=require("../../utils/log")(module);
const { userdetails, jwtToken }=require('../../models')
const Login = async (req, res) => {
    try{

        const email=req.body.email  
        const password=req.body.password 

        userdetails.findOne({where: { email}})
        .then((user)=>{
            if(!user.isEmailVerified)return res.status(400).send({message:"User not created!"});

            bcrypt.compare(password, user.password, function(err, result) {
                if(err){
                    return res.status(500).send({message:"Server Error"})
                }
                else{
                    if (result === true) {
                        const tokenData={
                            email: user.email
                        }

                        let token = jwt.sign(tokenData, jwtDetails.secret, {
                            expiresIn: jwtDetails.jwtExpiration,
                        });

                        jwtToken.count({where: {userid: user.id}})
                        .then((count)=>{
                            if(count>0){
                                logger.error("Token Already exists!");
                                return res.status(400).send("Token Already exists!")
                            }
                            else{
                                jwtToken.create({
                                    userid: user.id,
                                    jwtToken:token
                                })
                                .then((data)=>{
                                    logger.info("Access Token created successfully")
                                    return res.status(200).json({message:"Login success",accessToken:token});  
                                })
                            } 
                                
                        })
                    }
                    else{
                        return res.status(400).send({ message:{"Password":"Wrong Password"}})
                    }
                }
            });
        })
        .catch((err)=>{
            return res.status(400).send({ message:"User not Found"})
        })
       
    }   
    catch(err){
        logger.error(err);
        return res.status(500).send({  message: "Server Error" });
    }
}


module.exports = Login 