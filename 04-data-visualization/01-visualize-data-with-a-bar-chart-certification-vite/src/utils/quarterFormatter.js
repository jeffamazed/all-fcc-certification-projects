const quarterFormatter = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const quarter = Math.floor(d.getMonth() / 3) + 1;
  return `${year} Q${quarter}`;
};
export default quarterFormatter;
