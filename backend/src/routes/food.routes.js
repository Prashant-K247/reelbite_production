import express from "express";
import { createFood, getFood, likeFood, commentFood, getComment } from "../controller/food.controller.js";
import { authPartner, authUser, authAnyMiddleware } from "../middleware/auth.middleware.js";
import multer from "multer";
import { uploadLimiter } from "../middleware/rateLimiter.middleware.js";

const upload = multer({storage: multer.memoryStorage()})

const foodrouter = express.Router()

foodrouter.post("/", uploadLimiter , authPartner , upload.single("video"),createFood)
foodrouter.post("/like",authUser,likeFood);
foodrouter.post("/comment",authUser, commentFood);
foodrouter.get("/reels", authAnyMiddleware, getFood);
foodrouter.get("/comment/:id",authAnyMiddleware, getComment);
export default foodrouter;