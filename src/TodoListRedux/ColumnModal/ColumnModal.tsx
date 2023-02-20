import { Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { Column } from "../TodoListRedux";
import { useDispatch } from "react-redux";
import { saveColumn, closeColumn } from "../reduxTodoSlice";

interface ColumnModalInterface {
  column: Column | undefined;
}

const ColumnModal = ({ column }: ColumnModalInterface) => {
  const dispatch = useDispatch();

  const [newColumnName, setNewColumnName] = useState<string>();

  useEffect(() => {
    setNewColumnName(column?.label);
  }, [column]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewColumnName(e.target.value);
  };

  const handleOnOk = () => {
    if (newColumnName && column) {
      dispatch(saveColumn({ ...column, label: newColumnName }));
    }
  };

  return (
    <Modal
      title="Column edition"
      open={column !== undefined}
      onOk={handleOnOk}
      okText="Save"
      onCancel={() => dispatch(closeColumn())}
      className="todo-list-edit-Column-modal"
    >
      <Input value={newColumnName} onChange={handleOnChange} />
    </Modal>
  );
};

export default ColumnModal;
