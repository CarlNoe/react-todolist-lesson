import AddColumn from "./AddColumn/AddColumn";
import AddItem from "./AddItem";
import ColumnComp from "./Column";
import ColumnModalComp from "./ColumnModal";
import ItemModalComp from "./ItemModal";
import "./TodoListRedux.css";

import { useSelector } from "react-redux";

export interface Column {
  value: string;
  label: string;
}

export interface Item {
  id: string;
  columnId: string;
  label: string;
}

const TodoListRedux = () => {
  const columns = useSelector((state: any) => state.reduxTodo.columns);
  const items = useSelector((state: any) => state.reduxTodo.items);
  const itemModal = useSelector((state: any) => state.reduxTodo.itemModal);
  const columnModal = useSelector((state: any) => state.reduxTodo.columnModal);

  return (
    <div className="todo-list-edit">
      <AddColumn />
      <AddItem />

      <div className="todo-list-edit-columns">
        {columns.map((column: Column) => (
          <ColumnComp
            key={column.value}
            value={column.value}
            label={column.label}
            columnItems={items.filter(
              (item: Item) => item.columnId === column.value
            )}
          />
        ))}
      </div>

      {itemModal && <ItemModalComp item={itemModal} />}

      {columnModal && <ColumnModalComp column={columnModal} />}
    </div>
  );
};

export default TodoListRedux;
