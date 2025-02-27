import Lap from "./components/Lap";
import Header from "./components/Header";

function App() {
  return (
    <>
      <div className="container">
        <Header/>
      </div>
      <div className="container">
        <Lap/>
      </div>
    </>
  );
}

export default App;