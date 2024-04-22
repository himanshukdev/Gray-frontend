import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/api";
import { fetchedList } from "../redux/todoSlice";

function AddTodoForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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

  const addTaskApi = async (taskData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/task/add-task`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(taskData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setTitle("");
        setDescription("");
        await fetchTasks();
      } else if (response.status === 401) {
        navigate("/");
      } else {
        console.error("Failed to fetch tasks:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTaskApi({ title, description });
  };

  return (
    <form className="flex justify-between items-center" onSubmit={handleSubmit}>
      <input
        name="title"
        type="text"
        value={title}
        onChange={handleTitleChange}
        className="border rounded px-3 py-2 flex-grow mr-2"
        placeholder="Add a task title..."
      />
      <input
        name="description"
        type="text"
        value={description}
        onChange={handleDescriptionChange}
        className="border rounded px-3 py-2 flex-grow mr-2"
        placeholder="Add a task description..."
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Task
      </button>
    </form>
  );
}

export default AddTodoForm;
