var logger=require("../../utils/log")(module);
const { userdetails, jwtToken }=require('../../models')
const speakeasy=require('speakeasy')
const qrcode=require('qrcode')

const getUserDetails=(req, res)=>{
    var token=req.headers.authorization

    //decoding the jwt data
    token=token.split(" ")[1]
    const data=JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
    console.log(data["email"])

    userdetails.findOne({where: { email: data["email"]}})
    .then((user)=>{
        logger.info("User details sent")
        return res.send({user: user})
    })
    .catch((err)=>{
        logger.error(err)
    })

}   

const removeUserSession=(req, res)=>{
    var token= req.headers.authorization 
    token=token.split(" ")[1]
    logger.info("Token", token)

    jwtToken.destroy({where : { jwtToken: token}})
    .then(()=>{
        logger.info("Token deleted successfully!")
        return res.send("Token deleted!")
    })
    .catch((err)=>{
        logger.error(err)
    })
}

const getQRCode=(req,res)=>{
    var token=req.headers.authorization

    //decoding the jwt data
    token=token.split(" ")[1]
    const data=JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
    console.log(data["email"])

    var secret= speakeasy.generateSecret({
        name: data['email']
    })

    userdetails.update({secretAscii: secret.ascii},
        { where: {email: data['email']}})

    qrcode.toDataURL(secret.otpauth_url,(err, data)=>{
        res.send({ url: data})
    })
}

const authenticate2FAUser=(req,res)=>{
    var token=req.headers.authorization

    //decoding the jwt data
    token=token.split(" ")[1]
    const data=JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
    console.log(data["email"])
    
    //generated code
    const code=req.body.code

    userdetails.findOne({where: { email: data["email"]}})
    .then((user)=>{
        const secret_ascii=user.secretAscii
        var verified=speakeasy.totp.verify({
            secret: secret_ascii,
            encoding: 'ascii',
            token: code
        }
        )

        if(verified){
            userdetails.update({isTwoFA: true},
                {where: {email: data['email']}})
                .then((data)=>{
                    logger.info("Two FA done successfully")
                    res.send({message: "Successful 2 FA"})
                })
        }
        else{
            logger.info("Incorrect code");
        }
    })
    

    
}

module.exports={
    getUserDetails,
    removeUserSession,
    authenticate2FAUser,
    getQRCode
}