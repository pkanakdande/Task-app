"use client";

import React, { useContext, useEffect, useState } from 'react';
import { deleteTask, getTaskUser } from '@/models/services/taskServices';
import UserContext from '@/context/userContext';
import Task from './Task';
import { toast } from 'react-toastify';

const ShowTaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const { user } = useContext(UserContext);

  // Function to load tasks for the user
  async function loadTask(userId) {
    try {
      const fetchedTasks = await getTaskUser(userId);
      setTasks([...fetchedTasks].reverse());
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
    }
  }

  // Load tasks when the user is available
  useEffect(() => {
    if (user) {
      loadTask(user._id);
    }
  }, [user]);

  // Function to delete a task
  async function deleteTaskparents(taskId) {
    try {
      await deleteTask(taskId);  // Delete task via service
      const updatedTasks = tasks.filter(task => task._id !== taskId);  // Remove task from state
      setTasks(updatedTasks);  // Update state
      toast.success("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error.message);
      toast.error("Failed to delete task");
    }
  }

  return (
    <div className="grid grid-cols-12 mt-3 text-white">
      <div className="col-span-6 col-start-4">
        <h1 className="text-3xl mb-2">Your tasks ({tasks.length})</h1>
        {tasks.map((task) => (
          <Task task={task} key={task._id} deleteTaskparents={deleteTaskparents} />
        ))}
      </div>
    </div>
  );
};

export default ShowTaskPage;
