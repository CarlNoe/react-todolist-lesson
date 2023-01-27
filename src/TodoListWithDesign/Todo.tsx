import { Button } from "antd";
import { Item } from "./TodoListWithDesign";

interface TodoProps {
  item: Item;
  deleteItem: (item: Item) => void;
}

const Todo = ({ item, deleteItem }: TodoProps) => {
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
  );
};

export default Todo;
