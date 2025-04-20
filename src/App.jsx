import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import GenerateCertificate from "./pages/GenerateCertificate";
import ViewCertificate from "./pages/ViewCertificate";

import Header from "./components/Header";
import ErrorPage from "./components/ErrorPage";



const AppRoute =()=>(
<>
  <Header />
  <Outlet/>
  </>

)
  

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppRoute/>,
    children: [
      {
        index: true, element: <Home/>
      }, 
      {
        path:"about", element: <AboutUs/>
      },
      {
        path:"view-certificate", element: <ViewCertificate/>
      }, 
      {
        path:"generate-certificate", element:<GenerateCertificate/>
      }
    ],
    errorElement: <ErrorPage />,
  },
])

export default function App(){
  return <RouterProvider router={router}/>
}




