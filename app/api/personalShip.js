const request = require("../../utils/request");

const personalShip = (qid, shipId) => {
  return request({
    url: `/public/wows/account/ship/info?server=QQ&accountId=${qid}&shipId=${shipId}`,
  });
};

module.exports = personalShip;
