import React from "react";
import { useRouteError, useLocation, Link } from "react-router-dom";
import errorimg from "../assets/404-error.jpg";
import notFound from "../assets/democertificate.PNG";

const ErrorPage = () => {
  const err = useRouteError();
  const location = useLocation();
  console.log("err", err);

  const CertificatePage = location.pathname === "/design-certificate";

  const errorImage = CertificatePage ? notFound : errorimg;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <h1>
        {CertificatePage ? (
          <>
            Add a course to{" "}
            <Link to="/generate-course">design your certificate</Link>
          </>
        ) : (
          <>
            Oops!! CertiCraft page you are looking for is missing.
            <br />
            Try going back to the <Link to="/">Home page</Link>
          </>
        )}
      </h1>

      <img
        src={errorImage}
        alt="Error"
        style={{ maxWidth: "100%", maxHeight: "400px", marginTop: "1rem" }}
      />
    </div>
  );
};

export default ErrorPage;
