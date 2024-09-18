import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
} from "../Services/todoServices";
export const fetchTodosFromApi = createAsyncThunk(
  "todos/fetchTodos",
  async (params) => {
    const response = await getTodos(params);
    return response.data;
  }
);

export const addTodoToBackend = createAsyncThunk(
  "todos/addTodoToBackend",
  async ({ text, status }) => {
    const response = await addTodo(text, status);
    return response.todo;
  }
);

export const updateTodoInBackend = createAsyncThunk(
  "todos/updateTodoInBackend",
  async ({ id, text, status }) => {
    const response = await updateTodo(id, text, status);
    return response.data;
  }
);

export const deleteTodoFromBackend = createAsyncThunk(
  "todos/deleteTodoFromBackend",
  async (id) => {
    const response = await deleteTodo(id);
    return id;
  }
);
