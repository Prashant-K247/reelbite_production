import mongoose from "mongoose";

const partnerSchema = new mongoose.Schema(
    {
        partnername:{
            type:String,
            required:true,
        },
        contactNumber:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true,
        },
        address:{
            type:String,
            required:true,
        }
    },{timestamps:true}
    
)
const partner = mongoose.model("partner",partnerSchema)
export default partner;