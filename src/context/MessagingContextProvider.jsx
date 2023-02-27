import React, { createContext, useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContextProvider";
import axios from "axios";

export const MessagingContext = createContext();

export const useMessagingContext = () => useContext(MessagingContext);

export const MessagingContextProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const { userIdToken } = useContext(UserContext);

  const getMessage = async () => {
    // console.log(`${import.meta.env.VITE_BACKEND_URL}/api/messages`);
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/messages`
    );

    if (response.status === 201) {
      setMessages(response.data);
    } else {
      throw Error("no messages");
    }
  };

  const addMessage = async (uid, message) => {
    try {
      return await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/message/add`,
        {
          message,
          uid: uid,
        },
        {
          headers: {
            Authorization: userIdToken,
          },
        }
      );
    } catch (error) {
      return error.response;
    }
  };

  const deleteAllMessagesByUser = async (uid) => {
    try {
      //delete request body is formatted differently compared to post and patch
      return await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/message/delete`,
        {
          headers: {
            Authorization: userIdToken,
          },
          data: {
            deletiontype: "all",
            uid: uid,
          },
        }
      );
    } catch (error) {
      return error.response;
    }
  };

  const deleteIndividualMessage = async (messageId, uid) => {
    try {
      return await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/message/delete`,
        {
          headers: {
            Authorization: userIdToken,
          },
          data: {
            deletiontype: "individual",
            uid: uid,
            messageid: messageId,
          },
        }
      );
    } catch (error) {
      return error.response;
    }
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
