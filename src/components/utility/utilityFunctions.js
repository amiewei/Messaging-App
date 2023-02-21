const shortDate = (timestamp) => {
  const date = new Date(timestamp);
  const shortDate = date.toLocaleDateString();
  const shortTime = date.toLocaleTimeString();
  // console.log(shortDate + " " + shortTime);
  return shortDate + " " + shortTime;
};

export { shortDate };
