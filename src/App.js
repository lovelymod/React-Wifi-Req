import UserSubmit from "./usersubmit";
import Login from "./login";
import Table from "./table";
import AdminSub from "./adminsubmit";
import ShowData from "./showdata";
import EditUser from "./edituser";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Testform from "./testform";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route path="/usersubmit" element={<UserSubmit />} />
            <Route path="/login" element={<Testform />} />
            <Route path="/table" element={<Table />} />
            <Route path="/adminsubmit" element={<AdminSub />} />
            <Route path="/showdata" element={<ShowData />} />
            <Route path="/edituser" element={<EditUser />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
