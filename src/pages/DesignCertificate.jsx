import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, Button, Paper, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { useCourseContext } from "../utils/CourseContext";
import QRCode from "qrcode";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { saveAs } from "file-saver";
import Draggable from "react-draggable";

import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import workerURL from "../utils/pdfWorker";

pdfjsLib.GlobalWorkerOptions.workerSrc = workerURL;

const DesignCertificate = () => {
  const { courseId } = useParams();
  const { courses } = useCourseContext();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [qrDataUrl, setQrDataUrl] = useState(null);
  const [positions, setPositions] = useState({});
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
  const [backgroundImage, setBackgroundImage] = useState("");

  const refs = {
    candidateName: useRef(null),
    courseName: useRef(null),
    courseId: useRef(null),
    tenure: useRef(null),
    description: useRef(null),
    qrCode: useRef(null),
  };

  useEffect(() => {
    const found = courses.find((c) => c.courseId === courseId);
    setSelectedCourse(found || null);
  }, [courseId, courses]);

  useEffect(() => {
    if (selectedCourse) {
      QRCode.toDataURL(JSON.stringify(selectedCourse))
        .then((url) => setQrDataUrl(url))
        .catch((err) => console.error("QR generation failed:", err));
    }
  }, [selectedCourse]);

  useEffect(() => {
    const saved = localStorage.getItem(`positions_${courseId}`);
    if (saved) setPositions(JSON.parse(saved));
  }, [courseId]);

  const handlePDFUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "application/pdf") {
      alert("Please upload a valid PDF file.");
      return;
    }
    setPdfFile(file);

    const fileReader = new FileReader();
    fileReader.onload = async function () {
      const typedArray = new Uint8Array(this.result);
      const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1.5 });

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: context, viewport }).promise;

      const imageUrl = canvas.toDataURL();
      setBackgroundImage(imageUrl);
      setCanvasSize({ width: canvas.width, height: canvas.height });
    };

    fileReader.readAsArrayBuffer(file);
  };

  const handleDragStop = (field, e, data) => {
    const updated = {
      ...positions,
      [field]: { x: data.x, y: data.y },
    };
    setPositions(updated);
    localStorage.setItem(`positions_${courseId}`, JSON.stringify(updated));
  };

  const handleGenerateCertificate = async () => {
    if (!pdfFile || !selectedCourse || !qrDataUrl) return;

    const existingPdfBytes = await pdfFile.arrayBuffer();
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const page = pdfDoc.getPages()[0];
    const { height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const scaleBack = 1 / 1.5;

    const getY = (y) => height - y;

    const drawField = (text, key, size = 14) => {
      const pos = positions[key];
      if (pos && text) {
        page.drawText(text, {
          x: pos.x * scaleBack,
          y: getY(pos.y * scaleBack),
          size,
          font,
          color: rgb(0, 0, 0),
        });
      }
    };

    drawField(selectedCourse.candidateName, "candidateName", 18);
    drawField(selectedCourse.courseName, "courseName", 14);
    drawField(selectedCourse.courseId, "courseId", 12);
    drawField(
      `${selectedCourse.startDate} to ${selectedCourse.endDate}`,
      "tenure",
      12
    );
    drawField(selectedCourse.description, "description", 12);

    const qrImageBytes = await fetch(qrDataUrl).then((res) =>
      res.arrayBuffer()
    );
    const qrImage = await pdfDoc.embedPng(qrImageBytes);
    const qrDims = qrImage.scale(0.25);
    const qrPos = positions["qrCode"];

    if (qrPos) {
      page.drawImage(qrImage, {
        x: qrPos.x * scaleBack,
        y: getY(qrPos.y * scaleBack) - qrDims.height,
        width: qrDims.width,
        height: qrDims.height,
      });
    }

    const finalPdf = await pdfDoc.save();
    const blob = new Blob([finalPdf], { type: "application/pdf" });
    saveAs(blob, `Certificate_${selectedCourse.candidateName}.pdf`);
  };

  const fieldComponents = [
    {
      key: "candidateName",
      label: selectedCourse?.candidateName || "Candidate Name",
    },
    { key: "courseName", label: selectedCourse?.courseName || "Course Name" },
    { key: "courseId", label: selectedCourse?.courseId || "Course ID" },
    {
      key: "tenure",
      label: selectedCourse
        ? `${selectedCourse.startDate} to ${selectedCourse.endDate}`
        : "Tenure",
    },
    { key: "description", label: selectedCourse?.description || "Description" },
    {
      key: "qrCode",
      label: qrDataUrl ? <img src={qrDataUrl} alt="QR" width={80} /> : "QR",
    },
  ];

  if (!selectedCourse) {
    return (
      <Box p={4}>
        <Typography>No course found. Please check the Course ID.</Typography>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Design Certificate
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Upload Certificate Template (PDF)
            </Typography>
            <input
              type="file"
              accept="application/pdf"
              onChange={handlePDFUpload}
            />
            <Typography fontSize={14} mt={2}>
              Drag fields over the preview on the right.
            </Typography>
            <Button
              variant="contained"
              sx={{ mt: 3 }}
              disabled={!pdfFile}
              onClick={handleGenerateCertificate}
            >
              Download Final Certificate
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={7}>
          <Typography variant="h6">Live Certificate Preview</Typography>
          <Box
            sx={{
              mt: 2,
              position: "relative",
              width: `${canvasSize.width}px`,
              height: `${canvasSize.height}px`,
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              overflow: "hidden",
            }}
          >
            {fieldComponents.map((field) => (
              <Draggable
                key={field.key}
                nodeRef={refs[field.key]}
                bounds="parent"
                defaultPosition={positions[field.key] || { x: 50, y: 50 }}
                onStop={(e, data) => handleDragStop(field.key, e, data)}
              >
                <Box
                  ref={refs[field.key]}
                  sx={{
                    padding: "4px 8px",
                    backgroundColor:
                      field.key === "qrCode"
                        ? "transparent"
                        : "rgba(255,255,255,0.9)",
                    border: "1px dashed #555",
                    borderRadius: 1,
                    cursor: "move",
                    fontSize: 14,
                    display: "inline-block",
                    position: "absolute",
                    zIndex: 10,
                  }}
                >
                  {field.label}
                </Box>
              </Draggable>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DesignCertificate;
