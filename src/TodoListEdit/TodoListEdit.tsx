/*

  NOTE: Il y a pas mal de duplication au niveau des modals, je pense que 1 aurait pu suffire, 
  mais j'ai vu que vous aviez fait 2 fichiers dans votre exemple, 
  donc j'ai essayer de faire quelque chose qui pourrait s'en approcher.

*/

import { useState } from "react";
import { notification } from "antd";
import Column from "./Column/Column";
import ItemModal from "./ItemModal/ItemModal";
import ColumnModal from "./ColumnModal/ColumnModal";
import AddColumn from "./AddColumn/AddColumn";
import AddItem from "./AddItem/AddItem";
import uuid from "react-uuid";

export interface Item {
  id: string;
  name: string;
}
export interface ColumnData {
  id: string;
  name: string;
  items: Item[];
}

const TodoListBasic = () => {
  const [columnNameValue, setColumnNameValue] = useState<string>("");
  const [itemValue, setItemValue] = useState<string>("");

  const [selectedColumn, setSelectedColumn] = useState<string>("");

  const [columnList, setColumnList] = useState<ColumnData[]>([]);

  const [isItemModalOpen, setIsItemModalOpen] = useState<boolean>(false);
  const [currentModalItem, setCurrentModalItem] = useState<Item>({
    id: "",
    name: "",
  });

  const [isColumnModalOpen, setIsColumnModalOpen] = useState<boolean>(false);
  const [currentModalColumn, setCurrentModalColumn] = useState<ColumnData>({
    id: "",
    name: "",
    items: [],
  });

  const createColumn = () => {
    const newColumn: ColumnData = {
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

  const openItemModal = (item: Item) => {
    setIsItemModalOpen(true);
    setCurrentModalItem(item);
  };

  const closeItemModal = () => {
    setIsItemModalOpen(false);
  };

  const editItemName = (item: Item) => {
    const newColumnList = columnList.map((col) => {
      return {
        ...col,
        items: col.items.map((oldItem) => {
          if (oldItem.id === item.id) {
            return {
              ...oldItem,
              name: item.name,
            };
          } else {
            return oldItem;
          }
        }),
      };
    });

    setColumnList(newColumnList);
  };

  const openColumnModal = (column: ColumnData) => {
    setIsColumnModalOpen(true);
    setCurrentModalColumn(column);
  };

  const closeColumnModal = () => {
    setIsColumnModalOpen(false);
  };

  const editColumnName = (column: ColumnData) => {
    const newColumnList = columnList.map((col) => {
      if (col.id === column.id) {
        return {
          ...col,
          name: column.name,
        };
      } else {
        return col;
      }
    });

    setColumnList(newColumnList);
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
      <AddColumn
        handleOnChangeColumnName={handleOnChangeColumnName}
        handleOnClickColumn={handleOnClickColumn}
      />

      <AddItem
        handleOnChangeItem={handleOnChangeItem}
        handleOnClickItem={handleOnClickItem}
        columnList={columnList}
        setSelectedColumn={setSelectedColumn}
      />

      <div style={{ display: "flex", gap: "16px" }}>
        {columnList.map((colData) => {
          return (
            <Column
              key={colData.id}
              colData={colData}
              deleteItem={deleteItem}
              openItemModal={openItemModal}
              openColumnModal={openColumnModal}
            />
          );
        })}
      </div>
      <ItemModal
        isItemModalOpen={isItemModalOpen}
        closeItemModal={closeItemModal}
        currentModalItem={currentModalItem}
        editItemName={editItemName}
      />
      <ColumnModal
        isColumnModalOpen={isColumnModalOpen}
        closeColumnModal={closeColumnModal}
        colData={currentModalColumn}
        editColumnName={editColumnName}
      />
    </main>
  );
};

export default TodoListBasic;
