import { Router } from "express";
import * as service from "./notes.service.js"
import { normalizeId, successResponse } from "../../common/index.js";
export let noteRouter = Router()

noteRouter.delete("/", async (req, res) => {
    let userId = normalizeId(req.query.userId)
    await service.deleteAllNotes(userId)
    successResponse({ res, message: "Deleted" })
})

noteRouter.get("/aggregate", async (req, res) => {
    let userId = normalizeId(req.query.userId)
    let data = await service.aggregateNotes(userId, req.query.title)
    successResponse({ res, data, message: "Found" })
})

noteRouter.get("/note-with-user", async (req, res) => {
    let userId = normalizeId(req.query.userId)
    let data = await service.getNotesWithUser(userId)
    successResponse({ res, data, message: "Found" })
})


noteRouter.get("/note-by-content" , async (req,res)=>{
    let userId = normalizeId(req.query.userId) 
    let data = await service.getNoteByContent(userId ,req.query.content)
    successResponse({res ,data, message : "Found"})
})

noteRouter.get("/paginate-sort" , async (req,res)=>{
    let userId = normalizeId(req.query.userId)
    let data = await service.paginate(userId, req.query.limit, req.query.page)
    successResponse({res ,data})
})


noteRouter.patch("/all" , async(req,res)=>{
    let userId = normalizeId(req.query.userId)
    let data = await service.updateAllTitle(userId , req.body.title)
    successResponse({res ,data, message : "Notes Updated"})
})


noteRouter.post("/:id" , async (req,res)=>{
    let userId= normalizeId(req.params.id)
    console.log(userId)
    await service.addNotes(userId,req.body)
    successResponse({res , message : "Note Created"}) 
})

noteRouter.patch("/:noteId/" , async (req,res)=>{
    let userId = normalizeId(req.query.userId) 
    let noteId = normalizeId(req.params.noteId)
    
    let data = await service.updateNote(userId , noteId , req.body)
    successResponse({res ,data, message : "Note Updated"})
})

noteRouter.put("/replace/:noteId/" , async (req,res)=>{
    let noteId = normalizeId(req.params.noteId)
    let data = await service.replaceNote( noteId , req.body)
    successResponse({res ,data, message : "Note Updated"})
})

noteRouter.delete("/:noteId/" , async (req,res)=>{
    let userId = normalizeId(req.query.userId) 
    let noteId = normalizeId(req.params.noteId)
    
    let data = await service.deleteNote(userId , noteId )
    successResponse({res ,data, message : "Note Deleted"})
})

noteRouter.get("/:noteId" , async (req,res)=>{
    let userId = normalizeId(req.query.userId) 
    let noteId = normalizeId(req.params.noteId)
    
    let data = await service.getNoteById(userId , noteId )
    successResponse({res ,data, message : "Found"})
})





