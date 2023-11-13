import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Login from "./routes/Login/Login";
import AddBug from "./components/AddBug/AddBug";
import Signup from "./routes/Signup/Signup";
import ViewBugs from "./routes/ViewBugs/ViewBugs";
import Layout from "./routes/Layout";
import Home from "./routes/Home/Home";
import ManageProjects from "./routes/ManageProjects/ManageProjects";

import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./redux/PersistLogin";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/account" element={<Layout />}>
              <Route path="/account" element={<Home />} />
              <Route path="/account/addbug" element={<AddBug />} />
              <Route path="/account/viewbugs" element={<ViewBugs />} />
              <Route path="/account/projects" element={<ManageProjects />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
