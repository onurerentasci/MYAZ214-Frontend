import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import BolumKoordinatoru from "./BolumKoordinatoru";
import OgretimGorevlisi from "./OgretimGorevlisi";
import MudekDenetcisi from "./MudekDenetcisi";

export default function HomeScreen() {
  const location = useLocation();
  const userRole = localStorage.getItem("role"); // Kullanıcının rolünü localStorage'den al

  if (location.pathname === "/home") {
    return (
      <div style={{ paddingTop: "12vh" }}>
        <Navbar />
        {userRole === "departmentCoordinator" && <BolumKoordinatoru />}
        {userRole === "instructor" && <OgretimGorevlisi />}
        {userRole === "mudekAuditor" && <MudekDenetcisi />}
      </div>
    );
  }
}
