import { Button } from "antd";
import { Item } from "../../TodoListEdit";

interface ColumnItemProps {
  item: Item;
  deleteItem: (item: Item) => void;
  openItemModal: (item: Item) => void;
}

const ColumnItem = ({ item, deleteItem, openItemModal }: ColumnItemProps) => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px",
        margin: "8px 0 8px 0",
        backgroundColor: "lightgray",
      }}
      key={item.id}
    >
      <span style={{ wordWrap: "break-word" }}>{item.name}</span>
      <div>
        <Button type="primary" onClick={() => openItemModal(item)}>
          Edit
        </Button>
        <Button
          style={{ backgroundColor: "red", color: "white" }}
          type="primary"
          onClick={() => {
            deleteItem(item);
          }}
        >
          X
        </Button>
      </div>
    </div>
  );
};

export default ColumnItem;
