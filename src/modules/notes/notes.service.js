import * as dao from "../../repos/notes.repo.js"

export const addNotes = async (userId,content)=>{
    let note = await dao.addNotes(userId,content)
    return note
}

export const updateNote = async (userId , noteId , newData)=>{
    // console.log("new Data" , newData)
    let updated = await dao.updateNote(userId , noteId , newData)
    return updated
}

export const replaceNote = async (noteId , newData)=>{
    let replaced = await dao.replace( noteId , newData)
    return replaced
}

export const updateAllTitle = async (userId , newTitle)=>{
    let updated = await dao.updateAllTitle(userId , newTitle)
    return updated
}

export const deleteNote = async (userId , noteId )=>{
    let deleted = await dao.deleteNote(userId , noteId)
    return deleted
}

export const paginate = async (userId, limit , page)=>{
    let sorted = await dao.paginate(userId, limit, page)
    return sorted
}

export const getNoteById = async (userId , noteId)=>{
    let note = await dao.getNoteById(userId , noteId)
    return note
}

export const getNoteByContent = async (userId , content)=>{
    let note = await dao.getNoteByContent(userId , content)
    return note
}

export const getNotesWithUser = async (userId) => {
    return await dao.getNotesWithUser(userId)
}

export const aggregateNotes = async (userId, title) => {
    return await dao.aggregateNotes(userId, title)
}

export const deleteAllNotes = async (userId) => {
    const result = await dao.deleteAllNotes(userId)
    if (result.deletedCount === 0) {
        throw new Error("No Note Found", { cause: 404 })
    }
    return result
}