
import express from "express";
import { registerUser, loginUser, logoutUser, registerPartner, loginPartner, logoutPartner, getCurrentAuth } from "../controller/auth.controller.js";
import { authLimiter } from "../middleware/rateLimiter.middleware.js";

const authrouter = express.Router()

authrouter.post("/user/register",authLimiter, registerUser);
authrouter.post("/user/login",authLimiter, loginUser);
authrouter.get("/user/logout", logoutUser);

authrouter.post("/partner/register",authLimiter, registerPartner);
authrouter.post("/partner/login",authLimiter, loginPartner);
authrouter.get("/partner/logout", logoutPartner);

authrouter.get("/me",getCurrentAuth);

export default authrouter;