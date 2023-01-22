import React from "react";
import logo from "../../img/logo.png"
import "./Footer.scss"

export default function Footer(){
    return(
       <footer>
        <img src={logo} alt="logo img" />
       <span> Made with ♥️ and <b>React.js</b>.</span>
       
       </footer>
    )
}