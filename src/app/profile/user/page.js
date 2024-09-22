"use client"
import UserContext from "@/context/userContext";
import { getAllTask } from "@/models/services/taskServices";
import { useState, useEffect, useContext } from "react";

export default function User() {
    const [allTask, setAllTask] = useState([]);
    const { user } = useContext(UserContext); // User from context
  console.log("user",user)
    async function getAllTaskUser() {
        try {
            const loadUserTask = await getAllTask(); // Fetch tasks
            setAllTask(loadUserTask.reverse()); // Reverse tasks and set state
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
                {allTask.map((task) => (
                    <div key={task.id} className={`shadow-lg mt-2 rounded-md ${task.status === "completed" ? "bg-green-800" : "bg-gray-800"}`}>
                        <div className="p-5">
                            <div className="flex justify-between mb-3 items-center">
                                <h1 className="text-2xl font-semibold">{task.title}</h1>
                            </div>
                            <p className="font-normal">{task.content}</p>
                            <div className="flex justify-between mt-3">
                                <p className="text-left">
                                    Status: <span className="font-bold">{task.status}</span>
                                </p>
                                <p className="text-right">
                                    Author: <span className="font-bold">{task.user?.name || "Unknown"}</span> {/* Access user name from task */}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
