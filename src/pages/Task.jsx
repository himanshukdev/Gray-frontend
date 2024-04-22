import { useNavigate } from "react-router-dom";

import { API_BASE_URL } from "../config/api";
import TodoList from "../components/TodoList";
import AddTodoForm from "../components/AddTodoForm";

function Task() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "GET",
        credentials: "include", // Include cookies for session management
      });
      if (response.ok) {
        navigate("/");
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="mx-auto p-4">
        <div className="flex justify-between items-baseline">
          <h1 className="text-3xl font-bold mb-4">Todo List</h1>
          <button
            type="button"
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        <AddTodoForm />
        <TodoList />
      </div>
    </div>
  );
}

export default Task;
