import { useState } from "react";

const TodoListBasic = () => {
  const [textFieldValue, setTextFieldValue] = useState<string>("");
  const [currentCategory, setCurrentCategory] = useState<string>("todos");

  const [todos, setTodos] = useState<string[]>([""]);
  const [inProgress, setInProgress] = useState<string[]>([""]);
  const [done, setDone] = useState<string[]>([""]);

  const handleOnChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextFieldValue(e.target.value);
  };

  const handleOnChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentCategory(e.target.value);
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (currentCategory === "todos") {
      setTodos([...todos, textFieldValue]);
    } else if (currentCategory === "inProgress") {
      setInProgress([...inProgress, textFieldValue]);
    } else if (currentCategory === "done") {
      setDone([...done, textFieldValue]);
    }
  };

  const generateRandomKey = () => {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  };

  return (
    <div style={{ padding: "50px" }}>
      <form onSubmit={handleOnSubmit}>
        <input onChange={handleOnChangeText} />

        <select onChange={handleOnChangeSelect}>
          <option value="todos">Todo</option>
          <option value="inProgress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <button type="submit">Add To List</button>
      </form>

      <ul
        id="todo-container"
        style={{
          display: "flex",
          width: "50%",
          justifyContent: "space-between",
        }}
      >
        <li>
          <h2 style={{ margin: "16px 0 16px 0" }}>Todo:</h2>
          <div className="task-list">
            {todos.map((todo) => (
              <p key={generateRandomKey()}>{todo}</p>
            ))}
          </div>
        </li>

        <li>
          <h2 style={{ margin: "16px 0 16px 0" }}>In Progress::</h2>
          <div className="task-list">
            {inProgress.map((inProgressTask) => (
              <p key={generateRandomKey()}>{inProgressTask}</p>
            ))}
          </div>
        </li>

        <li>
          <h2 style={{ margin: "16px 0 16px 0" }}>Done:</h2>
          <div className="task-list">
            {done.map((doneTask) => (
              <p key={generateRandomKey()}>{doneTask}</p>
            ))}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default TodoListBasic;
