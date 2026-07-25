import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        video:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            required:true
        },
        partner:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"partner",
            required:true,
        },
        likeCount:{
            type:Number,
            default:0
        }

    },{timestamps:true }
)

const foodModel = mongoose.model("food", foodSchema);
export default foodModel;