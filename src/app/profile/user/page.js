"use client";
import UserContext from "@/context/userContext";
import { getAllTask } from "@/models/services/taskServices";
import { useState, useEffect, useContext } from "react";

export default function User() {
  const [allTask, setAllTask] = useState([]);
  const { user } = useContext(UserContext); // User from context
  console.log("user", user);

  async function getAllTaskUser() {
    try {
      const loadUserTask = await getAllTask(); // Fetch tasks
      if (loadUserTask && Array.isArray(loadUserTask)) {
        setAllTask(loadUserTask.reverse()); // Reverse tasks and set state
      } else {
        console.error("Invalid task data");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
    }
  }

  useEffect(() => {
    getAllTaskUser(); // Fetch tasks on component mount
  }, []);

  return (
    <div className="text-white grid grid-cols-12">
      <div className="col-span-6 col-start-4">
        <h1 className="text-3xl">User's Tasks</h1>
        {allTask.length > 0 ? (
          allTask.map((task) => (
            <div
              key={task._id} // Use _id or id based on your DB structure
              className={`shadow-lg mt-2 rounded-md ${
                task.status === "completed" ? "bg-green-800" : "bg-gray-800"
              }`}
            >
              <div className="p-5">
                <div className="flex justify-between mb-3 items-center">
                  <h1 className="text-2xl font-semibold">{task.title}</h1>
                </div>
                <p className="font-normal">{task.content}</p>
                <div className="flex justify-between mt-3">
                  <p className="text-left">
                    Status: <span className="font-bold">{task.status}</span>
                  </p>
                 
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No tasks available</p>
        )}
      </div>
    </div>
  );
}
