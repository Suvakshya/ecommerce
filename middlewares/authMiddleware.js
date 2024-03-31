const JWT = require("jsonwebtoken");
const dotenv = require("dotenv");
const userModel = require("../models/userModel");
dotenv.config();

//Protected Routes token base(TOKEN MIDDLEWARE)
const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    ); //out created jwt token remains at req.header.authorization
    req.user = decode; //after verifying the token the JWT.verify returns us the user payload that was used while creating the token . in our case user._id was used to create the token along with the jwt_secrete. so we are returning the obtained user payload to the req.user. so that we can get the user payload (in our case user._id)
    next();
  } catch (error) {
    console.log(error);
  }
};
//ADMIN access(ADMIN MIDDLEWARE)
const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "unauthorized access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middleware",
    });
  }
};
module.exports = { requireSignIn, isAdmin };
