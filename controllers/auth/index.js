
const { verifyToken } = require("../../utils/token")
const login = require("./login")
const password = require("./password")
const signup = require("./signup")
const verifyUser = require("./verifyuser")

const JWTVerify = async(req,res,next)=>{

    const token = req.headers.authorization 

    if(!token || token==="Bearer no_token") return res.status(401).send({message:"Token required"})

    const data = verifyToken(token)

    if(data===null) 
    {
        return res.status(401).send({message:"Invalid token"})
    }
    next()
    // return res.status(200).send({message:"token is valid",data}) //might have to add return
    
}

module.exports = {
    login,
    signup ,
    password,
    JWTVerify,
    verifyUser 
}