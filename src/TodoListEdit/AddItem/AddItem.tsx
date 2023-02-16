import { Input, Button, Select } from "antd";
import { ColumnData } from "../TodoListEdit";

interface AddItemProps {
  handleOnChangeItem: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnClickItem: () => void;
  columnList: ColumnData[];
  setSelectedColumn: (e: string) => void;
}

function AddItem({
  handleOnChangeItem,
  handleOnClickItem,
  columnList,
  setSelectedColumn,
}: AddItemProps) {
  return (
    <div style={{ display: "flex", gap: "16px" }}>
      <Input onChange={handleOnChangeItem} placeholder="Item Name" />
      <Select
        onChange={(e) => {
          setSelectedColumn(e);
        }}
        style={{ width: 160 }}
        placeholder="Select a column"
        options={columnList.map((col) => {
          return {
            label: col.name,
            value: col.id,
          };
        })}
      />
      <Button onClick={handleOnClickItem}>Add Item</Button>
    </div>
  );
}

export default AddItem;
