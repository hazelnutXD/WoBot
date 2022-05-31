const request = require("../../utils/request");

const putId = (qid, uid) => {
  return request({
    url: `/api/wows/bind/account/platform/bind/put?platformType=QQ&platformId=${qid}&accountId=${uid}`,
    method: "get",
  });
};

module.exports = putId;
