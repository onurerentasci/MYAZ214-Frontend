import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from "@material-ui/core";

function OgretimGorevlisi() {
  const courses = [{ id: 1, name: "Course 1" }];
  const [documents, setDocuments] = useState([]);

  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [gradeInputs, setGradeInputs] = useState({});
  const [numberInputs, setNumberInputs] = useState({});
  const userId = localStorage.getItem("id");
  const username = localStorage.getItem("username");
  const datass = {
    instructorEmail: localStorage.getItem("username")
  }
  useEffect(() => {
    fetch("http://localhost:5000/course/download", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datass)
    })
      .then((response) => response.json())
      .then((data) => {
        setDocuments(data);
        localStorage.setItem("cid",data[0].courseId)  
        console.log("data",data);
        // window.location.reload();
      })
      .catch((error) => {
        console.error("Yükleme hatası:", error);
      });
  }, []);

  const handleCourseClick = (courseId) => {
    setSelectedCourseId(courseId);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const convertToDownloadLinks = () => {
    const downloadLinks = documents.map((pdfData) => {
      const byteCharacters = atob(pdfData.pdfData);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
  
      return {
        courseId: pdfData.courseId,
        courseName: pdfData.courseName,
        pdfName: pdfData.pdfName,
        link: url,
      };
    });
    console.log(downloadLinks)
    return downloadLinks;
  };
  const links = convertToDownloadLinks()

  const handleFileUpload = () => {
    if (!selectedFile) return;
    const uploadUrl = "http://localhost:5000/course/upload";
    const formData = new FormData();
    formData.append("buffer", selectedFile);
    formData.append("courseId", localStorage.getItem("cid"));

    fetch(uploadUrl, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Yükleme tamamlandı:", data);
        setSelectedFile(null);
        setSelectedCourseId(null);
      })
      .catch((error) => {
        console.error("Yükleme hatası:", error);
      });
      setTimeout(() =>window.location.reload(),2000 )
  };

  const handleGradeInputChange = (event, courseId) => {
    const { name, value } = event.target;

    setGradeInputs((prevInputs) => ({
      ...prevInputs,
      [courseId]: {
        ...prevInputs[courseId],
        [name]: value,
      },
    }));
  };

  const handleNumberInputChange = (event, courseId) => {
    const { name, value } = event.target;

    setNumberInputs((prevInputs) => ({
      ...prevInputs,
      [courseId]: {
        ...prevInputs[courseId],
        [name]: value,
      },
    }));
  };

  const handleSaveGrades = () => {
    const courseId = selectedCourseId;
    const grades = gradeInputs[courseId];
    const numbers = numberInputs[courseId];

    console.log("Kaydedilen notlar:", grades);
    console.log("Kaydedilen sayılar:", numbers);
  };

  const handleSubmit = () => {
    const courseId = selectedCourseId;
    const grades = gradeInputs[courseId];
    const numbers = numberInputs[courseId];
  
    const dataToSend = {
      courseId :  localStorage.getItem("cid"),
      grades,
      numbers,
    };
  
    fetch("http://localhost:5000/course/setnotes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Veriler gönderildi:", data);
      })
      .catch((error) => {
        console.error("Gönderme hatası:", error);
      });
  };
  
  
  return (
    <div style={{ paddingRight: "4vh", paddingLeft: "4vh" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "5vh",
          marginBottom: "2vh",
        }}
      >
          <Button
            key={1}
            variant="contained"
            style={{
              backgroundColor: "#ba001b",
              color: "white",
              borderRadius: "25px",
              margin: "5px",
            }}
            onClick={() => handleCourseClick(1)}
          >
            {localStorage.getItem("cname")}
          </Button>
      </div>
      {selectedCourseId && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <TableContainer
            component={Paper}
            style={{
              border: "2px solid #ba001b",
              width: "50vw",
            }}
          >
            <Table style={{ borderBottom: "2px solid #ba001b" }}>
              <TableHead>
                <TableRow>
                  <TableCell>Dökümanlar</TableCell>
                  <TableCell>Aksiyonlar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {links.map((document, index) => (
                  <TableRow key={index}>
                    <TableCell>{document.pdfName}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: "#ba001b",
                          color: "white",
                          borderRadius: "25px",
                          margin: "5px",
                        }}
                        href={document.link}
                        target="_blank"
                      >
                        İndir
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileChange}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: "#ba001b",
                        color: "white",
                        borderRadius: "25px",
                        margin: "5px",
                      }}
                      onClick={handleFileUpload}
                    >
                      Yükle
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
      {selectedCourseId && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2vh",
          }}
        >
          <div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  label="Vize"
                  name="vize"
                  id="outlined-basic"
                  variant="outlined"
                  color="secondary"
                  style={{ marginBottom: "10px", color: "#ba001b" }}
                  value={gradeInputs[selectedCourseId]?.vize || ""}
                  onChange={(event) =>
                    handleGradeInputChange(event, selectedCourseId)
                  }
                />
                <TextField
                  label="Vize Sayısı"
                  name="vizeSayisi"
                  id="outlined-basic"
                  variant="outlined"
                  color="secondary"
                  style={{ marginBottom: "10px", color: "#ba001b" }}
                  value={numberInputs[selectedCourseId]?.vizeSayisi || ""}
                  onChange={(event) =>
                    handleNumberInputChange(event, selectedCourseId)
                  }
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  label="Final"
                  name="final"
                  id="outlined-basic"
                  variant="outlined"
                  color="secondary"
                  style={{ marginBottom: "10px", color: "#ba001b" }}
                  value={gradeInputs[selectedCourseId]?.final || ""}
                  onChange={(event) =>
                    handleGradeInputChange(event, selectedCourseId)
                  }
                />
                <TextField
                  label="Final Sayısı"
                  name="finalSayisi"
                  id="outlined-basic"
                  variant="outlined"
                  color="secondary"
                  style={{ marginBottom: "10px", color: "#ba001b" }}
                  value={numberInputs[selectedCourseId]?.finalSayisi || ""}
                  onChange={(event) =>
                    handleNumberInputChange(event, selectedCourseId)
                  }
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  label="Ödev"
                  name="odev"
                  id="outlined-basic"
                  variant="outlined"
                  color="secondary"
                  style={{ marginBottom: "10px", color: "#ba001b" }}
                  value={gradeInputs[selectedCourseId]?.odev || ""}
                  onChange={(event) =>
                    handleGradeInputChange(event, selectedCourseId)
                  }
                />
                <TextField
                  label="Ödev Sayısı"
                  name="odevSayisi"
                  id="outlined-basic"
                  variant="outlined"
                  color="secondary"
                  style={{ marginBottom: "10px", color: "#ba001b" }}
                  value={numberInputs[selectedCourseId]?.odevSayisi || ""}
                  onChange={(event) =>
                    handleNumberInputChange(event, selectedCourseId)
                  }
                />
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  label="Proje"
                  name="proje"
                  id="outlined-basic"
                  variant="outlined"
                  color="secondary"
                  style={{ marginBottom: "10px", color: "#ba001b" }}
                  value={gradeInputs[selectedCourseId]?.proje || ""}
                  onChange={(event) =>
                    handleGradeInputChange(event, selectedCourseId)
                  }
                />
                <TextField
                  label="Proje Sayısı"
                  name="projeSayisi"
                  id="outlined-basic"
                  variant="outlined"
                  color="secondary"
                  style={{ marginBottom: "10px", color: "#ba001b" }}
                  value={numberInputs[selectedCourseId]?.projeSayisi || ""}
                  onChange={(event) =>
                    handleNumberInputChange(event, selectedCourseId)
                  }
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  label="Uygulama"
                  name="uygulama"
                  id="outlined-basic"
                  variant="outlined"
                  color="secondary"
                  style={{ marginBottom: "10px", color: "#ba001b" }}
                  value={gradeInputs[selectedCourseId]?.uygulama || ""}
                  onChange={(event) =>
                    handleGradeInputChange(event, selectedCourseId)
                  }
                />
                <TextField
                  label="Uygulama Sayısı"
                  name="uygulamaSayisi"
                  id="outlined-basic"
                  variant="outlined"
                  color="secondary"
                  style={{ marginBottom: "10px", color: "#ba001b" }}
                  value={numberInputs[selectedCourseId]?.uygulamaSayisi || ""}
                  onChange={(event) =>
                    handleNumberInputChange(event, selectedCourseId)
                  }
                />
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#ba001b",
                    color: "white",
                    borderRadius: "25px",
                    margin: "5px",
                  }}
                  onClick={handleSubmit}
                >
                  Kaydet
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OgretimGorevlisi;
