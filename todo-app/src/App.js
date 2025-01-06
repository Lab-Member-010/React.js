import React, { useState, useRef } from "react";
import { Data } from "./data";
import Header from "./components/Header";

const App = () => {
  const [taskList, setTaskList] = useState(Data);
  const [priorityList] = useState(["Low", "Normal", "High"]);
  const [defaultTaskStatus, setDefaultTaskStatus] = useState("active");

  const taskNameRef = useRef();
  const priorityRef = useRef();

  const saveTask = () => {
    const taskName = taskNameRef.current.value;
    const priority = priorityRef.current.value;
    const date = new Date();
    const createdDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

    if (!taskName || !priority) {
      alert("Please fill in all fields!");
      return;
    }

    const newTask = { title: taskName, priority, date: createdDate, status: "active" };
    setTaskList([...taskList, newTask]);

    // Clear inputs
    taskNameRef.current.value = "";
    priorityRef.current.value = "";
  }; 

  const changeTaskStatus = (status, title) => {
    const updatedList = taskList.map((task) =>
      task.title === title ? { ...task, status } : task
    );
    setTaskList(updatedList);
  };

  const filterTasks = (status) => {
    setDefaultTaskStatus(status);
  };

  const priorityOrder = { High: 3, Normal: 2, Low: 1 };

  const filteredTasks = taskList
    .filter((task) => task.status === defaultTaskStatus)
    .sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);

  return (
    <>
      <Header />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <input
              ref={taskNameRef}
              placeholder="Enter Task Title"
              type="text"
              className="form-control"
            />
          </div>
          <div className="col-md-6">
            <select ref={priorityRef} className="form-control">
              {priorityList.map((priority, index) => (
                <option key={index} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-12">
            <button className="btn btn-success" onClick={saveTask}>
              Save
            </button>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-3">
            <button
              className="btn btn-success"
              onClick={() => filterTasks("active")}
            >
              Active ({taskList.filter((task) => task.status === "active").length})
            </button>
            <button
              className="btn btn-primary ml-3"
              onClick={() => filterTasks("deactive")}
            >
              Deactive ({taskList.filter((task) => task.status === "deactive").length})
            </button>
          </div>
        </div>
        <table className="table mt-5">
          <thead>
            <tr>
              <th>S.no</th>
              <th>Title</th>
              <th>Date</th>
              <th>Priority</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task, index) => (
              <tr
                key={index}
                style={{
                  backgroundColor:
                    task.priority === "High"
                      ? "#FFA07A"
                      : task.priority === "Normal"
                      ? "#FFCC80"
                      : "#ADD8E6",
                }}
              >
                <td>{index + 1}</td>
                <td>{task.title}</td>
                <td>{task.date}</td>
                <td>{task.priority}</td>
                <td>
                  {task.status === "active" ? (
                    <button
                      onClick={() => changeTaskStatus("deactive", task.title)}
                      className="btn btn-outline-danger"
                    >
                      Deactivate
                    </button>
                  ) : (
                    <button
                      onClick={() => changeTaskStatus("active", task.title)}
                      className="btn btn-outline-success"
                    >
                      Activate
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default App;
