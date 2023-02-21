import React from "react";
import SignIn from "./components/SignIn";
import Navbar from "./components/Navbar";
import Messaging from "./components/Messaging";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  StyledButton,
  StyledButtonWithIcon,
} from "./components/utility/StyledButtons";
import axios from "axios";
import { Link } from "react-router-dom";

function App() {
  console.log("app - home page");

  return (
    <>
      <SignIn />
    </>
  );
}

export default App;
