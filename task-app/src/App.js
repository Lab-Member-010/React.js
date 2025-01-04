import { Component } from "react";
import Header from "./components/Header";
import { data } from "./data";

class App extends Component {
  constructor() {
    super();
    this.state = {
      taskList: data,
      priorityList:["high","medium","low"]
    };
  }
  render() {
    return <>
      <Header />
      <div className='container'>
        <div className="row mt-3">
          <div className='col-md-6'>
            <input ref={(taskInput) => (this.tittle = taskInput)} className='form-control' type='text' placeholder='Enter tast tittle'></input>
          </div>
          <div className='col-md-6'>
            <select ref={(priorityInput) => (this.priority = priorityInput)} className="form-control">
              {this.state.priorityList.map((priority, index) => (
                <option key={index}>{priority}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6">
            <button className="btn btn-success" onClick={this.addRecord}>
              ADD
            </button>
          </div>
        </div>
        <div className="row mt-3">
          <div className='col-md-3'>
          <button className="btn btn-info">Active</button>
          </div>
          <div className='col-md-3'>
            <button className="btn btn-danger">Deactive</button>
          </div>
        </div>
      </div>
    </>
  }
}

export default App;