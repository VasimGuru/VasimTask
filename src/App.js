import "./styles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import UserList from "./Component/UserList";
// import EditUser from "./Component/EditUser";
// import UserForm from "./Component/Userform";
import UserList from "./components/UserList";
import EditUser from "./components/EditUser";
import UserForm from "./components/UserForm";
import Download from "./components/Download";
export default function App() {
  return (
    <>
      <Router>
        <h1>Form</h1>
        <Routes>
          <Route path="/" element={<UserList />}></Route>
          <Route path="/addUser" element={<UserForm />}></Route>
          <Route path="/editUser" element={<EditUser />}></Route>
          <Route path="/download" element={<Download />}></Route>
        </Routes>
      </Router>
    </>
  );
}
