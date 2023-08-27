import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import Login from "./routes/Login/Login";
import AddBug from "./components/AddBug/AddBug";
import Signup from "./routes/Signup/Signup";
import ViewBugs from "./components/ViewBugs/ViewBugs";
import Layout from "./routes/Layout";
import Home from "./routes/Home/Home";

import PersistLogin from "./redux/PersistLogin";

function App() {
  // const { auth } = useSelector((state) => state);
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route element={<PersistLogin />}> */}
        <Route path="/account" element={<Layout />}>
          <Route path="/account" element={<Home />} />
          <Route path="/account/addbug" element={<AddBug />} />
          <Route path="/account/viewbugs" element={<ViewBugs />} />
        </Route>
        {/* </Route> */}
      </Routes>
    </div>
  );
}

export default App;
