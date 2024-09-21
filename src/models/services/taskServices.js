import { httpAxios } from "@/helper/httpHelper";

export async function addTask(task) {
  const result = await httpAxios
    .post("/api/tasks", task)
    .then((response) => response.data);
  return result;
}

export async function getTaskUser(userId) {
   const result = await httpAxios
     .get(`/api/users/${userId}/tasks`)
     .then((response) => response.data);
   return result;
 }
 
 
// Assuming you have httpAxios setup

 export async function deleteTask(taskId) {
   try {
     const response = await httpAxios.delete(`/api/tasks/${taskId}`);
     return response.data;
   } catch (error) {
     console.error("Error in deleteTask service:", error.message);
     throw error;  // Rethrow the error to be caught in the component
   }
 }
 