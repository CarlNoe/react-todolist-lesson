import { Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { Item } from "../TodoListRedux";
import { useDispatch, useSelector } from "react-redux";
import { closeItem, saveItem } from "../reduxTodoSlice";

interface ItemModalInterface {
  item: Item | undefined;
}

const ItemModal = ({ item }: ItemModalInterface) => {
  const dispatch = useDispatch();
  const columns = useSelector((state: any) => state.reduxTodo.columns);
  
  const [newItemName, setNewItemName] = useState<string>();
  const [newItemColumn, setNewItemColumn] = useState<string>();

  useEffect(() => {
    setNewItemName(item?.label);
    setNewItemColumn(item?.columnId);
  }, [item]);

  const handleOnSave = () => {
    if (newItemName && newItemColumn && item) {
      dispatch(
        saveItem({ id: item?.id, label: newItemName, columnId: newItemColumn })
      );
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewItemName(e.target.value);
  };

  const handleOnCategoryChange = (newValue: string) => {
    setNewItemColumn(newValue);
  };

  return (
    <Modal
      title="Item edition"
      open={item !== undefined}
      onOk={handleOnSave}
      okText="Save"
      onCancel={() => dispatch(closeItem())}
      className="todo-list-edit-item-modal"
    >
      <Input value={newItemName} onChange={handleOnChange} />
      <Select
        placeholder="Select column"
        onChange={handleOnCategoryChange}
        value={newItemColumn}
        options={columns}
      />
    </Modal>
  );
};

export default ItemModal;
