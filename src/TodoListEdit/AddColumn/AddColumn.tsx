import { Input, Button } from "antd";

interface AddColumnProps {
  handleOnChangeColumnName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnClickColumn: () => void;
}

function AddColumn({
  handleOnChangeColumnName,
  handleOnClickColumn,
}: AddColumnProps) {
  return (
    <div style={{ display: "flex", gap: "16px" }}>
      <Input onChange={handleOnChangeColumnName} placeholder="Col name" />
      <Button onClick={handleOnClickColumn}>Add Column</Button>
    </div>
  );
}

export default AddColumn;
