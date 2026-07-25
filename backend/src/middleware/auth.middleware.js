import partner from "../models/partner.js";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken"

export const authPartner = async(req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message:"unauthorized access, please login first"})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const foodPartner = await partner.findById(decoded.id);
        req.foodPartner = foodPartner;
        console.log("calling next");
        
        next();

    } catch (error) {
        console.log("error");
        
        console.error(error);
    }
}

export const authUser = async(req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message:"please login first"});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decoded.id);
        req.user = user;
        next()

    } catch (error) {
        console.error(error);
    }
}

// auto detectes if the user is user or  partner
export const authAnyMiddleware = async(req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message:"please login first"})
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // try user
        const user = await userModel.findById(decoded.id);
        if(user){
            req.user = user;
            return next()
        }
        const foodPartner = await partner.findById(decoded.id);
        if(foodPartner){
            req.foodPartner = foodPartner;
            return next()
        }
        return res.status(401).json({ message: 'Invalid token' });
    } catch (error) {
        console.error(error);
        
    }
}