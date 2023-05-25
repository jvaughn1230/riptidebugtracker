import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import AddBug from "./components/AddBug/AddBug";
import Signup from "./components/Signup/Signup";
import ViewBugs from "./components/ViewBugs/ViewBugs";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/account" element={<Layout />}>
          <Route path="/account/addbug" element={<AddBug />} />
          <Route path="/account/viewbugs" element={<ViewBugs />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
