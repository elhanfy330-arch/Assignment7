import mongoose from "mongoose";

export const normalizeId = id =>{
    return new mongoose.Types.ObjectId(id)
} 