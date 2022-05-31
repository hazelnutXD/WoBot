const request = require("../../utils/request");

const recent = (qid, day) => {
  return request({
    url: `/public/wows/account/recent/list?server=QQ&accountId=${qid}&seconds=${
      Math.round(new Date() / 1000) - day * 24 * 3600
    }`,
    method: "get",
  });
};

module.exports = recent;
