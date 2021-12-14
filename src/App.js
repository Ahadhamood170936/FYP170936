import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Component/Dashboard/Dashboard";
import Login from "./Component/Login/Login";
import Users from "./Component/Users/Users";

import "./App.css";

function App() {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const admin = localStorage.getItem("election-admin");
    setAdmin(admin);
  }, []);

  return (
    <Router>
      {!admin ? (
        <Routes>
          <Route exact path="/" element={<Login />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/dash" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
