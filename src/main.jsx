import React from "react";
import ReactDOM from "react-dom";
import RouteSwitch from "./RouteSwitch";
import { UserContextProvider } from "./context/UserContextProvider";
import { MessagingContextProvider } from "./context/MessagingContextProvider";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <MessagingContextProvider>
        <RouteSwitch />
      </MessagingContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
