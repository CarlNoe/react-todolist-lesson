import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import { Button } from "antd";

import { useDispatch } from "react-redux";
import { deleteColumn, editColumn } from "../../reduxTodoSlice";

interface HeaderInterface {
  label: string;
  value: string;
}

const Header = ({ label, value }: HeaderInterface) => {
  const dispatch = useDispatch();

  return (
    <div className="todo-list-column-header">
      {label}

      <Button
        type="primary"
        size="small"
        icon={<EditOutlined />}
        onClick={() => dispatch(editColumn(value))}
      />

      <Button
        type="primary"
        danger
        size="small"
        icon={<CloseOutlined />}
        onClick={() => dispatch(deleteColumn(value))}
      />
    </div>
  );
};

export default Header;
