import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: JSON.parse(localStorage.getItem("to-do-history")) || [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    fetchedList: (state, action) => {
      state.todos = action.payload;
      localStorage.setItem("to-do-history", JSON.stringify(action.payload));
    },
  },
});

export const { fetchedList } = todoSlice.actions;

export const selectTodosByPriority = (state) => {
  return state?.todos?.todos?.slice().sort((a, b) => {
    const dateA = new Date(a.updatedAt);
    const dateB = new Date(b.updatedAt);

    return dateB - dateA;
  });
};

export default todoSlice.reducer;
