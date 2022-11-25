import UserSubmit from "./page/usersubmit";
import Login from "./page/login";
import Table from "./page/table";
import AdminSub from "./page/adminsubmit";
import ShowData from "./page/showdata";
import EditUser from "./page/edituser";
import Testform from "./testform";
import { useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Register from "./page/Register";

function AnimatedRoute() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/usersubmit" element={<UserSubmit />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/table" element={<Table />} />
        <Route path="/adminsubmit" element={<AdminSub />} />
        <Route path="/showdata" element={<ShowData />} />
        <Route path="/edituser" element={<EditUser />} />
        <Route path="/testform" element={<Testform />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoute;
