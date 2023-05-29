import React from "react";
import "../style/Navbar.css";

import samuLogo from "../assets/images/samuLogo.png";
import quit_icon from "../assets/icons/icons_on_off.png";

export default function Navbar({ username }) {
  const role = localStorage.getItem("role");
  username = localStorage.getItem("username");
  return (
    <nav className="navbar-container">
      <div>
        <img
          src={samuLogo}
          alt="SAMU"
          style={{
            width: "100px",
            margin: "auto",
            paddingRight: "10px",
          }}
        />
      </div>
      <div
        className="profileInfo"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          borderLeft: "2px solid #ba001b",
        }}
      >
        <div>
          <div
            style={{
              color: "#000",
              display: "flex",
              fontSize: "20px",
              alignItems: "center",
              margin: "10px",
            }}
          >
            {username}
          </div>
          <div
            style={{
              color: "#000",
              display: "flex",
              fontSize: "10px",
              alignItems: "center",
              margin: "10px",
            }}
          >
            {role === "student"
              ? "Öğrenci"
              : role === "instructor"
              ? "Öğretim Görevlisi"
              : role === "departmentCoordinator"
              ? "Bölüm Koordinatörü"
              : role === "mudekAuditor"
              ? "Müdek Denetçisi"
              : ""}
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginLeft: "auto",
          marginRight: "20px",
        }}
      >
        <a href="/">
          <img src={quit_icon} style={{ width: "40px" }} alt="quit" />
        </a>
      </div>
    </nav>
  );
}
