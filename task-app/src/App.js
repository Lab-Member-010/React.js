import { Component } from "react";
import Header from "./components/Header";
// import {data} from "./data";

class App extends Component {
  // constructor(){
  //   super();
  //   this.state = {
  //     taskList: data
  //   };
  // }
  render() {
    return <>
      <Header />
      {/* <div className="container"> */}
        <div className="col-md-6">
          <input type="text" id="task" placeholder="Enter Task Title"/>
        </div>
        <div className="col-md-6">
          <select id="priority">
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
        <div className="col-md-6"></div>
      {/* </div> */}
    </>
  }
}

export default App;