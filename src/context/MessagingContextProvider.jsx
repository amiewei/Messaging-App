import React, { createContext, useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContextProvider";
import axios from "axios";

export const MessagingContext = createContext();

export const useMessagingContext = () => useContext(MessagingContext);

export const MessagingContextProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const { userIdToken } = useContext(UserContext);
  // console.log(userIdToken);

  const getMessage = async () => {
    console.log("get msg");
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}:${
        import.meta.env.VITE_BACKEND_PORT
      }/api/messages`
    );

    console.log(response);
    if (response.status === 201) {
      setMessages(response.data);
    } else {
      throw Error("no messages");
    }
  };

  const addMessage = async (uid, message) => {
    return await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}:${
        import.meta.env.VITE_BACKEND_PORT
      }/users/api/message/add`,
      { uid, message, useridtoken: userIdToken }
    );
  };

  const deleteAllMessagesByUser = async (uid) => {
    console.log("messaging context provider - deleteallMessage");
    return await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}:${
        import.meta.env.VITE_BACKEND_PORT
      }/users/api/message/delete`,
      {
        headers: {
          uid: uid,
          method: "all",
          useridtoken: userIdToken,
        },
      }
    );
  };

  const deleteIndividualMessage = async (messageId, uid) => {
    return await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}:${
        import.meta.env.VITE_BACKEND_PORT
      }/users/api/message/delete`,
      {
        headers: {
          messageid: messageId,
          uid: uid,
          method: "individual",
          useridtoken: userIdToken,
        },
      }
    );
  };

  return (
    <MessagingContext.Provider
      value={{
        messages,
        addMessage,
        deleteAllMessagesByUser,
        deleteIndividualMessage,
        getMessage,
      }}
    >
      {children}
    </MessagingContext.Provider>
  );
};
