import express from "express"
import { authUser, authAnyMiddleware, authPartner } from "../middleware/auth.middleware.js"
import { getPartnerById } from "../controller/partner.controller.js"

const partnerrouter = express.Router();

partnerrouter.get("/:id",getPartnerById)

export default partnerrouter;