import mongoose from "mongoose"
import { user } from "@/models/user"

export const connectDb=async()=>{

    try{
 const {connection}=await mongoose.connect(process.env.MONGODB_URI,{
    dbName:"Work_Manager"
  })
  console.log("db connected")
//   console.log(connection)

// const uuser=new user({
//     name:"pranav",
//     email:"password",
//     password:"pass123",
//     about:"web developer"
// })
//  await uuser.save()
    }
    catch(error){
        console.log(error.message)
    }
}

connectDb()