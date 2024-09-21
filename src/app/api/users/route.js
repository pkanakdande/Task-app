
import { connectDb } from "@/helper/db"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server"
import User from "@/models/user"
connectDb()

export async function GET(request){
  let users=[]
  try{
    await connectDb()
    users=await User.find()
  }
  catch(error){
    return NextResponse.json({
      message:"get api error"
    })
  }
  return NextResponse.json(users)
}
export async function POST(request) {
  try {
    await connectDb(); // Connect to the database

    const { name, email, password, about, profileUrl } = await request.json();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        {
          message: 'User already exists',
        },
        {
          status: 409, // Conflict status code
        }
      );
    }
    const user = new User({
      name,
      email,
      password,
      about,
      profileUrl,
    });

    user.password=bcrypt.hashSync(user.password,parseInt(process.env.BCRYPT_SALT)) 

    const createUser = await user.save();

    const response= NextResponse.json(user, {
      status: 201,
    });
    return response
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: 'Failed to create user',
      },
      {
        status: false,
      },
      {
        status:500
      }
    );
  }
}








export function PUT(){

}
export function DELETE(request){
    console.log("deleted")
     return NextResponse.json({
        message:"deleted",
        status:201
     })
}