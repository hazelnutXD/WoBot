const timestampToTime = (timestamp) => {
  var date = new Date(timestamp * 1000);
  var Y = date.getFullYear() + "-";
  var M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  var D = date.getDate() + " ";
  return Y + M + D;
};

module.exports = timestampToTime;