import React from "react";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../features/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  let user = token ? true : false;

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(removeToken());
    localStorage.clear();
    alert("Logout Successful");
    window.location.reload();
    navigate("/");
  };
  return (
    <header>
      <div className="btn">
        {user ? (
          <button className="logout" onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <button className="login1" onClick={() => navigate("/login")}>Login</button>
            <button className="register" onClick={() => navigate("/register")}>Register</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
