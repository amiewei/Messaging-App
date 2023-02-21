import React, { useState } from "react";

function Error() {
  const [error, setError] = useState(null);

  function handleClick() {
    fetch("/some-api-endpoint")
      .then((response) => response.json())
      .then((data) => {
        // handle successful response
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  return (
    <div>
      <button onClick={handleClick}>Click me</button>
      {error && <div>{message}</div>}
    </div>
  );
}

export default Error;
