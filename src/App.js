import UserSubmit from "./usersubmit";
import Login from "./login";
import Table from "./table";
import AdminSub from "./adminsubmit";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route path="/usersubmit" element={<UserSubmit />} />
            <Route path="/login" element={<Login />} />
            <Route path="/table" element={<Table />} />
            <Route path="/adminsubmit" element={<AdminSub />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
