import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Dashboard from "./Component/Dashboard/Dashboard";
import Login from "./Component/Login/Login";
import Users from "./Component/Users/Users";
import NewWorker from "./Component/Users/NewClassFourWorker";
import NewTeacher from "./Component/Users/NewTeacher";
import NewStudent from "./Component/Users/NewStudent";

import StudentLogin from "./Component/Student/Login/Login";
import StudentDashboard from "./Component/Student/Dashboard/Dashboard";

import "./App.css";

function App() {
  const [admin, setAdmin] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const [student, setStudent] = useState(null);
  const [activeApp, setActiveApp] = useState("");

  useEffect(() => {
    const activeApp = window.location.pathname;
    const admin = localStorage.getItem("election-admin");
    const student = localStorage.getItem("election-student");
    const teacher = localStorage.getItem("election-teacher");

    setAdmin(admin);
    setStudent(student);
    setTeacher(teacher);
    setActiveApp(activeApp);
  }, []);

  return (
    <Router>
      {activeApp === "/student" ? (
        !student ? (
          <Routes>
            <Route exact path="/student" element={<StudentLogin />} />
          </Routes>
        ) : (
          <Routes>
            <Route
              path="/student"
              element={<Navigate replace to="/student/dashboard" />}
            />
            <Route path="/student/dashboard" element={<StudentDashboard />} />
          </Routes>
        )
      ) : !admin ? (
        <Routes>
          <Route exact path="/" element={<Login />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Navigate replace to="/dash" />} />
          <Route path="/dash" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/newstudent" element={<NewStudent />} />
          <Route path="/users/newworker" element={<NewWorker />} />
          <Route path="/users/newteacher" element={<NewTeacher />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
