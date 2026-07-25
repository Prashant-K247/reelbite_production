import mongoose from "mongoose";

const connectDB =async ()=>{
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log("DB connected successfully");
        
    } catch (error) {
        
        process.exit(1);
        
    }
}
export default connectDB;