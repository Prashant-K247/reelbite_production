import mongoose from "mongoose";
import userModel from "./user.model.js";
import foodModel from "./food.model.js";

const likeschema = new mongoose.Schema(
    {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"user",
                required:true
            },
            food:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"food",
                required:true
    
            }
        },{timestamps:true}
)
const Like =mongoose.model("Like",likeschema)
export default Like;