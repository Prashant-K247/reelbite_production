import mongoose from "mongoose";
import userModel from "./user.model.js";
import foodModel from "./food.model.js";
const commentschema=new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true
        },
        
        name:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: false,
        },
        food:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"food",
            required:true
        },
        text: {
            type: String,
            required: true,
            trim: true,
        },
    },{timestamps:true}
)
const Comment = mongoose.model("Comment",commentschema)
export default Comment