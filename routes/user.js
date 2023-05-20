var logger=require("../utils/log")(module);
const { getUserDetails, removeUserSession, getQRCode, authenticate2FAUser}=require('../controllers/user/user')
const express=require('express')
const router=express.Router()

router.get('/getUser',getUserDetails)

router.get('/logoutUser',removeUserSession)

router.get('/code-generate', getQRCode)

router.post('/authenticate', authenticate2FAUser)

module.exports=router;