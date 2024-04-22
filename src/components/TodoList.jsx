/* eslint-disable no-debugger */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import { selectTodosByPriority } from "../redux/todoSlice";
import { fetchedList } from "../redux/todoSlice";

import { API_BASE_URL } from "../config/api";

function TodoList() {
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
  const todos = useSelector(selectTodosByPriority);

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <ul className="mt-4">
      {todos &&
        Array.isArray(todos) &&
        todos.map((todo) => <TodoItem key={todo?._id} todo={todo} />)}
    </ul>
  );
}

export default TodoList;
