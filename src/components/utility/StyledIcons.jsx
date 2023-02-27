function DelMsgIcon({ onClick }) {
  return (
    <>
      <button
        onClick={onClick}
        type="submit"
        className="ml-4 h-4 w-4 text-amber-600 hover:text-indigo-600
            focus:outline-none focus:ring-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </>
  );
}

function Spinner() {
  return (
    <>
      <button type="button" className="bg-transparent" disabled>
        <svg
          className="spinner-slow mr-3 h-20 w-20 animate-spin"
          viewBox="0 0 40 40"
        >
          <circle
            className="path stroke-indigo-500"
            cx="20"
            cy="20"
            r="15"
            fill="transparent"
            strokeWidth="6"
            strokeDasharray="89, 200"
            strokeDashoffset="0"
          ></circle>
        </svg>
        <div className="flex items-center justify-center">
          <span className="text-gray-500">Loading...</span>
        </div>
      </button>
    </>
  );
}

export { DelMsgIcon, Spinner };
