import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Column, Item } from "./TodoListRedux";
import uuid from "react-uuid";

interface reduxTodoState {
  columns: Column[];
  items: Item[];
  itemModal?: Item;
  columnModal?: Column;
}

const initialState: reduxTodoState = {
  columns: [{ value: "1", label: "To Do" }],
  items: [{ id: "1", label: "Learn React", columnId: "1" }],
  itemModal: undefined,
  columnModal: undefined,
};

const reduxTodoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addColumn: (state, action: PayloadAction<string>) => {
      const newColumn = {
        value: uuid(),
        label: action.payload,
      };
      state.columns.push(newColumn);
    },

    addItem: (
      state,
      action: PayloadAction<{ label: string; columnId: string }>
    ) => {
      const newItem = {
        id: uuid(),
        label: action.payload.label,
        columnId: action.payload.columnId,
      };
      state.items.push(newItem);
    },

    deleteItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    deleteColumn: (state, action: PayloadAction<string>) => {
      const columnId = action.payload;
      state.columns = state.columns.filter(
        (column) => column.value !== columnId
      );
      state.items = state.items.filter((item) => item.columnId !== columnId);
    },

    editItem: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        state.itemModal = item;
      }
    },

    editColumn: (state, action: PayloadAction<string>) => {
      const column = state.columns.find(
        (column) => column.value === action.payload
      );
      if (column) {
        state.columnModal = column;
      }
    },

    closeItem: (state) => {
      state.itemModal = undefined;
    },

    closeColumn: (state) => {
      state.columnModal = undefined;
    },

    saveItem: (state, action: PayloadAction<Item>) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
      state.itemModal = undefined;
    },

    saveColumn: (state, action: PayloadAction<Column>) => {
      state.columns = state.columns.map((column) =>
        column.value === action.payload.value ? action.payload : column
      );
      state.columnModal = undefined;
    },
  },
});

export const {
  addColumn,
  addItem,
  deleteItem,
  deleteColumn,
  editItem,
  editColumn,
  closeItem,
  closeColumn,
  saveItem,
  saveColumn,
} = reduxTodoSlice.actions;

export default reduxTodoSlice.reducer;
