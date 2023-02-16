import { Modal, Input } from "antd";
import { Item } from "../TodoListEdit";
import { useState } from "react";

interface ItemModalProps {
  isItemModalOpen: boolean;
  currentModalItem: Item;
  closeItemModal: () => void;
  editItemName: (item: Item) => void;
}

function ItemModal({
  isItemModalOpen,
  currentModalItem,
  closeItemModal,
  editItemName,
}: ItemModalProps) {
  const [newItemName, setNewItemName] = useState<string>(currentModalItem.name);
  return (
    <Modal
      title="Edit Item"
      open={isItemModalOpen}
      onCancel={() => {
        closeItemModal();
      }}
      onOk={() => {
        editItemName({
          ...currentModalItem,
          name: newItemName,
        });
        closeItemModal();
      }}
    >
      <Input
        value={newItemName}
        onChange={(e) => {
          setNewItemName(e.target.value);
        }}
      />
    </Modal>
  );
}

export default ItemModal;
