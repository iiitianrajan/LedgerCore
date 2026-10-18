const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const emailServices = require('../services/email.service')


const tokenBlackListModel = require("../models/blackList.model");
/**
 * User registration controller
 * @route POST api/auth/register
 * @access public
 */
const userRegisterController = async (req, res) => {
  const { name, email, password } = req.body;

  const isExist = await userModel.findOne({
    email: email,
  });

  if (isExist) {
    return res.status(422).json({
      message: "User already exist",
      status: "failed",
    });
  }

  const user = await userModel.create({
    name: name,
    email: email,
    password: password,
  });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "3d",
  });

  res.cookie("token", token);

  res.status(201).json({
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    token,
  });

  await emailServices.sendRegistrationEmail(user.email,user.name)
};

/**
 * User Login controller
 * @route POST api/auth/login
 * @access public
 */

const userLoginController = async (req, res) => {
  const {email, password } = req.body;
  console.log(email)

  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    res.status(401).json({
      message: "User not found",
    });
  }

  const isValidUser = await user.comparePassword(password);

  if (!isValidUser) {
    res.status(402).json({
      message: "Email or Password is incorrect ",
    });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "3d",
  });

  res.cookie("token", token);

  res.status(200).json({
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    token,
  });
};


/**
 * - User Logout Controller
 * - POST /api/auth/logout
  */
async function userLogoutController(req, res) {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[ 1 ]

    if (!token) {
        return res.status(200).json({
            message: "User logged out successfully"
        })
    }



    await tokenBlackListModel.create({
        token: token
    })

    res.clearCookie("token")

    res.status(200).json({
        message: "User logged out successfully"
    })

}

module.exports = {
  userRegisterController,
  userLoginController,
  userLogoutController
};
