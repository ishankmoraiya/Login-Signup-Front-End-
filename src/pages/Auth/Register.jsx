import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../../features/authSlice";
import { Spinner } from "react-bootstrap";
import { axiosServer } from "../../features/store";
import Header from "../../components/Header";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const { data } = await axiosServer.post("/api/user/register", {
        name,
        email,
        password,
        dob,
      });

      if (data.success) {
        setLoading(false);
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.user.firstName);
        localStorage.setItem("email", data.user.email);
        localStorage.setItem("password", data.user.password);
        localStorage.setItem("dob", data.user.dob);

        dispatch(
          setToken({
            token: data.token,
            name: data.user.firstName,
            email: data.user.email,
            password: data.user.password,
            dob: data.user.dob,
          })
        );
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      setLoading(false);
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <Header />
      <div className="login">
        <h1 className="heading">Register</h1>

        <form onSubmit={handleSubmit} className="auth_form">
          <div className="form_grp">
            <label>Name</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John"
              type="text"
            />
          </div>
          <div className="form_grp">
            <label>Email</label>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gamil.com"
              type="email"
            />
          </div>
          <div className="form_grp">
            <label>Date of Birth</label>
            <input
              required
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              placeholder="YYYY-MM-DD"
              type="date"
            />
          </div>

          <div className="form_grp">
            <label>Password</label>
            <input
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              type="password"
            />
          </div>
          <button style={{
            background:"#1abc9c"
          }}type="submit" className="btn">
            {loading ? <Spinner animation="border" size="sm" /> : "Sign Up"}
          </button>
          <div className="links">
            <Link to="/login">Go back to login?</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
