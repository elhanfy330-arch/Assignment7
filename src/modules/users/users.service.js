import * as dao from "../../repos/user.repo.js"
export const signup = async (data)=>{
    let checkExists = await dao.findByEmail(data.email)
    // console.log(checkExists)
    if(checkExists){
        throw new Error("Email is Already Exists" , {cause : 409})
    }
    
    let result = await dao.signup(data)
    return result;
}

export const login = async (data)=>{
    let user = await dao.findByEmail(data.email)
    if(!user){
        throw new Error("Email Not Exists")
    }
    if(data.password != user.password)
    {
        throw new Error("invalid Email Or Password" ,{cause : 404})
    }
    return user
}

export const update = async (id , data)=>{
        // console.log( "data", data)
    if (data.password) {
        throw new Error("Cannot edit password", { cause: 400 })
    }

    if (data.email) {
        const exists = await dao.findByEmail(data.email)
        if (exists) {
            throw new Error("Email already exists.", { cause: 409 })
        }
    }

    let updated = await dao.updateData(id , data)
    if (!updated) {
        throw new Error("User not found", { cause: 404 })
    }
    return updated
}    

export const deleteLog = async (id)=>{
    let data  = await dao.deleteUser(id)
    if(!data){
        throw new Error("User not found", { cause: 404 })
    }
}

export const getLog = async (id)=>{
    let data  = await dao.getUser(id)
    if(!data){
        throw new Error("User not found", { cause: 404 })
    }
    return data
} 