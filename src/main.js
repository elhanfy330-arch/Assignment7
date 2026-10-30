import express from "express" 
import { connectDB , PORT } from "./database/connection.js"
import {errorHandeller} from "./common/index.js"
// import "./database/index.js"
import * as Router from "./modules/index.js"
const app = express()
app.use(express.json())

await connectDB()

app.use("/users" , Router.userRouter)
app.use("/notes" , Router.noteRouter)


app.use(errorHandeller)
app.listen(PORT , ()=>{
    console.log("Server Listen On Port ",PORT)
})   