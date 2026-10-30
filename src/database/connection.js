import mongoose from "mongoose";
import { DB_config } from "../config/config.service.js";
import { userModel } from "./models/users.model.js";
export const PORT = process.env.PORT
export const connectDB = async()=>{
    try{
        await mongoose.connect(DB_config.URI)
        console.log("DB Connected")
    }catch(err){
        console.log(err)
        console.log("DB Connection Faild")
        process.exit(-1)
    }

}

