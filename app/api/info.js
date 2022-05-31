const request = require("../../utils/request");

const info = (qid) => {
  return request({
    url: `/public/wows/account/v2/user/info?server=QQ&accountId=${qid}`,
    method: "get",
  });
};

module.exports = info;
