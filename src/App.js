import UserSubmit from "./usersubmit";
import Login from "./login";
import Nav from "./Nav";
import Table from "./table";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/table" element={<Table />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
