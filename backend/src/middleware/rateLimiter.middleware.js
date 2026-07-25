import rateLimit from "express-rate-limit"

export const globalLimiter = rateLimit({
    windowMs:15*60*1000,
    max:100,
    standardHeaders:true,
    legacyHeaders:false,
    message:{message: "Too many request for this ip, please try again after 15 minutes"}
})

export const authLimiter = rateLimit({
    windowMs:15*60*1000,
    max:10,
    standardHeaders:true,
    legacyHeaders:false,
    message:{message:"Too many login/register requests, please try again after 15 minutes"}
})

export const uploadLimiter = rateLimit({
    windowMs:10*60*1000,
    max:20,
    standardHeaders:true,
    legacyHeaders:false,
    message:{message:"upload limit reached try again after 10 mins"}
})