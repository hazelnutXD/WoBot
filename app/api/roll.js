const request = require("../../utils/request");

const roll = () => {
  return request({
    url: `/public/wows/roll/slots/all/info?id=4285715376`,
    method: "get",
  });
};

module.exports = roll;
