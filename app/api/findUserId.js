const request = require("../../utils/request");

const findUserId = (server, nickname) => {
  return request({
    url: `/public/wows/account/search/user?server=${server}&userName=${nickname}`,
    method: "get",
  });
};

module.exports = findUserId;
