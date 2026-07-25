import express from "express"
import cookieParser from "cookie-parser"
import authrouter from "./routes/auth.routes.js"
import foodrouter from "./routes/food.routes.js"
import partnerrouter from "./routes/partner.routes.js"
import cors from "cors"
import { globalLimiter } from "./middleware/rateLimiter.middleware.js"

const app = express()
const frontend = process.env.FRONTEND_URL || "http://localhost:3001"
app.use(cors({origin:frontend, credentials:true}));
app.use(globalLimiter);
app.use(cookieParser());
app.use(express.json());


app.use("/api/auth", authrouter)
app.use("/api/food", foodrouter)
app.use("/api/partner", partnerrouter);


export default app