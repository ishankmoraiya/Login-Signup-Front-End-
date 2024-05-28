import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../../features/authSlice";
import { Spinner } from "react-bootstrap";
import { axiosServer } from "../../features/store";
import Header from "../../components/Header";
import './Login.css'
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axiosServer.post("/api/user/login", {
        email,
        password,
      });

      console.log(data);

      if (data?.success) {
        setLoading(false);
        localStorage.setItem("token", data?.token);
        localStorage.setItem("firstName", data?.user.firstName);
        localStorage.setItem("lastName", data?.user.lastName);
        localStorage.setItem("email", data?.user.email);
        localStorage.setItem("mobile", data?.user.mobile);
        localStorage.setItem("role", data?.user.role);
        localStorage.setItem("id", data?.user._id);

        dispatch(
          setToken({
            token: data?.token,
            firstName: data?.user.firstName,
            lastName: data?.user.lastName,
            email: data?.user.email,
            mobile: data?.user.mobile,
            role: data?.user.role,
            id: data?.user._id,
          })
        );
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <Header />
      <div className="login">
        <h1 className="heading">SIGN IN</h1>

        <form onSubmit={handleSubmit}>
          <div className="form_grp">
            <label classNmae="lab">Email</label>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gamil.com"
              type="email"
            />
          </div>
          <div className="form_grp">
            <label classNmae="lab">Password</label>
            <input
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              type="password"
            />
          </div>
          <div className="high">
          <label >Remeber me</label>
          <label >Forgot PassWord?</label>

          </div>
          <button 
          style={{
            backgroundColor:"#1abc9c",
          }
          }className="btn" type="submit" disabled={loading}>
            {loading ? <Spinner size="sm" /> : "Login"}
          </button>
          <div className="links">
            <Link to="/register">Don't have an account?</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
