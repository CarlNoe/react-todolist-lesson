import { Modal, Input } from "antd";
import { useState } from "react";
import { ColumnData } from "../TodoListEdit";

interface ColumnModalProps {
  isColumnModalOpen: boolean;
  colData: ColumnData;
  closeColumnModal: () => void;
  editColumnName: (column: ColumnData) => void;
}

function ColumnModal({
  isColumnModalOpen,
  colData,
  closeColumnModal,
  editColumnName,
}: ColumnModalProps) {
  const [newColName, setNewColName] = useState<string>(colData.name);
  return (
    <Modal
      title="Edit Column"
      open={isColumnModalOpen}
      onCancel={() => {
        closeColumnModal();
      }}
      onOk={() => {
        editColumnName({
          ...colData,
          name: newColName,
        });
        closeColumnModal();
      }}
    >
      <Input
        value={newColName}
        onChange={(e) => {
          setNewColName(e.target.value);
        }}
      />
    </Modal>
  );
}

export default ColumnModal;
