import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCourseContext } from "../utils/CourseContext";
import { Document, Page, pdfjs } from "react-pdf";
import { Box, Typography, Input } from "@mui/material";
import Draggable from "react-draggable";
import QRCode from "react-qr-code";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const overlayFields = [
  "candidateName",
  "courseName",
  "courseId",
  "tenure",
  "description",
  "qrCode",
];

const DesignCertificate = () => {
  const { courseId } = useParams();
  const { courses } = useCourseContext();
  const course = courses.find((c) => c.courseId === courseId);

  const [pdfData, setPdfData] = useState(null);
  const [positions, setPositions] = useState({});

  useEffect(() => {
    const savedPdf = localStorage.getItem(`template_pdf_${courseId}`);
    if (savedPdf) setPdfData(savedPdf);

    const savedPositions =
      JSON.parse(localStorage.getItem(`field_positions_${courseId}`)) || {};
    setPositions(savedPositions);
  }, [courseId]);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result;
        localStorage.setItem(`template_pdf_${courseId}`, base64);
        setPdfData(base64);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const handleStop = (e, data, field) => {
    const updated = {
      ...positions,
      [field]: { x: data.x, y: data.y },
    };
    setPositions(updated);
    localStorage.setItem(
      `field_positions_${courseId}`,
      JSON.stringify(updated)
    );
  };

  if (!course) return <Typography>Course not found</Typography>;

  return (
    <Box p={4}>
      <Typography variant="h5" mb={2}>
        Designing Certificate for <strong>{course.candidateName}</strong>
      </Typography>

      <Box mb={2}>
        <Input type="file" onChange={handleUpload} accept="application/pdf" />
      </Box>

      {/* PDF with overlays */}
      <Box
        sx={{
          position: "relative",
          width: "fit-content",
          border: "1px solid #ccc",
        }}
      >
        {pdfData && (
          <>
            <Document file={pdfData}>
              <Page pageNumber={1} width={800} />
            </Document>

            {/* Draggable overlays */}
            {overlayFields.map((field) => (
              <Draggable
                key={field}
                position={positions[field] || { x: 50, y: 50 }}
                onStop={(e, data) => handleStop(e, data, field)}
              >
                <div
                  style={{
                    position: "absolute",
                    padding: "5px 10px",
                    backgroundColor: "#ffffffaa",
                    border: "1px dashed #555",
                    borderRadius: "5px",
                    cursor: "move",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  {field === "qrCode" ? (
                    <QRCode value={course.courseId} size={64} />
                  ) : (
                    field
                      .replace("Name", " Name")
                      .replace("Id", " ID")
                      .replace(/([a-z])([A-Z])/g, "$1 $2")
                  )}
                </div>
              </Draggable>
            ))}
          </>
        )}
      </Box>
    </Box>
  );
};

export default DesignCertificate;
