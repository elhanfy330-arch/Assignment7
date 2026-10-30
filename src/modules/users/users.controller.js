import { Router } from "express";
import { successResponse , normalizeId } from "../../common/index.js";
import * as service from "./users.service.js"
export let userRouter = Router()

userRouter.post("/signup" ,async (req,res)=>{
    let data = await service.signup(req.body)
    successResponse({res , data , message : "User Added Successfully" , status : 201})
})

userRouter.post("/login" ,async (req,res)=>{
    let data = await service.login((req.body))
    successResponse({res , message : "verified"})
})

userRouter.patch("/:id" ,async (req,res)=>{
    let id = normalizeId(req.params.id)
    let data = await service.update(id , req.body)
    // console.log("id from controllelr " , id)
    successResponse({res , message : "User Updated"})
})

userRouter.delete("/",async (req,res)=>{
    let id = normalizeId(req.query.id)
    let data = await service.deleteLog(id)
    successResponse({res,message : "User Deleted"})
})

userRouter.get("/",async (req,res)=>{
    let id = normalizeId(req.query.id)
    let data = await service.getLog(id)
    successResponse({res, data, message : "Found"})
})