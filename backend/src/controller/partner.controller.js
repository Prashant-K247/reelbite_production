import partner from "../models/partner.js";
import foodModel from "../models/food.model.js";
import jwt from "jsonwebtoken"


export const getPartnerById = async (req,res)=>{
    try {
        const partnerId = req.params.id;
        const foodItemByPartner = await foodModel.find({partner:partnerId})
        const foodPartner = await partner.findById(partnerId) 
        if(!foodPartner){
            return res.status(404).json({ message: "food partner not found" });
        }
        let isOwner = false;
        try {
            const token = req.cookies?.token;
            if(token){
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                if(decoded?.id && decoded.id.toString() === partnerId.toString() ){
                    const fp = await partner.findById(decoded.id);
                    if(fp) isOwner =true;
                }
            }
            
        } catch (error) {
            console.debug('owner-detect failed', err?.message || error);
        }
        return res.status(200).json({ foodpartner: {...foodPartner.toObject(), foodItem: foodItemByPartner, isOwner}});

    } catch (error) {
        console.error(error);
        
    }
}