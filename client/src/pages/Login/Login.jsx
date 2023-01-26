import React, { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Login/Login.scss"
import { AuthContext } from "../../utilities/authContext";

const Register = () => {
  const [inputs, setInputs] = useState({ email: "", password: "" })
  const [err, setErr] = useState(null)
  const navigate = useNavigate()

  const { login } = useContext(AuthContext)

  const handleChange = e => {
    setInputs(prev => { return { ...prev, [e.target.name]: e.target.value } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs)
      navigate("/")
    } catch (error) {
      setErr(error.response.data)
    }
  }

  return (
    <div className="auth-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          required
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}

        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button type="submit">Login</button>
        {err && <p>{err}</p>}
        <span>
          Don't you have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;