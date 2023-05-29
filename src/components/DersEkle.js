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

function DersEkle() {
  const [courseName, setCourseName] = useState("");
  const [courseYear, setCourseYear] = useState("2023-guz");
  const [teacher, setTeacher] = useState("");
  const [courses, setCourses] = useState([]);

  const handleCourseNameChange = (event) => {
    setCourseName(event.target.value);
  };

  const handleCourseYearChange = (event) => {
    setCourseYear(event.target.value);
  };

  const handleTeacherChange = (event) => {
    setTeacher(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newCourse = {
      name: courseName,
      semesterId:courseYear,
      instructorEmail: teacher,
    };

    fetch("http://localhost:5000/course/createcourse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCourse),
    })
      .then((response) => response.json())
      .then((data) => {
        setCourseName("");
        setTeacher("");
      })
      .catch((error) => {
        console.error("API hatası:", error);
      });

    window.location.reload();
  };

  useEffect(() => {
    fetch("http://localhost:5000/course/getlessons")
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
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
            label="Ders Adı"
            value={courseName}
            onChange={handleCourseNameChange}
            fullWidth
            variant="outlined"
            required
            color="secondary"
            style={{ marginBottom: "10px", color: "#ba001b" }}
          />
          <FormControl component="fieldset" style={{ marginBottom: "10px" }}>
            <RadioGroup
              aria-label="courseYear"
              name="courseYear"
              value={courseYear}
              onChange={handleCourseYearChange}
              row
            >
              <FormControlLabel
                value="646f560050fc5b3aff02855f"
                control={<Radio color="secondary" />}
                label="2022 Güz"
              />
              <FormControlLabel
                value="646f55ed710a5d518fc30f9e"
                control={<Radio color="secondary" />}
                label="2022 Bahar"
              />
              <FormControlLabel
                value="646f55e260e92a9ab4012d5f"
                control={<Radio color="secondary" />}
                label="2023 Güz"
              />
              <FormControlLabel
                value="646f557a30629ac2bfce5a85"
                control={<Radio color="secondary" />}
                label="2023 Bahar"
              />
            </RadioGroup>
          </FormControl>
          <TextField
            label="Ders Öğretmeni"
            value={teacher}
            onChange={handleTeacherChange}
            fullWidth
            variant="outlined"
            required
            color="secondary"
            style={{ marginBottom: "10px", color: "#ba001b" }}
          />
          <Button
            variant="contained"
            style={{ backgroundColor: "#ba001b", color: "white" }}
            onClick={handleSubmit}
          >
            Ders Ekle
          </Button>
        </div>
        <TableContainer
          component={Paper}
          style={{ border: "2px solid #ba001b", height: "55vh" }}
        >
          <Table style={{ borderBottom: "2px solid #ba001b" }}>
            <TableHead>
              <TableRow>
                <TableCell>Ders Adı</TableCell>
                <TableCell>Ders Yılı</TableCell>
                <TableCell>Ders Öğretmeni</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.map((course, index) => (
                <TableRow key={index}>
                  <TableCell>{course.name}</TableCell>
                  <TableCell>{course.semester.name}</TableCell>
                  <TableCell>{course.instructor.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default DersEkle;
