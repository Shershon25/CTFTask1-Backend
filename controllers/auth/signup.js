var logger=require("../../utils/log")(module);
const { userdetails, token }=require('../../models')
const crypto=require('crypto')
const bcrypt=require("bcrypt");
const { sendmail }=require('../../utils/mail')
const saltRounds = 10 

const CreateAccount = async (req, res) => {
    
    try{
        userdetails.count({where: {name: req.body.username}})
        .then((count)=>{
            if(count>0){
                res.status(400).send("User Already exists!")
                logger.error("User Already exists!");
            }
            else{
                    //hash password
            const hash = bcrypt.hashSync(req.body.password, saltRounds)

            userdetails.create({
                name: req.body.username,
                registerno: req.body.regno,
                email: req.body.email,
                password: hash,
                isEmailVerified: false,
                isTwoFA: false
            })
            .then(async(result)=>{
                // return res.send({message:"Success"});
                token.count({where: {email: req.body.email}})
                .then((count)=>{
                    if(count>0){
                        res.status(400).send("Token already generated!")
                        logger.error("Token already generated!"); 
                    }
                else{
                    token.create({
                        email: req.body.email,
                        token:crypto.randomBytes(32).toString("Hex")
                    })
                    .then((token)=>{
                        userdetails.findOne({where: {email: req.body.email}})
                        .then((user)=>{
                            console.log("recipient email:", user.email)

                            const message=`${process.env.BASE_URL}/user/verify/${user.id}/${token.token}`
        
                            sendmail(user.email,"Verify Email", message)
                            .then(()=>{
                                logger.info("Email sent")
                                res.send("Email sent!")
                            })
                            .catch((err)=>{
                                logger.error(err);
                                logger.error("Email not sent")
                            })  
                        })            
                    })
                }
                }) 
            })    
        }})
    }
    catch (err) {
        logger.error(err);
        return res.send({message:"Server error"})
    }

}
module.exports = CreateAccount 
