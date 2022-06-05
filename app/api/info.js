const request = require("../../utils/request");

const info = (server, id) => {
  return request({
    url: `/public/wows/account/v2/user/info?server=${server}&accountId=${id}`,
    method: "get",
  });
};

module.exports = info;
