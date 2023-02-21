import React from "react";
import { LockClosedIcon } from "@heroicons/react/20/solid";

const colorVariantsButton = {
  teal: "bg-teal-600 hover:bg-teal-700 focus:ring-teal-500",
  indigo: "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500",
  amber: "bg-amber-600 hover:bg-amber-700 focus:ring-amber-500",
};

const colorVariantsIcon = {
  teal: "text-teal-500 group-hover:text-teal-400",
  indigo: "text-indigo-500 group-hover:text-indigo-400",
  amber: "text-amber-500 group-hover:text-amber-400",
};

//from tailwindUI Components
function StyledButtonWithIcon({ onClick, children, width, color }) {
  //tailwind does not allow you to build class names dynamically. ie. bg-${color}-600 DOES NOT WORK. you need the full className

  //but you can map props to static classnames

  const buttonClassNames = `group relative flex w-full justify-center rounded-md border \
            border-transparent py-2 px-4 text-sm font-medium text-white \
            focus:outline-none focus:ring-2 \
            ${colorVariantsButton[color]} focus:ring-offset-2 ${width}`;

  //   const buttonClassNames =
  //     "group relative flex w-full justify-center rounded-md border border-transparent bg-teal-600 py-2 px-4 text-sm font-medium text-white       hover:bg-teal-700 focus:outline-none focus:ring-2       focus:ring-teal-500 focus:ring-offset-2 max-w-xs";

  // console.log(buttonClassNames);
  return (
    <button onClick={onClick} type="submit" className={buttonClassNames}>
      {children}
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
        <LockClosedIcon
          className={`h-5 w-5 ${colorVariantsIcon[color]}`}
          aria-hidden="true"
        />
      </span>
    </button>
  );
}

function StyledButton({ onClick, children, width, color }) {
  //tailwind does not allow you to build class names dynamically. ie. bg-${color}-600 DOES NOT WORK. you need the full className

  //but you can map props to static classnames
  const buttonClassNames = `group relative flex justify-center rounded-md border \
            border-transparent py-2 px-4 text-sm font-medium text-white \
            focus:outline-none focus:ring-2 \
            ${colorVariantsButton[color]} focus:ring-offset-2 ${width}`;

  //   const buttonClassNames =
  //     "group relative flex w-full justify-center rounded-md border border-transparent bg-teal-600 py-2 px-4 text-sm font-medium text-white       hover:bg-teal-700 focus:outline-none focus:ring-2       focus:ring-teal-500 focus:ring-offset-2 max-w-xs";

  // console.log(buttonClassNames);
  return (
    <button onClick={onClick} type="submit" className={buttonClassNames}>
      {children}
    </button>
  );
}

export { StyledButton, StyledButtonWithIcon };
