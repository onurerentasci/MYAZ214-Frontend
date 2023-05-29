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

function MudekDenetcisi() {
  const [documents, setDocuments] = useState([
    { pdfName: "Dosya 1", url: "https://example.com/dosya1.pdf" },
    { pdfName: "Dosya 2", url: "https://example.com/dosya2.pdf" },
  ]);
  const [course, setCourse] = useState([]);
  const [var0, setVar0] = useState("");
  const [var1, setVar1] = useState("");
  const [var3, setVar3] = useState("");
  const [var5, setVar5] = useState("");
  const [var7, setVar7] = useState("");
  const [var9, setVar9] = useState("");
  const [var2, setVar2] = useState("");
  const [var4, setVar4] = useState("");
  const [var6, setVar6] = useState("");
  const [var8, setVar8] = useState("");

  const handleCourseClick = (courseId) => {
    console.log(courseId);
    fetch("http://localhost:5000/course/getcoursespdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseId }),
    })
      .then((response) => response.json())
      .then((data) => {
        setDocuments(data);
        console.log("data", data);
        // window.location.reload();
        const datas = data[0].courseNots
        console.log(datas)
        const data1 = datas.split("|");
        setVar0(data1[0])
        setVar1(data1[1])
        setVar2(data1[2])
        setVar3(data1[3])
        setVar4(data1[4])
        setVar5(data1[5])
        setVar6(data1[6])
        setVar7(data1[7])
        setVar8(data1[8])
        setVar9(data1[9])
        console.log(var0,var2,var4,var6,var8)
      })
      .catch((error) => {
        console.error("Yükleme hatası:", error);
      });
  };



  const handleDownload = (url) => {
    window.open(url, "_blank");
  };

  useEffect(() => {
    fetch("http://localhost:5000/course/getlessons", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setCourse(data);
        console.log("data", data);
        // window.location.reload();
      })
      .catch((error) => {
        console.error("Yükleme hatası:", error);
      });
  }, []);

  const renderDocuments = () => {
    return documents.map((document, index) => (
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
            onClick={() => handleDownload(document.url)}
          >
            İndir
          </Button>
        </TableCell>
      </TableRow>
    ));
  };

  // Örnek veriler
  const selectedCourseId = 1;

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
        {course.map((course) => (
          <Button
            key={course._id}
            variant="contained"
            style={{
              backgroundColor: "#ba001b",
              color: "white",
              borderRadius: "25px",
              margin: "5px",
            }}
            onClick={() => handleCourseClick(course._id)}
          >
            {course.name}
          </Button>
        ))}
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
              <TableBody>{renderDocuments()}</TableBody>
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
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <TableContainer component={Paper} style={{ border: "2px solid #ba001b" }}>
  <Table style={{ borderBottom: "2px solid #ba001b" }}>
    <TableHead>
      <TableRow>
        <TableCell></TableCell>
        <TableCell>Vize</TableCell>
        <TableCell>Final</TableCell>
        <TableCell>Uygulama</TableCell>
        <TableCell>Ödev</TableCell>
        <TableCell>Proje</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell>Sınav</TableCell>
        <TableCell>{var1}</TableCell>
        <TableCell>{var3}</TableCell>
        <TableCell>{var5}</TableCell>
        <TableCell>{var7}</TableCell>
        <TableCell>{var9}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Ağırlık</TableCell>
        <TableCell>{var0}%</TableCell>
        <TableCell>{var2}%</TableCell>
        <TableCell>{var4}%</TableCell>
        <TableCell>{var6}%</TableCell>
        <TableCell>{var8}%</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</TableContainer>

            </div>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#ba001b",
                  color: "white",
                  borderRadius: "25px",
                  margin: "5px",
                }}
              >
                Kaydet
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MudekDenetcisi;
