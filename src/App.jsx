import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import GenerateCourse from "./pages/GenerateCourse";
import DesignCertificate from "./pages/DesignCertificate";

import Header from "./components/Header";
import ErrorPage from "./components/ErrorPage";

const AppRoute = () => (
  <>
    <Header />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppRoute />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <AboutUs />,
      },
      {
        path: "generate-course",
        element: <GenerateCourse />,
      },
      {
        path: "design-certificate/:courseId",
        element: <DesignCertificate />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
