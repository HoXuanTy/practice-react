import { ChangeEvent, useEffect, useRef, useState } from "react";
import "./Todo.css";
import {
  getTaskApi,
  addTask,
  deleteTask,
  checkTask,
  checkAllTasks,
} from "./TodoApi";
import { Task } from "./Todo";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import useDebounceState from "../hooks/useDebounceState";

function TodoApp() {
  const [task, setTask] = useState("");
  const [data, setData] = useState<Task[]>([]);

  const [validateInput, setValidateInput] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCheckAll, setIsCheckAll] = useState<boolean>(false);
  const initialTasks = useRef<Task[]>([]);

  const [debounce, setDebounce] = useDebounceState("");


  const getData = async () => {
    const dataApi = await getTaskApi();
    setData(dataApi);
    initialTasks.current = dataApi;
    setIsLoading(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTask(value);

    // search by debounce
    setDebounce(value)
  };

  const handleAddItem = async () => {
    try {
      if (task.trim()) {
        const newTask = { name: task, isDone: false };
        await addTask(newTask);
        getData();
        setTask("");
      } else {
        setValidateInput("Please enter tasks");
      }

      if (inputRef.current) {
        inputRef.current.focus();
      }
    } catch (error) {
      console.log("Add error", error);
    }
  };

  const handleDeleteItem = async (id: number) => {
    await deleteTask(id);
    getData();
  };

  const handleCheckItem = async (id: number, check: boolean) => {
    try {
      const newData = data.map((item) => {
        if (item.id === id) {
          return { ...item, isDone: check };
        }
        return item;
      });
      setData(newData);
      await checkTask(id, check);
    } catch (error) {
      console.error("Checked Error:", error);
    }
  };

  const handleCheckAll = async () => {
    setIsCheckAll(!isCheckAll);
    const newData = data.map((item) => ({
      ...item,
      isDone: !isCheckAll,
    }));

    setData(newData);
    await checkAllTasks(newData);
  };

  const handleInputFocus = () => {
    if (validateInput) {
      setValidateInput("");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (task) {
      setValidateInput("");
    }

    if (task.trim()) {
      setData(debounce);
    } else {
      setData(initialTasks.current);
    }
  }, [task, debounce]);

  

  return (
    <div className="container">
      <header>
        <h1>To-do List</h1>
        <section className="inputBox">
          <div>
            <input
              ref={inputRef}
              value={task}
              onChange={handleInputChange}
              className={validateInput ? "errorInput" : "textInput"}
              onBlur={handleInputFocus}
              placeholder="search or add"
              color="red"
            />
            <span className="validate">{validateInput}</span>
          </div>
          <button className="buttonBox" onClick={handleAddItem} type="button">
            <FaPlus size={23} />
          </button>
        </section>

        <section className="optionBox">
          {data.length > 0 && (
            <input type="checkbox" onChange={handleCheckAll} />
          )}
        </section>
      </header>
      <main>
        <section className="content">
          {isLoading ? (
            <p>Loading...</p>
          ) : data.length ? (
            data.map((item) => (
              <div key={item.id} className="list-box">
                <div className="list-item">
                  <input
                    style={{ cursor: "pointer" }}
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
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDeleteItem(item.id)}
                >
                  <FaRegTrashAlt size={20} color="red" />
                </div>
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
