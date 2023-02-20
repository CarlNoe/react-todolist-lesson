import { List } from "antd";
import { Item } from "../TodoListRedux";
import ItemComp from "./Item";
import Header from "./Header";

interface ColumnInterface {
  value: string;
  label: string;
  columnItems: Item[];
}

const Column = ({ value, label, columnItems }: ColumnInterface) => {
  return (
    <List
      className="todo-list-edit-column"
      key={value}
      header={<Header label={label} value={value} />}
      dataSource={columnItems}
      renderItem={({ label: itemLabel, id }) => (
        <ItemComp label={itemLabel} id={id} />
      )}
    />
  );
};

export default Column;
