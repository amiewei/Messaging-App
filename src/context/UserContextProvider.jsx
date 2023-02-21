import React, { createContext, useEffect, useState } from "react";
import firebase from "../services/firebase";
import "firebase/compat/auth";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [newDisplayName, setNewDisplayName] = useState("");
  const [isProfilePage, setIsProfilePage] = useState(false);
  const [userIdToken, setUserIdToken] = useState(null);

  //listener for any auth changes, also to persist user across components and upon browswer refresh
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      }
    });
    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (user && !userIdToken) {
      firebase
        .auth()
        .currentUser.getIdToken(/* forceRefresh */ true)
        .then(function (idToken) {
          if (idToken) {
            setUserIdToken(idToken);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [user]);

  useEffect(() => {
    const pathName = window.location.pathname;
    if (pathName.includes("/profile")) {
      setIsProfilePage(true);
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        newDisplayName,
        setNewDisplayName,
        isProfilePage,
        userIdToken,
        setUserIdToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
