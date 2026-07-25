import userModel from "../models/user.model.js";
import bycrypt from "bcrypt"
import jwt from "jsonwebtoken"
import partner from "../models/partner.js";

export const registerUser = async (req,res)=>{
    try {
        const {fullname,email,password} = req.body;
        const userExists = await userModel.findOne({email})
        if (userExists){
            return res.status(400).json({message:"user already exists"})
        }

        const hashedPassword = await bycrypt.hash(password,10);

        const user = await userModel.create({fullname,email, password:hashedPassword})

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

        res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
});
        res.status(201).json({message:"user registered successfully", user:{_id: user._id, email: user.email, fullname: user.fullname}})

    } catch (error) {
        console.log(error);
    }
}

export const loginUser = async (req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(400).json({message:"user dont exist register first"});
        }

        const isPasswordvalid =await bycrypt.compare(password, user.password);
        
        if(!isPasswordvalid){
            return res.status(400).json({message:"invalid password"})
        }
        
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
       res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
});
        res.status(200).json({message:"user logged in successfully", user:{_id: user._id, email: user.email, fullname: user.fullname}})
    } catch (error) {
        console.log(error);
        
    }
    

}

export const logoutUser = async (req,res)=>{
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
    });
    res.status(200).json({message:"logged out successfully"})
}

export const registerPartner = async (req,res)=>{
    
    try {
        const {partnername, contactNumber,email,password,address} = req.body;

        const partnerExist = await partner.findOne({email});
        if(partnerExist){
            return res.status(400).json({message:"Food Partner already exists"});
        }
        const hashedPassword = await bycrypt.hash(password,10);

        const Partner = await partner.create({partnername, contactNumber, email, password:hashedPassword, address});

        const token = jwt.sign({id:Partner._id}, process.env.JWT_SECRET);
        res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
});
        res.status(201).json({message:"partner registered successfully", user:{_id: Partner._id, email: Partner.email, fullname: Partner.partnername}})

    } catch (error) {
        console.error(error);
    }    
}

export const loginPartner = async(req,res)=>{
    try {
         const {email, password} = req.body;

        const partnerExist = await partner.findOne({email});
        if(!partnerExist){
            return res.status(400).json({message:"Account dont exist register first"});
        }
    
        const isPassworValid = await bycrypt.compare(password, partnerExist.password);
        if(!isPassworValid){
            res.status(400).json({message:"Password is incorrect"});
        }
    
        const token = jwt.sign({id:partnerExist._id}, process.env.JWT_SECRET);
        res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
});
        res.status(200).json({message:"Food Partner logged in successfully", user:{_id: partnerExist._id, email: partnerExist.email, fullname: partnerExist.partnername}})
    
    } catch (error) {
        console.error(error);
    }
}

export const logoutPartner = async(req,res)=>{
    res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
});
    res.status(200).json({message:"Food Partner logged out successfully"})
}

export const getCurrentAuth = async (req,res)=>{
    try {
        const token = req.cookies?.token;
        if(!token){
            return res.status(401).json({message:"not authenticated"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded?.id;
        if(!userId){
            return res.status(401).json({ message: 'Not authenticated' });
        }

        const user = await userModel.findById(userId).select('fullname email')
        if(user){
            return res.status(200).json({type: user, user:{id:user._id, fullname: user.fullname, email: user.email}})
        }

        const foodpartner = await partner.findById(userId).select('partnername');
        if(foodpartner){
            return res.status(200).json({type:'partner', foodpartner:{id:foodpartner._id, name:foodpartner.partnername} })
        }
    } catch (error) {
        
    }
}