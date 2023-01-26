import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../../src/img/logo.png"
import { AuthContext } from "../../utilities/authContext";
import "./Navbar.scss";
import login from "../../img/login.png"
export default function Navbar() {
  const { currentUser, logout } = useContext(AuthContext)

  return (
    <div className="nav-container">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="logo img" />
        </Link>
      </div>
      <div className="links">
        <Link className="link" to="/?cat=art">
          <h6>Art</h6>
        </Link>
        <Link className="link" to="/?cat=food">
          <h6>Food</h6>
        </Link>
        <Link className="link" to="/?cat=sport">
          <h6>Sport</h6>
        </Link>
        <Link className="link" to="/?cat=since">
          <h6>Since</h6>
        </Link>
        <Link className="link" to="/?cat=technology">
          <h6>Technology</h6>
        </Link>
        <span>{currentUser?.user_name}</span>
        {currentUser ? <span onClick={logout}>Logout</span> :
          <Link className="link" to="/login">Login</Link>
        }
        <span className="write">
          <Link className="link" to="/write" >Write</Link>
        </span>
        <span className="user">
          <Link className="link" to="/user" >
            <img src={login} alt="loing-icon" />
          </Link>
        </span>
      </div>
    </div>
  )
}