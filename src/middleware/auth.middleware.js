const tokenBlackListModel = require("../models/blackList.model");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blackList.model");

require('dotenv').config() 

const authMiddleware = async (req,res,next)=>{
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if(!token){
        res.status(401).json({
            message:"Unauthorized access, token is missing"
        })
    }

    const isBlacklisted = await tokenBlackListModel.findOne({token})

    if(isBlacklisted){
        return res.status(401).json({
            message:"Unauthorized access, token is invalid"
        })
    }

    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET_KEY)
        const user = await userModel.findById(decode.userId)

        req.user = user;

        return next();
        
    } catch (err) {
        return res.status(401).json({
            message:"Unathorized access, token is invalid"
        })
    }
    
}

async function authSystemUserMiddleware(req, res, next) {

    const token = req.cookies.token || req.headers.authorization?.split(" ")[ 1 ]

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized access, token is missing"
        })
    }
    

    const isBlacklisted = await tokenBlackListModel.findOne({ token })

    if (isBlacklisted) {
        return res.status(401).json({
            message: "Unauthorized access, token is invalid"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

        const user = await userModel.findById(decoded.userId).select("+systemUser")
        if (!user.systemUser) {
            return res.status(403).json({
                message: "Forbidden access, not a system user"
            })
        }

        req.user = user

        return next()
    }
    catch (err) {
        return res.status(401).json({
            message: "Unauthorized access, token is invalid"
        })
    }

}

module.exports = {
    authMiddleware,
    authSystemUserMiddleware
}