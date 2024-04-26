import React, { useEffect, useState } from "react";
import "./Todo.css";
import { getTaskApi, addTask } from "./TodoApi";
import TaskList from "./Todo";

function TodoApp() {
  const [task, setTask] = useState("");
  const [data, setData] = useState<TaskList[]>([]);

  useEffect(() => {
    getTaskApi().then((dataApi) => setData(dataApi));
  }, []);

  const handleAddItem = () => {
    addTask({ name: task, isDone: false });
    setTask("")
  };

  const handleDeleteItem = (id: number | undefined) => {
    const newData = data.filter((prev: TaskList) => prev.id !== id);
    setData(newData);
  };

  const handleCheckItem = (id: number | undefined, check: boolean) => {
    const newData = data.map((item) => {
      if (item.id === id) {
        item.isDone = check;
      }
      return item;
    });
    setData(newData);
  };

  return (
    <div className="container">
      <header>
        <h1>To-do List</h1>
        <section className="inputBox">
          <input value={task} onChange={(e) => setTask(e.target.value)} />
          <button className="buttonBox" onClick={handleAddItem} type="button">
            Add
          </button>
        </section>
      </header>
      <main>
        <section className="content">
          {data?.length > 0 ? (
            data.map((item) => (
              <div key={item.id} className="list-box">
                <div className="list-item">
                  <input
                    type="checkbox"
                    checked={item.isDone}
                    onChange={(e) => handleCheckItem(item.id, e.target.checked)}
                  />
                  <li
                    style={{
                      textDecorationLine: item.isDone ? "line-through" : "none",
                      marginLeft: 10,
                    }}
                  >
                    {item.name}
                  </li>
                </div>
                <button onClick={() => handleDeleteItem(item.id)}>&Chi;</button>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center" }}>No data</p>
          )}
        </section>
      </main>
    </div>
  );
}

export default TodoApp;
