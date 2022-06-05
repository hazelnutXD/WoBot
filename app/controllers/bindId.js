const findUserId = require("../api/findUserId");
const putId = require("../api/putId");

const bindId = async (qid, server, nickname) => {
  try {
    let findIdRes = await findUserId(server, nickname);
    switch (findIdRes.data.code) {
      case 200:
        var uid = findIdRes.data.data.accountId;
        break;
      case 404:
        return findIdRes.data.message;
      default:
        return "查询失败(服务器网络错误或其他原因)";
    }

    let putIdRes = await putId(qid, uid);
    if (putIdRes.data.code === 200) {
      return "绑定成功";
    } else {
      return "绑定失败";
    }
  } catch (error) {
    return "err:" + error;
  }
};

module.exports = bindId;
