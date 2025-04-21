import React from "react";
import "./home.css";
import certificateImg from "../assets/certicrafttt.png";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home">
      <div className="left-home-section">
        <div className="details">
          <h3>Create Courses & Design Certificates</h3>
          <h1>Certicraft</h1>
          <p>
            CertiCraft is a seamless platform for creating, customizing, and
            issuing professional certificates with precision and ease. Empower
            your recognition process with smart, elegant, and efficient
            certificate generation.
          </p>

          <h3>What are you looking for</h3>
          <Stack spacing={2} direction="row">
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/generate-course")}
            >
              Generate Course
            </Button>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/design-certificate")}
              style={{
                backgroundColor: "white",
                color: "black",
              }}
            >
              Design Certificates
            </Button>
          </Stack>
        </div>
      </div>
      <div className="right-home-section">
        <img src={certificateImg} alt="certificate" />
      </div>
    </div>
  );
};

export default Home;
