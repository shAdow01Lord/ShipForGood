import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//protected route based on jwt tokens
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    ); // token is found in headers not in body
    req.user = decode;
    next();
  } catch (error) {
    //secret key
    console.log(error);
  }
};

//admin access
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "Unathourised Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middleware request",
    });
  }
};
