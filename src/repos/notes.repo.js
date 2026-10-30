import { notesModel, userModel } from "../database/index.js"
import { normalizeId } from "../common/index.js"

export const addNotes = async (userId , data)=>{
    let user = await userModel.findById(userId)
    if (!user){
        throw new Error("User not found", { cause: 404 })
    }
    let {content , title} = data
    let result = await notesModel.create({title, content , userId : userId})
    return result
}

export const updateNote = async (userId , noteId , newData)=>{
    console.log("new Data" , newData)
    let note = await notesModel.findById(noteId)
    if (!note){
        throw new Error("Note not found", { cause: 404 })
    }

    if(!note.userId.equals(userId)){
        throw new Error("You are not the owner", { cause: 403 })
    }

    let updated = await notesModel.findOneAndUpdate({_id : noteId} , 
        {$set : newData},
        { runValidators : true, returnDocument : "after"}
    )
    
    return updated
}

export const replace = async (noteId , newData)=>{
    let userId = normalizeId(newData.userId) 
    // console.log("new Data" , newData)


    let note = await notesModel.findById(noteId)
    if (!note){
        throw new Error("Note not found", { cause: 404 })
    }

    if(!note.userId.equals(userId)){
        throw new Error("You are not the owner", { cause: 403 })
    }


    let {title , content} = newData
    let replaced = await notesModel.findOneAndReplace({_id : noteId} ,
        {
            title,
            content,
            userId
        },
        { runValidators : true, returnDocument : "after"}
    )
    
    return replaced
}

export const updateAllTitle = async (userId , newTitle)=>{
    let updated = await notesModel.updateMany({userId : userId} , {$set : {title : newTitle}})
    if (updated.matchedCount === 0) {
        throw new Error("No Notes Found", { cause: 404 });
    }
    return updated
}

export const deleteNote = async (userId , noteId)=>{
    let note = await notesModel.findById(noteId)
    if (!note){
        throw new Error("Note not found", { cause: 404 })
    }

    if(!note.userId.equals(userId)){
        throw new Error("You are not the owner", { cause: 403 })
    }

    let deleted = await notesModel.findByIdAndDelete(noteId)
    
    return deleted
}

export const paginate = async (userId, limit , page)=>{
    limit = Number(limit) || 5
    page = Number(page) || 1
    let skip = (page - 1) * limit
    // console.log(limit , page, skip )
    let sorted = await notesModel.find({userId : userId}).sort({createdAt : -1}).skip(skip).limit(limit)
    if(sorted.length == 0){
        throw new Error("No Note Found", { cause: 404 })
    }
    return sorted;
}

export const getNoteById = async (userId , noteId)=>{
    let note = await notesModel.findById(noteId)
    if(!note.userId.equals(userId)){
        throw new Error("You are not the owner", { cause: 403 })
    }
    if(!note){
        throw new Error("No Note Found", { cause: 404 })
    }
    return note
}

export const getNoteByContent = async (userId , content)=>{
    let note = await notesModel.findOne({ userId , content })
    if(!note){
        throw new Error("No Note Found", { cause: 404 })
    }
    return note
}

export const getNotesWithUser = async (userId) => {
    let data = await notesModel.find({ userId })
        .select("title userId createdAt")
        .populate({ path: "userId", select: "email -_id" })
        return data
}

export const aggregateNotes = async (userId, title) => {
    const match = { userId }
    if (title) match.title = title

    let data =  await notesModel.aggregate([
        { $match: match },
        { $lookup: { from: "users", localField: "userId", foreignField: "_id", as: "user" } },
        { $unwind: "$user" },
        { $project: { title: 1, userId: 1, createdAt: 1, "user.name": 1, "user.email": 1 } }
    ])
    return data
}

export const deleteAllNotes = async (userId) => {
    return await notesModel.deleteMany({ userId })
}