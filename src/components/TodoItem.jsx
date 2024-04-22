import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { fetchedList } from "../redux/todoSlice";

import { API_BASE_URL } from "../config/api";

function TodoItem({ todo }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/task/all-task`, {
        method: "GET",
        credentials: "include", // Include cookies for session management
      });
      if (response.ok) {
        const data = await response.json();
        dispatch(fetchedList(data.data));
      } else if (response.status === 401) {
        navigate("/");
      } else {
        console.error("Failed to fetch tasks:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  const updateTask = async (taskId, updatedTaskData) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/task/update-task/${taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include cookies for session management
          body: JSON.stringify(updatedTaskData),
        }
      );
      if (response.ok) {
        await fetchTasks();
      } else if (response.status === 401) {
        navigate("/");
      } else {
        console.error("Failed to update task:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/task/delete-task/${taskId}`,
        {
          method: "DELETE",
          credentials: "include", // Include cookies for session management
        }
      );
      if (response.ok) {
        await fetchTasks();
      } else if (response.status === 401) {
        navigate("/");
      } else {
        console.error("Failed to delete task:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleRemove = () => {
    deleteTask(todo?._id);
  };

  const handleStatusChange = (e) => {
    const subjectToChange = { status: e.target.value };
    updateTask(todo._id, subjectToChange);
  };

  return (
    <li className="flex justify-between items-center border-b py-2">
      <div className="flex flex-col items-start">
        <span
          className={`text-lg ${
            todo.status === "COMPLETED" ? "line-through text-gray-500" : ""
          }`}
        >
          {todo?.title}
        </span>
        <textarea
          defaultValue={todo?.description}
          className="w-full rounded-md border border-gray-300 p-2 text-gray-500 bg-gray-200 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
          disabled
        />
      </div>
      <div className="flex items-center">
        <select
          className="border rounded px-2 py-1 mr-2"
          value={todo.status}
          onChange={handleStatusChange}
        >
          <option value="TODO">TO DO</option>
          <option value="INPROGESS">IN PROGESS</option>
          <option value="COMPLETED">COMPLETED</option>
        </select>
        <button
          className="px-2 py-1 bg-red-500 text-white rounded"
          onClick={handleRemove}
        >
          Remove
        </button>
      </div>
    </li>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.string,
  }),
};

export default TodoItem;
