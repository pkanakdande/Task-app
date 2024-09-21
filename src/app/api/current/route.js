import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "@/models/user";
import { connectDb } from "@/helper/db";

export async function GET(request) {
  try {
    await connectDb(); // Ensure the database is connected

    // Get the authToken from cookies
    const authToken = request.cookies.get("authToken")?.value;
    if (!authToken) {
      return NextResponse.json({ error: "Token not provided" }, { status: 401 });
    }

    // Verify the JWT
    let data;
    try {
      data = jwt.verify(authToken, process.env.JWT_KEY);
    } catch (error) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 403 });
    }

    // Fetch the user from the database
    const user = await User.findById(data._id).select("-password");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return the user data
    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
