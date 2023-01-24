import React, { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Login/Login.scss"

const Register = () => {
  const [inputs, setInputs] = useState({ username: "", email: "", password: "" })
  const [err, setErr] = useState(null)
  const navigate=useNavigate()

  const handleChange = e => {
    setInputs(prev => { return { ...prev, [e.target.name]: e.target.value } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8800/api/auth/register", inputs)
      console.log(res);
      navigate("/login")
    } catch (error) {
      setErr(error.response.data)
    }
  }


  const getPosts = async () => {
    try {
      const res = await axios.get("http://localhost:8800/api/posts");
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="auth-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
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
        <button type="submit">Register</button>
        {err && <p>{err}</p>}
        <span>
          Do you have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;