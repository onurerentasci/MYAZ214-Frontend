import React, { useState } from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";

import "./style/Styles.css";

import samuLogo from "./assets/images/samuLogo.png";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [userLevel, setUserLevel] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("Kullanıcı Adı:", username);
    console.log("Şifre:", password);
    console.log("Beni Hatırla:", rememberMe);

    fetch("http://localhost:5000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Giriş Yapılamadı!");
        }
      })
      .then((data) => {
        setUserLevel(data.role);
        localStorage.setItem("role", userLevel);
        localStorage.setItem("id", data._id);
        localStorage.setItem("username", data.email);

        if (userLevel === "student") {
          navigate("/home");
        } else if (userLevel === "instructor") {
          navigate("/home");
        } else if (userLevel === "departmentCoordinator") {
          navigate("/home");
        } else if (userLevel === "mudekAuditor") {
          navigate("/home");
        }
      })
      .catch((error) => {
        console.error("API hatası:", error.message);
        setError("Kullanıcı Bilgileri hatalı!");
      });

    setUsername(username);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "96vh",
      }}
    >
      <div
        style={{
          border: "2px solid #ba001b",
          borderRadius: "20px",
          padding: "20px",
          width: "600px",
          backgroundColor: "#f5f5f5",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src={samuLogo}
            alt="SAMU"
            style={{
              width: "200px",
              margin: "auto",
            }}
          />
          <form
            onSubmit={handleFormSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              width: "300px",
              margin: "0 auto",
            }}
          >
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="Kullanıcı Adı"
              value={username}
              onChange={handleUsernameChange}
              required
              color="secondary"
              style={{ marginBottom: "10px", color: "#ba001b" }}
            />
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="Şifre"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
              color="secondary"
              style={{ marginBottom: "10px" }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                  color="secondary"
                />
              }
              label="Beni Hatırla"
              style={{ marginBottom: "10px" }}
            />
            {error && (
              <div style={{ color: "red", marginBottom: "10px" }}>
                {error}
              </div>
            )}
            <Button
              type="submit"
              variant="contained"
              style={{ backgroundColor: "#ba001b", color: "white" }}
            >
              Giriş
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
