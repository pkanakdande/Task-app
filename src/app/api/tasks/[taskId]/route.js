import Task from "@/models/task"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request,{params}){
       try{
        const {taskId}=params
        const getTask=await Task.findById(taskId)
        return NextResponse.json(getTask)
       }
       catch(error){
    console.log(error);
       }
  

}

export async function PUT(request,{params}){
    try{
      const {taskId}=params

      const {title,content,status}=await request.json()

      let task=await Task.findById(taskId)

      task.title=title,
      task.content=content,
      task.status=status

      const updatedTask=await task.save()
      return NextResponse.json(updatedTask)

    }catch(error){
        console.log(error);
    }
}
export async function DELETE(request, { params }) {
  try {
    const { taskId } = params;

    // Delete the task from the database
    await Task.deleteOne({ _id: taskId });

    // Return a success response with status 200
    return NextResponse.json({ message: "Task is deleted !!" }, { status: 200 });
  } catch (error) {
    console.error('Error deleting task:', error);

    // Return an error response with status 500
    return NextResponse.json({ message: 'Failed to delete task', error: error.message }, { status: 500 });
  }
} 