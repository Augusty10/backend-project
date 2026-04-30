import dotenv from "dotenv";
import mongoose, { Mongoose } from "mongoose";
import {DB_NAME} from "./constants.js";
import connectDB from "./db/index.js";

dotenv.config({
    path: "./.env"
})



console.log("URI:", process.env.MONGODB_URI);
console.log("DB NAME:", DB_NAME);
connectDB()







/*
 
//first approch 

import express from "express"
const app = express()


( async ()=> {
  try{
     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    app.on("error", (error)=>{
        console.log("Error : ", error);
        throw error
    })
  app.listen(process.env.PORT, ()=>{
    console.log(`App is listenin on port ${process.env.PORT}`);

  })


  }catch(error){
    console.error("ERROR:", error)
    throw error
  }

})()
*/