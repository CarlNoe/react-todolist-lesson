import { Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { ColumnData } from "../../TodoListEdit";

interface ColumnHeaderProps {
  colData: ColumnData;
  openColumnModal: (column: ColumnData) => void;
}

function ColumnHeader({ colData, openColumnModal }: ColumnHeaderProps) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <h3 style={{ fontWeight: "bold", marginRight: "8px" }}>{colData.name}</h3>
      <Button type="primary" icon={<EditOutlined />} onClick={() => {openColumnModal(colData)}} />
      <Button type="primary" danger icon={<DeleteOutlined />} onClick={() => {}} />
    </div>
  );
}

export default ColumnHeader;
