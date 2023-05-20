const { body, header, param, query } = require("express-validator");
const { validate } = require("../validators");



const loginValidator = async (req, res, next) => {
	await body("email")
		.notEmpty()
		.withMessage("Email is required!")
		.trim()
		.isEmail()
		// .normalizeEmail()
		.withMessage("Invalid Email")
		.run(req);
	await body("password")
		.notEmpty()
		.withMessage("Password not defined in body")
		.run(req);

	next();
}


const SetPasswordValidator=async(req,res,next)=>{
	await body("password")
		.notEmpty()
		.isLength({ min: 6 })
		.withMessage("password length invalid")
		.bail()
		.withMessage("password not defined in body")
		.run(req);
	await body("conpass")
		.notEmpty()
		.isLength({ min: 6 })
		.withMessage("password length invalid")
		.bail()
		.withMessage("confirm-password not defined in body")
		.bail()
		.run(req);
	await body("username")
		.notEmpty()
		.withMessage("userID not defined")
		.run(req)
	await body("linkCode")
		.notEmpty()
		.withMessage("link code not define in body")
		.run(req)

	next();
}
const ForgotPasswordValidator=async(req,res,next)=>{
	await body("email")
		.notEmpty()
		.withMessage("Email is required!")
		.trim()
		.isEmail()
		// .normalizeEmail()
		.withMessage("Invalid Email")
		.run(req);
	next()
}

const signupValidator=async(req,res,next)=>{
	await body("username")
	.notEmpty()
	.withMessage("Name not defined")
	.run(req)
	await body("regno")
	.notEmpty()
	.withMessage("Register No. not defined")
	.isLength({ min: 10 })
	.withMessage("password length invalid")
	.bail()
	.run(req)
	await body("email")
	.notEmpty()
	.withMessage("Email is required!")
	.trim()
	.isEmail()
	// .normalizeEmail()
	.withMessage("Invalid Email")
	.run(req);
	body("password")
	.notEmpty()
	.isLength({ min: 6 })
	.withMessage("password length invalid")
	.bail()
	.withMessage("password not defined in body")
	.run(req);
	await body("conpass")
	.notEmpty()
	.isLength({ min: 6 })
	.withMessage("password length invalid")
	.bail()
	.withMessage("confirm-password not defined in body")
	.bail()
	.custom((value, {req}) => value === req.body.password).withMessage("The passwords do not match")
	.bail()
	.run(req);
	next()
}

module.exports = {
	loginValidator,
	SetPasswordValidator,
	ForgotPasswordValidator,
	signupValidator
}

