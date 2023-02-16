import { List } from "antd";
import { Item, ColumnData } from "../TodoListEdit";
import ColumnItem from "./ColumnItem/ColumnItem";
import ColumnHeader from "./ColumnHeader/ColumnHeader";

interface ColumnProps {
  colData: ColumnData;
  deleteItem: (item: Item) => void;
  openItemModal: (item: Item) => void;
  openColumnModal: (column: ColumnData) => void;
}

function Column({ deleteItem, openItemModal, openColumnModal, colData }: ColumnProps) {
  return (
    <List
      header={<ColumnHeader colData={colData} openColumnModal={openColumnModal} />}
      dataSource={colData.items}
      renderItem={(item) => (
        <ColumnItem item={item} deleteItem={deleteItem} openItemModal={openItemModal} />
      )}
      style={{
        flex: 1,
        margin: "8px",
      }}
    />
  );
}

export default Column;
