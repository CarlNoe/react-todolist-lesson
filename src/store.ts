import { configureStore } from "@reduxjs/toolkit";
import reduxTodoSlice from "./TodoListRedux/reduxTodoSlice";

const store = configureStore({
  reducer: {
    reduxTodo: reduxTodoSlice,
  },
});

export default store;