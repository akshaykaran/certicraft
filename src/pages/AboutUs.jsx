import React from "react";
import "./aboutus.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="about">
        <div className="about-section">
          <h1>About Certicraft</h1>
          <h3>Empowering Achievement Through Smart Certification</h3>
          <p>
            At CertiCraft, we believe that every achievement deserves
            recognition — and that recognition should be smart, secure, and
            seamless. We're building a platform that simplifies the creation and
            distribution of digital certificates with embedded QR verification,
            so institutions and learners can focus more on growth and less on
            paperwork.
          </p>
          <p>
            Whether you're an educator, event organizer, or corporate trainer,
            CertiCraft makes it effortless to:
            <ul>
              <li>Create custom certificate templates</li>
              <li>Generate downloadable PDFs with dynamic data</li>
              <li>Verify authenticity using QR codes</li>
            </ul>
          </p>

          <p>
            We're here to make certification not just a formality, but a moment
            of pride. Welcome to the future of secure, smart, and beautiful
            recognition — welcome to CertiCraft.
          </p>
          <Stack spacing={2} direction="row">
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/generate-course")}
            >
              Generate Certificates
            </Button>
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
