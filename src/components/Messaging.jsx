import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContextProvider";
import { MessagingContext } from "../context/MessagingContextProvider";
import { StyledButton } from "./utility/StyledButtons";
import { DelMsgIcon, Spinner } from "./utility/StyledIcons";
import { shortDate } from "./utility/utilityFunctions";
import { useNavigate } from "react-router-dom";

function Messaging() {
  const { user } = useContext(UserContext);
  const [chatMsg, setChatMsg] = useState(null);
  const [sysMsg, setSysMsg] = useState(null);
  const {
    messages,
    addMessage,
    deleteAllMessagesByUser,
    deleteIndividualMessage,
    getMessage,
  } = useContext(MessagingContext);

  const navigate = useNavigate();

  function handleGoBack() {
    navigate("/");
  }

  //display msg
  useEffect(() => {
    try {
      getMessage();
      if (sysMsg) {
        const timer = setTimeout(() => {
          setSysMsg(null);
        }, 1500); // 1.5 second delay
        return () => clearTimeout(timer);
      }
    } catch (error) {
      setSysMsg(error.message);
    }
  }, [sysMsg]);

  const handleAddMsg = async () => {
    try {
      if (chatMsg) {
        const response = await addMessage(user.uid, chatMsg);

        if (response.status === 201) {
          const input = document.querySelector('input[type="text"]');
          input.value = "";
          setChatMsg(null);
          setSysMsg("sent");
          return;
        }
        throw Error(response.data.error);
      } else {
        throw Error("Chat Message Cannot Be Blank");
      }
    } catch (error) {
      setSysMsg(error.message);
    }
  };

  const handleDeleteAllUserMsg = async () => {
    try {
      const response = await deleteAllMessagesByUser(user.uid);

      if (response.status === 201 || response.status === 200) {
        setSysMsg("Messages Deleted");
        return;
      }

      throw Error(response.data.error);
    } catch (error) {
      setSysMsg(error.message);
    }
  };

  const handleDeleteIndividualMsg = async (messageId) => {
    try {
      const response = await deleteIndividualMessage(messageId, user.uid);

      if (response.status === 201 || response.status === 200) {
        setSysMsg("Messages Deleted");
        return;
      }
      throw Error(response.data.error);
    } catch (error) {
      setSysMsg(error.message);
    }
  };

  return (
    <UserContext.Consumer>
      {({ user }) => (
        <div className="container mx-auto my-5 flex h-screen w-screen justify-center">
          <div className=" max-w-10/12 min-w-[50%] flex-col ">
            <h2>Messaging Post History</h2>
            {messages.length === 0 ? (
              <div className="flex h-80 justify-center">
                <Spinner />
              </div>
            ) : (
              <>
                <div>
                  <ul>
                    <h3>Total Posts: {messages.length}</h3>
                    <hr className="my-3 h-px border-2 bg-gray-200 dark:bg-gray-700" />
                    {messages.length > 0 &&
                      messages.map((message) => (
                        <li key={message._id} className="flex flex-col">
                          <p className="flex items-center">
                            <span className="font-bold text-gray-800">
                              {user && message.user
                                ? message.user.displayName
                                : "🦜"}
                            </span>
                            <span className="text-gray-700">
                              {":  "}
                              {message.body}{" "}
                            </span>
                            {user && user.uid === message.uid && (
                              <DelMsgIcon
                                onClick={() =>
                                  handleDeleteIndividualMsg(message._id)
                                }
                              />
                            )}
                          </p>
                          <p>
                            <span className="text-xs italic text-gray-500/50">
                              &#91;{shortDate(message.timestamp)}&#93;
                            </span>
                          </p>
                        </li>
                      ))}
                  </ul>
                </div>
                <hr className="my-3 h-px border-2 bg-gray-200 dark:bg-gray-700" />
                {user ? (
                  <>
                    <h2>Create A Message</h2>
                    <div className="chat-window flex flex-col gap-5">
                      <div className="flex gap-1">
                        <input
                          type="text"
                          className="input-box w-4/5"
                          placeholder="Enter Message..."
                          onChange={(e) => setChatMsg(e.target.value)}
                        />
                        <StyledButton
                          onClick={handleAddMsg}
                          width="w-3/12"
                          color="indigo"
                        >
                          Send
                        </StyledButton>
                      </div>
                      <div>
                        <StyledButton
                          onClick={handleDeleteAllUserMsg}
                          width="w-fit"
                          color="indigo"
                        >
                          Delete All My Messages
                        </StyledButton>
                      </div>
                    </div>
                  </>
                ) : (
                  <div>
                    You Must Log In To Create/Post Message
                    <StyledButton
                      onClick={handleGoBack}
                      width="w-fit"
                      color="indigo"
                    >
                      Go Back
                    </StyledButton>
                  </div>
                )}

                {sysMsg}
              </>
            )}
          </div>
        </div>
      )}
    </UserContext.Consumer>
  );
}

export default Messaging;
