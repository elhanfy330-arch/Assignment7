import mongoose, { Schema } from "mongoose";

let notesSchema = new Schema({
    content : {
        type : String,
        required : true,
    },
    title : {
        type : String,
        required : true,
        validate : {
            validator : function (VALUE) {
                return VALUE !== VALUE.toUpperCase() ;
            },
            message : "Title must not be entirely uppercase"
        }
    },
    userId :{
        type : mongoose.Types.ObjectId,
        required : true,
        ref : "users"
    }
},{
    timestamps : true
})

export const notesModel = mongoose.model("notes" , notesSchema)