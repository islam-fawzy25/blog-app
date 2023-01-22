import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss"

const Login = () => {

  return (
    <div className="auth-container">
      <h1>Login</h1>
      <form>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
        />
        <button >Login</button>
        <span>
          Don't you have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;