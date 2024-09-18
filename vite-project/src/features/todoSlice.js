import { createSlice } from "@reduxjs/toolkit";
import {
  fetchTodosFromApi,
  addTodoToBackend,
  updateTodoInBackend,
  deleteTodoFromBackend,
} from "./todoThunk";

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodosFromApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodosFromApi.fulfilled, (state, action) => {
        state.todos = action.payload?.Todos || [];
        state.totalPagesCount = action.payload?.count || 0;
        state.loading = false;
      })
      .addCase(fetchTodosFromApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addTodoToBackend.fulfilled, (state, action) => {
        state.todos.unshift(action.payload);
      })
      .addCase(updateTodoInBackend.fulfilled, (state, action) => {
        const updatedTodo = action.payload;
        console.log("utp: ", updatedTodo);
        const index = state.todos.findIndex(
          (todo) => todo._id === updatedTodo._id
        );

        console.log("index: ", index);

          state.todos[index] = updatedTodo; 
      })

      .addCase(deleteTodoFromBackend.fulfilled, (state, action) => {
        const index = state.todos.findIndex(
          (todo) => todo._id === action.payload
        );
        if (index !== -1) {
          state.todos.splice(index, 1);
        }
      });
  },
});

export const { toggleComplete, updateTodoText } = todoSlice.actions;

export default todoSlice.reducer;
