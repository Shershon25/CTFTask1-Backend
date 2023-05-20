var logger=require("../../utils/log")(module);
const bcrypt=require("bcrypt");
const crypto = require("crypto")
const { userdetails, token }=require('../../models')
const { sendmail }= require("../../utils/mail")

const saltRounds=10;

const ForgotPassword = async(req,res)=>{
    try{
        
        const email=req.body.email;
        userdetails.findOne({where: {email: email}})
        .then(async(user)=>{
            await sendVerificationLink(req,res,email);
        })
       
    }
    catch(err){
        logger.error(err);
        return res.status(500).send({ message: "Server Error" });
    }
}


const SetPassword=async (req,res)=>{
    try{
        var id=req.params.id;
        var linkCode=req.params.linkCode;
       
        var uid="";var linkCode="";var obj="";
        uid=req.body.userId;
        linkCode=req.body.linkCode;

        obj=""; //fetch entry from Verification using uid and linkCode
        if(!obj){
            return res.status(400).send({message:"Invalid Link"});
        } 
         //check the expireTime of the link
       
        else{
           
            if(expireTime-Date.now()<0){
                return res.status(400).send({message:"Invaid link or Expired...."});
            }
            else{
                const newPassword=req.body.password;
                const confirmpassword=req.body.confirmpassword
                if(newPassword!==confirmpassword) {return res.status(400).send({message:"Invalid Credentials"})}
                else{
                    //set ExpireTime to zero - to make it invalid - one time use
                    await obj.update({
                        expireTime:0,
                       
                    })
                    bcrypt.genSalt(saltRounds,async (err, salt) => {
                        bcrypt.hash(newPassword, salt,async (err, hash) => {
                            if(err){
                                logger.error(err);
                                return res.status(500).send({ message: "Server Error." });
                            }
                            else{
                                //update hash password in db table
                                return res.status(200).send({ message: "Success" });
                            }
                        });
                        if(err){
                            logger.error(err.message);
                            return res.status(500).send({ message: "Server Error." });
                        }
                    });
                }
            }
            
        }
    }
    catch(err){
        logger.error(err);
        return res.status(500).send({message:"Server Error!"});
    }
}

const sendVerificationLink=async(req,res,mail)=>{
    try{
        var id=0;
        // var oobj="";
        const expireTime=Date.now();
        // linkCode = crypto.randomBytes(32).toString("hex");//to generate random unique link

        userdetails.findOne({where: {email: mail}}).then(async(user)=>{
            id=user.id
            if(id){

                const link = process.env.BASE_URL+"/auth/password-set/"+id+"/"+expireTime;
                const html =  `<h3>Reset Link: </h3> 
                                <p><a> ${link} </a></p>` ; 
    
                const subject = `Password Set-link ; Expires on ${expireTime}`; 
    
                const isSend =await sendmail(mail, subject, html);        
                if (isSend) {
                    return res.status(200).send({ message: "Mail sent successfully" })
                }
                else {
                    logger.error("Mail not sent - Error");
                    return res.status(500).send({ message: "Server Error." })
                }
            }
            else{
                logger.error("Id not found - Error");
                return res.status(500).send({ message: "Server Error." })
            }
        })
        // if(obj){
        //     //update linkCode and ExpireTime of link
        //     id="";//id of the entry
           
        // }
        // else{
        //     //create new entry if needed or send 401
        //     id="";//id of the entry
        // }
       
    }
    catch(err){
        logger.error(err);
        return res.status(500).send({ message: "Server Error." })   
    }
}
module.exports = {
    ForgotPassword,
    SetPassword ,
    sendVerificationLink
}