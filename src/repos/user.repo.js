import { userModel } from "../database/models/users.model.js";

export const signup =async (data)=>{
    let result = await userModel.create(data)
    return result;
}

export const findByEmail =async (email)=>{
    let result =await userModel.findOne({email})
    // console.log( "result", result)
    return result;
}

export const findById =async (id)=>{
    let user =await userModel.findOne({id})
    return user;
}



export const updateData =async (id , data)=>{
    // console.log("id" , id)
    // console.log("data" , data)

    let updated = await userModel.findByIdAndUpdate(id ,
        { $set :data} ,
        { runValidators : true, returnDocument : "after"}
    )
    return updated; 
}  

export const deleteUser = async (id)=>{
    let deleted = await userModel.findByIdAndDelete(id)
    return deleted
}

export const getUser = async (id)=>{
    let user = await userModel.findById(id)
    return user
}