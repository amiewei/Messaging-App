import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Navbar from "./components/Navbar";
import Messaging from "./components/Messaging";
import SignIn from "./components/SignIn";
import App from "./App";

const RouteSwitch = () => {
  console.log("route switch");

  return (
    //browserRouter to wrap everything
    <BrowserRouter>
      <Navbar />

      <Routes>
        {["/", "/app"].map((path, index) => {
          return <Route path={path} element={<App />} key={index} />;
        })}
        <Route path="/profile" element={<SignIn />} />
        <Route path="/messaging" element={<Messaging />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
