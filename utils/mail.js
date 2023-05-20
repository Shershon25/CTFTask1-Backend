const { transporter }=require("../config/config");
const dotenv = require('dotenv').config()
const logger=require("../utils/log")(module);

const sendmail = async (to,subject,htmlText) => { 
    var mailOptions={ 
        from : process.env.SOURCE_EMAIL,
        to ,
        subject,  
        text:htmlText 
    };

    transporter.sendMail(mailOptions, async (err, info) => {
        if (err) {
            logger.error(err);
            return false;
        }

        logger.info(info)
        console.log(info)
    })
    return true;

}


module.exports = {
    sendmail
}