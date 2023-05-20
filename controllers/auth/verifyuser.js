var logger=require("../../utils/log")(module);
const { userdetails, token }=require('../../models')


const VerifyUser = (req, res)=>{
    const userid=req.params.id;
    const usertoken=req.params.token;

    userdetails.findOne({where : {id: userid}})
    .then((user)=>{
        token.findOne({where: {email: user.email}})
        .then((token)=>{
            if(usertoken ===  token.token){
                userdetails.update({ isEmailVerified: true},
                    {where: {id: userid}}
                )
                res.status(200).send({message: "User verified successfully!"})
            }
            else{
                res.status(400).send({message: "Invalid user or token"})
            }
                
        })
    })
    
}

module.exports= VerifyUser