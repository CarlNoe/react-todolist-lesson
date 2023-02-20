import React, { useState } from "react";
import { Button, Input, Select } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../reduxTodoSlice";

const AddItem = () => {
  const dispatch = useDispatch();
  const columns = useSelector((state: any) => state.reduxTodo.columns);

  const [newItemName, setNewItemName] = useState<string>("");
  const [newItemColumn, setNewItemColumn] = useState<string>();

  const handleOnItemNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewItemName(e.target.value);
  };

  const handleOnCategoryChange = (newValue: string) => {
    setNewItemColumn(newValue);
  };

  const handleOnClickNewItem = () => {
    if (newItemName && newItemColumn) {
      dispatch(addItem({ label: newItemName, columnId: newItemColumn }));
    }

    setNewItemName("");
    setNewItemColumn(undefined);
  };

  return (
    <div className="todo-list-edit-add-item">
      <Input
        placeholder="Item name"
        onChange={handleOnItemNameChange}
        value={newItemName}
      />

      <Select
        placeholder="Select column"
        onChange={handleOnCategoryChange}
        value={newItemColumn}
        options={columns}
      />

      <Button
        disabled={!newItemName?.length || !newItemColumn}
        onClick={handleOnClickNewItem}
      >
        Add Item
      </Button>
    </div>
  );
};

export default AddItem;
