import React, { useState } from "react";
import { Button } from "@material-ui/core";
import EgitmenEkle from "./components/EgitmenEkle";
import DersEkle from "./components/DersEkle";

const BolumKoordinatoru = () => {
  const [activeComponent, setActiveComponent] = useState("egitmen");

  const showEgitmenEkle = () => {
    setActiveComponent("egitmen");
  };

  const showDersEkle = () => {
    setActiveComponent("ders");
  };

  return (
    <div style={{ padding: "7vh" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#ba001b",
            color: "white",
            borderRadius: "25px",
            margin: "5px",
          }}
          onClick={showEgitmenEkle}
        >
          Kullanıcı Ekle
        </Button>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#ba001b",
            color: "white",
            borderRadius: "25px",
            margin: "5px",
          }}
          onClick={showDersEkle}
        >
          Ders Ekle
        </Button>
      </div>
      <div>
        {activeComponent === "egitmen" && <EgitmenEkle />}
        {activeComponent === "ders" && <DersEkle />}
      </div>
    </div>
  );
};

export default BolumKoordinatoru;
