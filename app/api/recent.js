const request = require("../../utils/request");

const recent = (server, id, day) => {
  return request({
    url: `/api/wows/recent/v2/recent/info?server=${server}&accountId=${id}&day=${day}&status=0`,
    method: "get",
  });
};

module.exports = recent;
