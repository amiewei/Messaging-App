import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContextProvider";
import { Link, useNavigate } from "react-router-dom";
import firebase from "../services/firebase";
import "firebase/compat/auth";

import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Home", to: "/profile", current: false },
  { name: "Messaging", to: "/messaging", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  console.log("navbar ");
  const { user, setUser, newDisplayName } = useContext(UserContext);
  const [nav, setNav] = useState(navigation);
  const navigate = useNavigate();

  useEffect(() => {
    let navigation = updateNavigation(nav);
    setNav([...navigation]);
  }, [window.location.pathname]);

  useEffect(() => {
    if (user) {
      console.log("Navbar 2nd use effect" + newDisplayName);
    }
  }, [newDisplayName]);

  const updateNavigation = (navigation) => {
    const pathName = window.location.pathname;

    // loop through the navigation array
    for (let i = 0; i < navigation.length; i++) {
      if (pathName.includes(navigation[i].to.toLowerCase())) {
        console.log(window.location.pathname);
        // if the URL path contains the href value, set current to true
        navigation[i].current = true;
        console.log(navigation[i].current);
      } else {
        // otherwise, set current to false
        navigation[i].current = false;
      }
    }
    return navigation;
  };

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
        console.log("log out");
        navigate("/");
        location.reload();
        return;
      })
      .catch((error) => {
        console.log("Error logging out:", error);
      });
  };

  return (
    <UserContext.Provider value={user}>
      {user ? (
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="max-w-8xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                  <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    {/* Mobile menu button*/}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    <h1 className="flex flex-shrink-0 items-center text-2xl">
                      🦜🎙️
                    </h1>
                    <div className="hidden sm:ml-6 sm:block">
                      <div className="flex space-x-4">
                        {navigation.map((item) => (
                          //using a tag with href routing will cause full page refresh (odd flash) whereas using link from react-router-dom will not
                          <Link
                            key={item.name}
                            to={item.to}
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "rounded-md px-3 py-2 text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex items-center rounded-full bg-gray-800 pr-2 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="sr-only">Open user menu</span>
                          <p className="p-2 text-white">
                            {newDisplayName || user.displayName}
                          </p>
                          <img
                            className="h-8 w-8 rounded-full"
                            src="data:image/png;base64,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"
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/profile"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Your Profile
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={handleLogout}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Sign out
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>

              {/* mobile menu with hamburger */}
              <Disclosure.Panel className="sm:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      //using link as opposed to a tag
                      as={Link}
                      to={item.to}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ) : null}
    </UserContext.Provider>
  );
}

// const Navbar = () => {
//   console.log("navbar ");
//   const { user, setUser } = useContext(UserContext);
//   const [newDisplayName, setNewDisplayName] = useState("");
//   const [sysMsg, setSysMsg] = useState(null);

//   // const darkMode = () => {
//   //   const element = document.body;
//   //   element.classList.toggle("dark-mode");
//   //   const btnDarkMode = document.querySelector(".btn-dark-mode");

//   //   if (element.classList.contains("dark-mode")) {
//   //     btnDarkMode.textContent = "☀️";
//   //     btnDarkMode.classList.remove("dark-mode");
//   //   } else {
//   //     btnDarkMode.textContent = "🌙";
//   //     btnDarkMode.classList.add("dark-mode");
//   //   }
//   // };

//   const handleLogout = () => {
//     firebase
//       .auth()
//       .signOut()
//       .then(() => {
//         setUser(null);
//       })
//       .catch((error) => {
//         console.log("Error logging out:", error);
//       });
//   };

//   const displayDarkModeBtn = () => {
//     const btnDarkMode = document.querySelector(".btn-dark-mode");
//     console.log("test");
//     console.dir(btnDarkMode);
//   };

//   displayDarkModeBtn();

//   return (
//     <UserContext.Provider value={user}>
//       {user ? (
//         <nav className="nav-bar">
//           <div className="logo">
//             <Link to="/">
//               {" "}
//               <h1>🦜🎙️</h1>
//             </Link>
//           </div>
//           <div className="nav-link">
//             <Link to="/">Home</Link>
//             <Link to="/messaging">Messaging</Link>
//             {/* <button className="btn-dark-mode dark-mode" onClick={darkMode}>
//           🌙
//         </button> */}
//             <div>
//               <StyledButtonWithIcon
//                 onClick={handleLogout}
//                 width="max-w-sm"
//                 color="teal"
//               >
//                 Sign Out
//               </StyledButtonWithIcon>
//             </div>
//           </div>
//         </nav>
//       ) : null}
//     </UserContext.Provider>
//   );
// };

// export default Navbar;
