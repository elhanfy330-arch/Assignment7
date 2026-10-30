import mongoose, { Schema } from "mongoose";

let userSchema = new Schema({
    name : {
        type : String,
        required : true,
        minLength : [3,"{VALUE} is too Short To be Name"],
        trim : true
    },
    email :{
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    phone : {
        type : String,
        required : true,
    },
    age :{
        type : Number,
        min : 18,
        max : 60,
        required : true
    }
},{
    timestamps : true
})


export const userModel = mongoose.model("users" , userSchema)