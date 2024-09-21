import Task from "@/models/task";
import { NextResponse } from "next/server";
import { connectDb } from "@/helper/db";
import jwt from "jsonwebtoken";

// GET request to fetch tasks
export async function GET(request) {
  try {
    await connectDb();
    const getData = await Task.find();
    return NextResponse.json(getData);
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to load Task",
    });
  }
}

// POST request to create a new task
export async function POST(request) {
  try {
    await connectDb(); // Connect to the database

    const { title, content, userId,status} = await request.json();

    // Get the auth token from cookies
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

    // Create a new task with the user ID from the JWT
    const task = new Task({
      title,
      content,
      userId: data._id,
      status // Assuming the JWT payload contains _id for the user
    });

    const createdTask = await task.save();

    return NextResponse.json(createdTask, {
      status: 200,
    });
  } catch (error) {
    console.error("Error creating task:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create Task!!",
        error: error.message, // Include the error message for debugging
      },
      {
        status: 500,
      }
    );
  }
}


