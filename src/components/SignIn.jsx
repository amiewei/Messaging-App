import React, { useState, useEffect, useContext } from "react";
import firebase from "../services/firebase";
import "firebase/compat/auth";
import { UserContext } from "../context/UserContextProvider";
import { StyledButton, StyledButtonWithIcon } from "./utility/StyledButtons";
import axios from "axios";
import { Link } from "react-router-dom";

function SignIn() {
  const {
    user,
    setUser,
    newDisplayName,
    setNewDisplayName,
    isProfilePage,
    userIdToken,
    setUserIdToken,
  } = useContext(UserContext);
  const [sysMsg, setSysMsg] = useState(null);
  const [passcode, setPasscode] = useState(null);

  console.log(user);
  console.log("rendering");
  //display msg
  useEffect(() => {
    console.log("useeffect- user profile");
    console.log(user);
    try {
      console.log("sysmsg: " + sysMsg);
      if (sysMsg) {
        console.log(sysMsg);
        const timer = setTimeout(() => {
          setSysMsg(null);
        }, 1500); // 1.5 second delay
        return () => clearTimeout(timer);
      }
    } catch (error) {
      console.log("Error getting messages:", error);
      setSysMsg(error.message);
    }
  }, [sysMsg]);

  //initial login
  const signInWithGoogle = async () => {
    console.log("sign in with google");
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    const { newuser } = await firebase.auth().signInWithPopup(provider);

    console.log(newuser);

    const userIdToken = await firebase
      .auth()
      .currentUser.getIdToken(/* forceRefresh */ true)
      .then(function (idToken) {
        if (idToken) {
          console.log("firebase idtoken for user");
          console.log(idToken);
          setUserIdToken(idToken);
          return idToken;
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    if (newuser) {
      setUser(newuser);
      updateUserBackEnd(user.uid, user.displayName, user.email, userIdToken);
    }
  };

  //display name change
  const handleDisplayNameChange = async () => {
    try {
      if (newDisplayName) {
        user.updateProfile({
          displayName: newDisplayName,
        });

        const currentUser = firebase.auth().currentUser;
        setUser(currentUser);

        updateUserBackEnd(
          currentUser.uid,
          newDisplayName,
          currentUser.email,
          userIdToken
        );

        setNewDisplayName(newDisplayName);
      } else {
        throw Error("Display Name is Required");
      }
    } catch (error) {
      console.log("Error updating display name:", error);
      setSysMsg(error.message);
    }
  };

  const handleAdminPasscode = async () => {
    console.log("passcode is: " + passcode);
    try {
      if (passcode === "admin") {
        console.log("passcode match");
        updateUserToAdminBackEnd(passcode);
      } else {
        throw Error("Incorrect Passcode");
      }
    } catch (error) {
      console.log("Error updating display name:", error);
      setSysMsg(error.message);
    }
  };

  const updateUserToAdminBackEnd = async (passcode) => {
    const uid = user.uid;
    try {
      console.log(passcode, userIdToken);
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}:${
          import.meta.env.VITE_BACKEND_PORT
        }/users/${uid}`,
        {
          isAdmin: true,
          displayName: user.displayName,
          useridtoken: userIdToken,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        setSysMsg("You are now an admin!");
        return;
      }
      throw Error(error.response.data.error);
    } catch (error) {
      setSysMsg(error.message);
    }
  };

  const updateUserBackEnd = async (uid, newDisplayName, email) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}:${
          import.meta.env.VITE_BACKEND_PORT
        }/users/${uid}`,
        {
          displayName: newDisplayName,
          email: email,
          uid,
          useridtoken: userIdToken,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.status === 200 || response.status === 201) {
        setSysMsg("Display name updated!");
        return;
      }
      throw Error(error.response.data.error);
    } catch (error) {
      setSysMsg(error.message);
    }
  };

  return (
    <>
      <UserContext.Provider value={user}>
        {user ? (
          <div className="container mx-auto my-5 flex h-screen w-screen justify-center">
            <div className="flex w-10/12 flex-col items-center gap-3">
              <p className="my-5 text-5xl">
                Welcome, {user.displayName || newDisplayName} !
              </p>
              <div className="flex w-full justify-center gap-1">
                <input
                  className="input-box"
                  type="text"
                  placeholder={user.displayName}
                  onChange={(e) => setNewDisplayName(e.target.value)}
                />
                <StyledButton
                  onClick={handleDisplayNameChange}
                  width="w-60"
                  color="indigo"
                >
                  Update Display Name
                </StyledButton>
              </div>
              <div className="flex w-full justify-center gap-1 ">
                <label hidden htmlFor="admin-passcode-input"></label>
                <input
                  className="input-box"
                  type="password"
                  name="admin-passcode-input"
                  placeholder="passcode"
                  onChange={(e) => setPasscode(e.target.value)}
                />
                <StyledButton
                  onClick={handleAdminPasscode}
                  width="w-60"
                  color="indigo"
                >
                  Elevate To Admin
                </StyledButton>
              </div>
              <p>{sysMsg}</p>
            </div>
            <br />
          </div>
        ) : (
          !isProfilePage && (
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
              <div className="w-full max-w-md space-y-8">
                <div>
                  <h1 className="text-center text-5xl">🦜🎙️</h1>
                  <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                    Sign in to your account
                  </h2>
                  <p className="mt-2 text-center text-sm text-gray-600">
                    Or{" "}
                    <Link
                      to="/messaging"
                      className="font-medium text-teal-600 hover:text-teal-500"
                    >
                      Take A Sneak Peek 👀
                    </Link>
                  </p>
                </div>
                <div>
                  <StyledButtonWithIcon
                    onClick={signInWithGoogle}
                    width="max-w-lg"
                    color="teal"
                  >
                    Sign in with Google
                  </StyledButtonWithIcon>
                </div>
              </div>
            </div>
          )
        )}
      </UserContext.Provider>
    </>
  );
}

export default SignIn;