import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
const app = express()
dotenv.config()
mongoose.set('strictQuery',true)



//*connecting mongoose
const connect=async ()=>{
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('connected to mongoDB');
      } catch (error) {
        handleError(error);
      }
}

app.listen(8080,()=>{
    connect()
    console.log('backend server is running');
})

