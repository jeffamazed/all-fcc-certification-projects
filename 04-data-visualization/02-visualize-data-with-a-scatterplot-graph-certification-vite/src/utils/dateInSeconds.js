const dateInSeconds = (seconds) => {
  const date = new Date(0);
  date.setSeconds(seconds);
  return date;
};

export default dateInSeconds;
