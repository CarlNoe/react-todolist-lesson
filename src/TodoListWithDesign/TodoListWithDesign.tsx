import { useState } from "react";
import { Input, Select, Button, List, notification } from "antd";
import Todo from "./Todo";
import uuid from "react-uuid";

export interface Item {
  id: string;
  name: string;
}
interface Column {
  id: string;
  name: string;
  items: Item[];
}

const TodoListBasic = () => {
  const [columnNameValue, setColumnNameValue] = useState<string>("");
  const [itemValue, setItemValue] = useState<string>("");

  const [selectedColumn, setSelectedColumn] = useState<string>("");

  const [columnList, setColumnList] = useState<Column[]>([]);

  const createColumn = () => {
    const newColumn: Column = {
      id: uuid(),
      name: columnNameValue,
      items: [],
    };

    setColumnList([...columnList, newColumn]);
  };

  const createItem = () => {
    const newItem: Item = {
      id: uuid(),
      name: itemValue,
    };

    const newColumnList = columnList.map((col) => {
      if (col.id === selectedColumn) {
        return {
          ...col,
          items: [...col.items, newItem],
        };
      } else {
        return col;
      }
    });

    setColumnList(newColumnList);
  };

  const deleteItem = (item: Item) => {
    setColumnList((prevColumnList) =>
      prevColumnList.map((col) => {
        return {
          ...col,
          items: col.items.filter((i) => i.id !== item.id),
        };
      })
    );
  };

  const handleOnChangeColumnName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColumnNameValue(e.target.value);
  };

  const handleOnChangeItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemValue(e.target.value);
  };

  const handleOnClickColumn = () => {
    if (columnList.find((col) => col.name === columnNameValue)) {
      notification.error({
        message: "Column name already exists",
        description: "Please enter a different column name",
        placement: "bottomLeft",
      });
    } else {
      createColumn();
    }
  };

  const handleOnClickItem = () => {
    if (selectedColumn === "") {
      notification.error({
        message: "Select a column",
        description: "Please select a column to add an item",
        placement: "bottomLeft",
      });
    } else {
      createItem();
    }
  };

  return (
    <main>
      <div style={{ display: "flex", gap: "16px" }}>
        <Input onChange={handleOnChangeColumnName} placeholder="Col name" />
        <Button onClick={handleOnClickColumn}>Add Column</Button>
      </div>

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

      <div style={{ display: "flex", gap: "16px" }}>
        {columnList.map((col) => {
          return (
            <List
              key={col.id}
              header={
                <h3 style={{ fontWeight: "bold", textAlign: "center" }}>
                  {col.name}
                </h3>
              }
              dataSource={col.items}
              renderItem={(item) => (
                <Todo item={item} deleteItem={deleteItem} />
              )}
              style={{
                flex: 1,
                margin: "8px",
              }}
            />
          );
        })}
      </div>
    </main>
  );
};

export default TodoListBasic;
