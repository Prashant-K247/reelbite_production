
import foodModel from "../models/food.model.js";
import { uploadFile } from "../services/storage.service.js";
import { v4 as uuid } from "uuid";
import Like from "../models/like.model.js";
import Comment from "../models/comment.model.js";

export const createFood = async(req,res)=>{
    try {
        console.log("Controller hit");

        if (!req.foodPartner?._id) {
            return res.status(401).json({ message: "partner not authenticated" });
        }

        console.log("Uploading...");
        
        const fileUploadResult = await uploadFile(req.file.buffer,uuid())
        console.log(fileUploadResult);  

        const foodItem = await foodModel.create({
            name:req.body.name,
            description:req.body.description,
            video: fileUploadResult.url,
            partner:req.foodPartner._id
        })
        res.status(201).json({message:"food created successfully"})

    } catch (error) {
        console.error(error);
    }
}

export const getFood = async(req,res)=>{
    try {
        const foodItem = await foodModel.find({}).populate('partner', 'partnername');
        
        res.status(200).json({messsage:"food items fetched successfully", foodItem}); 
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server error fetching food"});
    }
}

export const likeFood = async(req,res)=>{
    try {
        const {foodId} =req.body;
        const user = req.user
        const isAlreadyLiked = await Like.findOne({user: user._id, food: foodId})
        if(isAlreadyLiked){
            await Like.deleteOne({user:user._id, food:foodId});
            await foodModel.findByIdAndUpdate(foodId,{$inc:{likeCount:-1}});
            return res.status(200).json({message:"reel unliked"})
        }
        const like = await Like.create({
            user:user._id,
            food:foodId
        })
        await foodModel.findByIdAndUpdate(foodId,{$inc:{likeCount:+1}});
        res.status(201).json({message:"reel liked",like})
    } catch (error) {
        console.error(error);
    }
    
}

export const commentFood = async (req,res)=>{
    try {
        const {foodId, text} = req.body;
        if(!text){
            return res.status(400).json({message:"text is required"});
        }

        const user = req.user;
        const comment = await Comment.create({
            user:user._id,
            food:foodId,
            text
        })

        await comment.populate(
            [
                {
                    path:'user',
                    select:'fullname'
                },
                {
                    path:'name',
                    select:'fullname'
                }
            ]
        )
        const populated = comment.toObject();
        populated.user = populated.user || populated.name || null;
        return res.status(201).json({message: "Comment added successfully", comment: populated});
    } catch (error) {
        console.error(error);
    }
}

export const getComment = async (req,res)=>{
    try {
        const {id} = req.params;
        const comments = await Comment.find({food:id}).populate([{ path: 'user', select: 'fullname' }, { path: 'name', select: 'fullname' }]).sort({ createdAt: -1 });

        const normalize = comments.map((c)=>{
            const o = c.toObject();
            o.user= o.user || o.name || null;
            return o;
        })
        
        return res.status(200).json({message: "Comments fetched successfully", comments: normalize});


    } catch (error) {
        console.error(error);
    }
}