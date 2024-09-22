import UserContext from "@/context/userContext";
import Swal from 'sweetalert2';
import React, { useContext } from "react";
import { ImCross } from "react-icons/im";

const Task = ({ task, deleteTaskparents }) => {
  const { user } = useContext(UserContext);

  function deleteTasks(taskId) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn-confirm", // Custom class for confirm button
        cancelButton: "btn-cancel",   // Custom class for cancel button
        title: "swal-title",           // Optional: Custom class for title
        content: "swal-content"        // Optional: Custom class for content
      },
      buttonsStyling: false
    });

    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete it!!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTaskparents(taskId);
        Swal.fire(
          "Deleted!",
          "Your task has been deleted.",
          "success"
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          "Cancelled",
          "Your task is safe :)",
          "error"
        );
      }
    });
  }

  return (
    <div className={`shadow-lg mt-2 rounded-md ${task.status === "completed" ? "bg-green-800" : "bg-gray-800"}`}>
      <div className="p-5">
        <div className="flex justify-between mb-3 items-center">
          <h1 className="text-2xl font-semibold">{task.title}</h1>
          <span onClick={() => deleteTasks(task._id)} className="cursor-pointer">
            <ImCross />
          </span>
        </div>
        <p className="font-normal">{task.content}</p>
        <div className="flex justify-between mt-3">
          <p className="text-left">
            Status: <span className="font-bold">{task.status}</span>
          </p>
          <p className="text-right">
            Author: <span className="font-bold">{user ? user.name : "Unknown"}</span>
          </p>
        </div>
      </div>

     
    
    </div>
  );
};

export default Task;
