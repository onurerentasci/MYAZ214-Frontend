import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";

function EgitmenEkle() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("student");
  const [users, setUsers] = useState([]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      name: name,
      password: password,
      department: department,
    };

    fetch("http://localhost:5000/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((data) => {})
      .catch((error) => {
        console.error("API hatası:", error);
      });

    window.location.reload();
  };

  useEffect(() => {
    fetch("http://localhost:5000/user/getusers")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("API hatası:", error);
      });
  }, []);

  return (
    <div style={{ paddingRight: "4vh", paddingLeft: "4vh" }}>
      <div style={{ display: "flex", flexDirection: "row", margin: "5vh" }}>
        <div style={{ marginRight: "20px" }}>
          <TextField
            label="Kullanıcı Adı"
            value={name}
            onChange={handleNameChange}
            fullWidth
            id="outlined-basic"
            variant="outlined"
            required
            color="secondary"
            style={{ marginBottom: "10px", color: "#ba001b" }}
          />
          <TextField
            label="Şifre"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            fullWidth
            id="outlined-basic"
            variant="outlined"
            required
            color="secondary"
            style={{ marginBottom: "10px", color: "#ba001b" }}
          />
          <div style={{display: "flex", flexDirection: "column"}}>
            <FormControl component="fieldset" style={{ marginBottom: "10px" }}>
              <RadioGroup
                aria-label="department"
                name="department"
                value={department}
                onChange={handleDepartmentChange}
              >
                <FormControlLabel
                  value="student"
                  control={<Radio color="secondary" />}
                  label="Öğrenci"
                />
                <FormControlLabel
                  value="instructor"
                  control={<Radio color="secondary" />}
                  label="Öğretim Görevlisi"
                />
                <FormControlLabel
                  value="departmentCoordinator"
                  control={<Radio color="secondary" />}
                  label="Bölüm Koordinatörü"
                />
                <FormControlLabel
                  value="mudekAuditor"
                  control={<Radio color="secondary" />}
                  label="Müdek Denetçisi"
                />
              </RadioGroup>
            </FormControl>
            <Button
              variant="contained"
              style={{ backgroundColor: "#ba001b", color: "white" }}
              onClick={handleSubmit}
            >
              Kullanıcı Ekle
            </Button>
          </div>
        </div>
        <TableContainer
          component={Paper}
          style={{ border: "2px solid #ba001b", height: "55vh" }}
        >
          <Table style={{ borderBottom: "2px solid #ba001b" }}>
            <TableHead>
              <TableRow>
                <TableCell>Ad Soyad</TableCell>
                <TableCell>Departman</TableCell>
                <TableCell>Şifre</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>
                    {user.department === "student"
                      ? "Öğrenci"
                      : user.department === "instructor"
                      ? "Öğretim Görevlisi"
                      : user.department === "departmentCoordinator"
                      ? "Bölüm Koordinatörü"
                      : user.department === "mudekAuditor"
                      ? "Müdek Denetçisi"
                      : ""}
                  </TableCell>
                  <TableCell>{user.password}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default EgitmenEkle;
