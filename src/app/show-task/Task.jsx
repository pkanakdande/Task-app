import UserContext from "@/context/userContext";
import Swal from 'sweetalert2';
import React, { useContext } from "react";
import { ImCross } from "react-icons/im";

const Task = ({ task, deleteTaskparents }) => {
  const { user } = useContext(UserContext);

  function deleteTasks(taskId) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success custom-confirm-button",
        cancelButton: "btn btn-danger custom-cancel-button"
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTaskparents(taskId);
        swalWithBootstrapButtons.fire(
          "Deleted!",
          "Your task has been deleted.",
          "success"
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
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

      {/* Custom CSS for SweetAlert buttons */}
      <style jsx>{`
        .custom-confirm-button {
          background-color: #28a745; /* Green */
          color: white;
          border-radius: 5px;
          padding: 10px 20px;
          border: none;
          transition: background-color 0.3s;
        }

        .custom-confirm-button:hover {
          background-color: #218838; /* Darker green on hover */
        }

        .custom-cancel-button {
          background-color: #dc3545; /* Red */
          color: white;
          border-radius: 5px;
          padding: 10px 20px;
          border: none;
          transition: background-color 0.3s;
        }

        .custom-cancel-button:hover {
          background-color: #c82333; /* Darker red on hover */
        }
      `}</style>
    </div>
  );
};

export default Task;
