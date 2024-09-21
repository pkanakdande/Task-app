import User from "@/models/user";
import jwt from "jsonwebtoken"
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import { cookies } from 'next/headers'
import { connectDb } from "@/helper/db";
connectDb()

export  async function POST(request){

  const {email,password}=await request.json()
try{
     const user=await User.findOne({email:email}) 
    
     if(user == null)
        {
            throw new Error("User not found")
        }

      const matchUser=bcrypt.compareSync(password,user.password)
      if(!matchUser)
        {
            throw new Error("Password not match")
        }

      const token=jwt.sign({
          _id:user._id,
          name:user.name

        },process.env.JWT_KEY)
          
        // cookie
        const response=NextResponse.json({
          message:"login success !!",
          success:true,
          user:user
         })
        
         response.cookies.set("authToken",token,{
          expiresIn:"1d",
          httpOnly:true
         })


        return response





    
}
catch(error){
    console.log(error);
    return NextResponse.json({
        success:false,
        message:error.message
     },{
      status:500
     })
}
}