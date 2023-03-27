import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../src/img/logo.png"
import { AuthContext } from "../../utilities/authContext";
import "./Navbar.scss";
import login from "../../img/login.png"
import Dropdown from "../DropDown/DropDown";

export default function Navbar() {
  const { currentUser, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const [visible, setVisible] = useState<boolean>(false)

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
        <Link className="link" to="/?cat=science">
          <h6>Science</h6>
        </Link>
        <Link className="link" to="/?cat=technology">
          <h6>Technology</h6>
        </Link>
      </div>
      <div className="user">
        <div><i>{currentUser?.user_name}</i></div>

        <Dropdown visible={visible} onClick={() => { setVisible(!visible) }}
          img={
            currentUser && currentUser.user_img ?
              <div>
                <img src={`../upload/${currentUser.user_img}`} alt="user-img" />
              </div>
              : <img src={login} alt="loing-icon" />
          }
        >
          {visible && currentUser ?
            <div className="drop-down-list">
              <p>
                <Link className="link" to={`/user/${currentUser.id}`} state={currentUser}  >Your profile</Link>
              </p>
              <p>
                <Link className="link" to="/write"  >Create post</Link>
              </p>
              <p onClick={() => {
                logout()
                navigate("/")
              }}>Logout</p>
            </div>
            :
            <div className="drop-down-list">
              <Link className="link" to="/login" >Login</Link>
            </div>
          }
        </Dropdown>
      </div>
    </div>
  )
}