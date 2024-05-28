import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const Home = lazy(() => import("./pages/Home/Home.jsx"));
const Login = lazy(() => import("./pages/Auth/Login.jsx"));
const Register = lazy(() => import("./pages/Auth/Register.jsx"));

function App() {
  const token = localStorage.getItem("token");
  const user = token ? true : false;
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/login"
            element={
              <ProtectedRoute user={!user} redirect="/">
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute user={!user} redirect="/">
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute user={user}>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
