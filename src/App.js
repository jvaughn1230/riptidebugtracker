import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";

// Lazy Imports
const Login = React.lazy(() => import("./routes/Login/Login"));
const Signup = React.lazy(() => import("./routes/Signup/Signup"));
const Layout = React.lazy(() => import("./routes/Layout"));
const Home = React.lazy(() => import("./routes/Home/Home"));
const AddBug = React.lazy(() => import("./components/AddBug/AddBug"));
const ViewBugs = React.lazy(() => import("./routes/ViewBugs/ViewBugs"));
const ManageProjects = React.lazy(() =>
  import("./routes/ManageProjects/ManageProjects")
);
const RequireAuth = React.lazy(() => import("./components/RequireAuth"));
const PersistLogin = React.lazy(() => import("./redux/PersistLogin"));

function App() {
  return (
    <div className="app">
      <ToastContainer autoClose={5000} />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}>
              <Route
                path="/account"
                element={<Layout />}
                fallback={<div>Loading....</div>}
              >
                <Route
                  path="/account"
                  element={<Home />}
                  fallback={<div>Loading....</div>}
                />
                <Route
                  path="/account/addbug"
                  element={<AddBug />}
                  fallback={<div>Loading....</div>}
                />
                <Route
                  path="/account/viewbugs"
                  element={<ViewBugs />}
                  fallback={<div>Loading....</div>}
                />
                <Route
                  path="/account/projects"
                  element={<ManageProjects />}
                  fallback={<div>Loading....</div>}
                />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
