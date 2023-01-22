import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../src/img/logo.png"
import "./Navbar.scss"

export default function Navbar() {
  return (
    <div className="nav-container">
      <div className="logo">
        <img src={logo} alt="logo img" />
      </div>
      <div className="links">
        <Link className="link" to="/?cat=art">
          <h6>Art</h6>
        </Link>
        <Link className="link" to="/?cat=art">
          <h6>Food</h6>
        </Link> 
         <Link className="link" to="/?cat=art">
          <h6>Sport</h6>
        </Link> 
         <Link className="link" to="/?cat=art">
          <h6>Since</h6>
        </Link> 
         <Link className="link" to="/?cat=art">
          <h6>Technology</h6>
        </Link>
        <span>Islam</span>
        <span>Logout</span>
        <span className="write">
          <Link className="link" to="/write">Write</Link>
        </span>

      </div>
    </div>
  )
}