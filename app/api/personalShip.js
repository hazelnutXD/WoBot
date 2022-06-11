const request = require("../../utils/request");

const personalShip = (server, id, shipId) => {
  return request({
    url: `/public/wows/account/v2/ship/info?server=${server}&accountId=${id}&shipId=${shipId}`,
  });
};

module.exports = personalShip;
