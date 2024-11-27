import React from "react";
import "../styles/css/nav.css";

export const Nav = () => {
  return (
    <nav className="nav">
      <a href="/">Home</a>
      <a href="/login">Logg inn</a>
      <a href="/register">Register</a>
    </nav>
  );
}

export default Nav;
