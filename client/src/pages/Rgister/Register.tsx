import React, { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Login/Login.scss"

const Register = () => {
  const [inputs, setInputs] = useState<{username:string ,email:string, password:string}>({ username: "", email: "", password: "" })
  const [err, setErr] = useState<string>("")
  const navigate=useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs(prev => { return { ...prev, [e.target.name]: e.target.value } });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8800/api/auth/register", inputs)
      console.log(res);
      navigate("/login")
    } catch (error:any) {
      setErr(error.response.data)
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
          minLength={2}
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