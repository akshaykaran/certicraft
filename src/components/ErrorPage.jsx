import React from "react";
import { useRouteError } from "react-router-dom";
import errorimg from "../assets/404-error.jpg"

const ErrorPage = () => {
  const err = useRouteError();
  console.log("err", err);

  return <div>
    <h1>Welcome to CertiCraft</h1>
    <img src={errorimg} alt="Error" />
  </div>;
};

export default ErrorPage;
