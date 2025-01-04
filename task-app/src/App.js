import { Component } from "react";
import {Data} from "./data";
import Header from "./components/Header"

class App extends Component {
  constructor() {
    super();
    this.state = {
      taskList: Data,
      priorityList: ["Low", "Normal", "High"],
      defaultTaskStatus: "active",
    };
  }

  saveTask = () => {
    const taskName = this.taskName.value;
    const priority = this.priority.value;
    const date = new Date();
    const createdDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    if (!taskName || !priority) {
      alert("Please fill in all fields!");
      return;
    }

    const newTask = { title: taskName, priority, date: createdDate, status: "active" };
    this.setState({ taskList: [...this.state.taskList, newTask] });

    // Clear inputs
    this.taskName.value = "";
    this.priority.value = "";
  };

  changeTaskStatus = (status, title) => {
    const updatedList = this.state.taskList.map((task) =>
      task.title === title ? { ...task, status } : task
    );
    this.setState({ taskList: updatedList });
  };

  filterTasks = (status) => {
    this.setState({ defaultTaskStatus: status });
  };

  render() {
    const priorityOrder = { High: 3, Normal: 2, Low: 1 };

    const filteredTasks = this.state.taskList
      .filter((task) => task.status === this.state.defaultTaskStatus)
      .sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);

    return (
      <>
      <Header />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <input
              ref={(input) => (this.taskName = input)}
              placeholder="Enter Task Title"
              type="text"
              className="form-control"
            />
          </div>
          <div className="col-md-6">
            <select ref={(input) => (this.priority = input)} className="form-control">
              {this.state.priorityList.map((priority, index) => (
                <option key={index} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-12">
            <button className="btn btn-success" onClick={this.saveTask}>
              Save
            </button>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-3">
            <button
              className="btn btn-success"
              onClick={() => this.filterTasks("active")}
            >
              Active ({this.state.taskList.filter((task) => task.status === "active").length})
            </button>
            <button
              className="btn btn-primary ml-3"
              onClick={() => this.filterTasks("deactive")}
            >
              Deactive ({this.state.taskList.filter((task) => task.status === "deactive").length})
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
                      onClick={() => this.changeTaskStatus("deactive", task.title)}
                      className="btn btn-outline-danger"
                    >
                      Deactivate
                    </button>
                  ) : (
                    <button
                      onClick={() => this.changeTaskStatus("active", task.title)}
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
  }
}

export default App;
