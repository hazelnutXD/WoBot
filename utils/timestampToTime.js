const timestampToTime = (timestamp) => {
  timestamp.toString().length === 10 ? (timestamp *= 1000) : timestamp;
  let date = new Date(timestamp);
  let Y = date.getFullYear() + "-";
  let M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  let D = date.getDate() + " ";
  return Y + M + D;
};

module.exports = timestampToTime;
