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
          <h3>Generate Certificates</h3>
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
              onClick={() => navigate("/generate-certificate")}
            >
              Generate Certificates
            </Button>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/view-certificate")}
              style={{
                backgroundColor: "white",
                color: "black",
              }}
            >
              View Certificates
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
