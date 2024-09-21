"use client"

import React, { useState } from "react";
import taskSvg from "../../assets/tasks.svg";
import Image from "next/image";
import { addTask } from "@/models/services/taskServices";


import { toast } from "react-toastify";

 const metadata = {
  title: "Add-task:Work Flow",
};

const AddTask = () => {
// document.title=metadata.title
  const [task,setTask]=useState({
    title:"",
    content:"",
    status:"none",
    userId:"666eea9aa300990f8537b8ee"
  })

  const handleSubmit=async(e)=>{
     e.preventDefault()

     // validate user
     try{
    const result=await addTask(task)
    toast.success("Your task is added...",{position:"top-center"})
  
     }
     catch(error){
console.log(error);
toast.error("Task not added !!",{
  position:"top-center"
})
     }
  }

  return (
    <div className="grid grid-cols-12 justify-center text-white">
      <div className="col-span-4 col-start-5 p-3">
        <div className="my-8 flex justify-center mb-3">
          <Image
            src={taskSvg}
            style={{ width: "50%" }}
            className=""
            alt="task-logo"
          />
        </div>

        <h1 className="text-2xl mb-2 text-center">Add your Task here!!</h1>

        <form className="flex flex-col space-y-3 " onSubmit={handleSubmit}>
          <label className="block font-medium mb-2">
            <span className="mb-2">Title</span>
            <input
              type="text"
              name="title-task"
              placeholder="Your title here"
              className="p-1 block w-full bg-gray-500 rounded-3xl shadow-sm focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 dark:bg-gray-100"
              onChange={(e)=>{
                setTask({
                  ...task,
                  title:e.target.value
                })
              }}
              value={task.title}
            />
          </label>
          <label className="block font-medium mb-2">
            <span className="mb-1">Content</span>
            <textarea
              rows="3"
              name="task-content"
              className="p-1 block w-full rounded-md bg-gray-500 focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 dark:bg-gray-100"
              onChange={(e)=>{
                setTask({
                  ...task,
                  content:e.target.value
                })
              }}
              value={task.content}
            ></textarea>
          </label>
          <select
            id="status"
            name="status"
            className="w-full p-1 rounded-3xl bg-gray-500 focus:ring-gray-400-100 border border-gray-800 "
            onChange={(e)=>{
              setTask({
                ...task,
                status:e.target.value
              })
            }}
            value={task.status}
          >
            <option value="none"  disabled>
              ---select-status---
            </option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <div className="flex space-x-4 justify-center mt-1">
            <button
              type="submit"
              className="bg-blue-500 self-center px-5 py-1 text-lg rounded focus:ring hover:ring focus:ring-opacity-75 dark:bg-violet-600 dark:text-gray-50 focus:dark:ring-violet-600 hover:dark:ring-violet-600"
            >
              Add-Task
            </button>
            <button
              type="submit"
              className=" bg-orange-600 self-center px-3 py-1 text-lg rounded focus:ring hover:ring focus:ring-opacity-75 dark:bg-orange-600 dark:text-orange-50 focus:dark:ring-orange-600 hover:dark:ring-orange-600"
            >
              Clear
            </button>
          </div>
          {/* {JSON.stringify(task)} */}
        </form>
      </div>
    </div>
  );
};

export default AddTask;
